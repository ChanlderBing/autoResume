<template>
  <el-card class="box-card">
    <div class="topTab">
        <div @click="back"><svg style="width: 1em; height: 1em;font-size: 22px;" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-029747aa=""><path fill="currentColor" d="M609.408 149.376 277.76 489.6a32 32 0 0 0 0 44.672l331.648 340.352a29.12 29.12 0 0 0 41.728 0 30.592 30.592 0 0 0 0-42.752L339.264 511.936l311.872-319.872a30.592 30.592 0 0 0 0-42.688 29.12 29.12 0 0 0-41.728 0z"></path></svg></div>
        <span class="text-large font-600 mr-3"> 个人信息 </span>
        <el-button type="primary" class="ml-2" @click="onSubmit">完成</el-button>
    </div>
    <div class="skill">
      <el-form :inline="true" :model="personalMoudle" class="demo-form-inline"  ref="ruleForm" :rules="rules">
        <div class="skillTitle"> 基本信息 </div>
        <el-form-item label="姓名" prop="userName" >
            <el-input v-model="personalMoudle.userName"  />
        </el-form-item>
        <template v-for="(value,key) in personalMoudle.inputList[0]">
          <el-form-item :label="realationshipMap[key]" :prop="`inputList[0].${key}`">
            <el-input v-model="personalMoudle.inputList[0][key]"  />
          </el-form-item> 
        </template>
        <div class="skillTitle"> 就职意向 </div>
          <template v-for="(value,key) in personalMoudle.inputList[1]">
            <el-form-item v-if="key.toString() !== 'currentStatus'" :label="realationshipMap[key]" :prop="`inputList[1].${key}`" >
              <el-input v-model="personalMoudle.inputList[1][key]" />
            </el-form-item>
            <el-form-item v-else :label="realationshipMap[key]"  :prop="`inputList[1].${key}`" > 
            <el-select v-model="personalMoudle.inputList[1][key]" class="m-2" :placeholder="options[1].value">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          </template>
      </el-form>
    </div> 
  </el-card>
</template>
    
<script setup lang="ts">
  import store from '@/store';
  import '@wangeditor/editor/dist/css/style.css' // 引入 css
  import { unref, ref, onMounted, inject } from 'vue'
  import { ElMessage } from 'element-plus';
  import axios from '@/api/http';
  import  rules  from "@/utils/useFormRules.js";
  import  { realationshipMap,options}  from "@/utils/optionMap.js";

  const deepClear =  (target)=> {
  if (typeof target === 'object' && target) {
      let cloneObj = {}
      for (const key in target) { // 遍历
          const val = target[key]
          if (typeof val === 'object' && val) {
              cloneObj[key] = deepClear(val) // 是对象就再次调用该函数递归
          } else {
              cloneObj[key] = '' // 基本类型的话直接复制值
          }
      }
      return cloneObj
  } else {
      return target;
  }
  }
  let personalMoudle1 = inject('personalMoudle') as any
  let personalMoudle = ref(deepClear(personalMoudle1.value));
  const emit =  defineEmits(['updateResume'])
    const onSubmit = () => {
      axios.post(`posts/setUserResume`,{...flatten(personalMoudle.value)}).then((res)=>{
      ElMessage.success('创建成功')
      emit('updateResume',res.data.data.insertId)
      back()
    })
    }
  const back = ()=>{
    store.commit('switchEditPersonal',false)
    store.commit('switchAdd',false)
    store.commit('switch',false)
    store.commit('switchAddPersonal',false)
  }
  const flatten = (myObj)=> {
    const flatObj = {}
    let flag = null
    function formatKey(obj, keyName) {
        for (let key in obj) {
            if (typeof obj[key] === 'object' && obj[key] !== null) { //值为对象
                if (!keyName) {
                    formatKey(obj[key], key)
                } else {
                    if (Array.isArray(obj)) {
                        formatKey(obj[key], `${key}`)
                    } else {
                        formatKey(obj[key], `${key}`)
                    }
                }
            } else { //值不为对象或者值为null
                if (!keyName) {
                    flatObj[key] = obj[key]
                } else {
                    if (Array.isArray(obj)) {
                        flatObj[`${keyName}[${key}]`] = obj[key]
                    } else {
                        flatObj[`${key}`] = obj[key]
                    }
                }
            }
        }
    }
    formatKey(myObj, flag)
    return flatObj
  }

</script>

<style scoped lang="scss">
.topTab{
      height: 60px;
      display: flex;
      justify-content: space-between;
    }
.skill{
  .skillTitle{
    font-size: larger;
    font-weight: bold;
    margin: 0 0 20px;
  }
}
.personal{
    height: 200px;
    width: 100%;
    background-color: pink;
}

</style>
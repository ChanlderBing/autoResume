<template>
  <el-card class="box-card">
    <div class="topTab">
        <div @click="back"><svg style="width: 1em; height: 1em;font-size: 22px;" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-029747aa=""><path fill="currentColor" d="M609.408 149.376 277.76 489.6a32 32 0 0 0 0 44.672l331.648 340.352a29.12 29.12 0 0 0 41.728 0 30.592 30.592 0 0 0 0-42.752L339.264 511.936l311.872-319.872a30.592 30.592 0 0 0 0-42.688 29.12 29.12 0 0 0-41.728 0z"></path></svg></div>
        <span class="text-large font-600 mr-3"> 个人信息 </span>
        <el-button type="primary" class="ml-2" @click="onSubmit">完成</el-button>
    </div>
    <div class="skill">
      <el-form :inline="true" :model="personalMoudle[0].inputList" class="demo-form-inline">
        <div class="skillTitle"> 基本信息 </div>
        <el-form-item label="姓名" >
            <el-input v-model="personalMoudle[0].username" />
          </el-form-item>
        <template v-for="(value,key) in personalMoudle[0].inputList[0]">
          <el-form-item :label="realationshipMap[key]" >
            <el-input v-model="value[key]" />
          </el-form-item>
        </template>
        <div class="skillTitle"> 就职意向 </div>
        <template v-for="(value,key) in personalMoudle[0].inputList[1]">
          <el-form-item :label="realationshipMap[key]" >
            <el-input v-model="value[key]" />
          </el-form-item>
        </template>
        </el-form>
    </div>
  </el-card>
  </template>
  
  <script setup lang="ts">
  import store from '@/store';
  import '@wangeditor/editor/dist/css/style.css' // 引入 css
  import { onBeforeUnmount,unref, ref, shallowRef, onMounted } from 'vue'
  import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
  import { ElMessage } from 'element-plus';

  let personalMoudle = ref(JSON.parse(localStorage.getItem('personalMoudle')))

  const onSubmit = () => {
     localStorage.setItem('personalMoudle',JSON.stringify(personalMoudle))
    ElMessage.success('修改成功')
    back()
  }
  const back = ()=>{
    store.commit('switch',false)
  }

  const realationshipMap = {
      'phoneNumber':'手机',
      'email':'邮件',
      'degree':'专业',
      'cityYoulived':'城市',
      'cityItent': '意向城市',
      'currentStatus':'就职状态',
      'postIntent':'投递意向'
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
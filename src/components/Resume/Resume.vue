<template>
  <el-card style="width:780px;margin-bottom:20px;" class="card">
     <div class="features">
        <div class="colorPick">
          <el-select v-model="value" class="m-2" :placeholder="options[0].label">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :change="changeTheme(value)"
            >
              <div :style="{'backgroundColor':item.color,'width':'20px','height':'20px','margin-top':'6px'}"></div>
            </el-option>
          </el-select>
        </div>
        <div class="modelAdd">
          <el-select  class="m-2" placeholder="添加模块">
            <el-option
              v-for="(item,index) in resumeMoudle"
              :key="item.moduleId"
              :label="item.title"
              value="添加模块"
              :disabled="item.isShow"
              @click="resumeMoudleChange(item.moduleId)"
            >
            <div>{{ item.title }} <span style="margin-left:20px"></span></div>
            </el-option>
          </el-select>
        </div>
      </div>
  </el-card>
  <el-card class="card2">
    
    <div class="main" id="printC" ref="printRef">
      <div class="personal">
        <Personal></Personal>
      </div>
      <ShowList  
        @clickChild="resumeMoudleChange" 
        @clickToHide="clickToHide" 
        @moduleSwitchUp="moduleSwitchUp" 
        @moduleSwitchDown="moduleSwitchDown"
        @moduleDetailSwitchUp="moduleDetailSwitchUp"
        @moduleDetailSwitchDown="moduleDetailSwitchDown" ></ShowList>
    </div>
    <div class="divider" v-if="printHeight > 1116">
      <span class="titleName">一页分界线</span>
      <div class="line"></div>
    </div>
  </el-card>
</template>
<script lang="ts" setup>
import Personal from '@/components/Resume/components/Personal.vue'
import store from '@/store';
import  axios  from '@/api/http';
import { ElMessage } from 'element-plus';
import {  ref,inject, onMounted, computed, nextTick, onUpdated } from 'vue'
import ShowList from './components/ShowList.vue';
import {useResizeObserver} from "@vueuse/core";

const emit = defineEmits(['updateResume'])
const resumeMoudle = inject('resumeMoudle') as any
const value = ref(store.state.color_theme)
let printRef = ref(null)
let printHeight = ref(0)

const changeTheme = (theme:string)=>{
    window.document.getElementById('app')?.setAttribute('data-theme', theme)
    store.commit('switchThemeColor',theme)
}
 
const resumeMoudleChange = (moduleId)=>{
  const index =  resumeMoudle.value.findIndex((item)=>{
    return  item.moduleId=== moduleId
  })
  resumeMoudle.value[index].isShow = resumeMoudle.value[index].isShow ? false:true
}
  
const clickToHide = (moduleId,status,id)=>{
  axios.post('posts/updateShowStatus',{moduleId:moduleId,status:status,id:id}).then(res=>{
    if (res?.data.code === 0) { 
      emit('updateResume',store.state.currentResumeId)
      ElMessage.success('删除成功')
    }
  })
}          
const moduleSwitchUp = (obj)=>{
  axios.post('posts/moduleSwitchUp',{...obj}).then(res=>{
    if (res?.data.code === 0) { 
      emit('updateResume',store.state.currentResumeId)
      ElMessage.success('上移成功')
    }
  })
}

const moduleSwitchDown = (obj)=>{
  axios.post('posts/moduleSwitchDown',{...obj}).then(res=>{
    if (res?.data.code === 0) { 
      emit('updateResume',store.state.currentResumeId)
      ElMessage.success('下移成功')
    }
  })
}
const moduleDetailSwitchUp = (obj)=>{
  axios.post('posts/moduleDetailSwitchUp',{...obj}).then(res=>{
    if (res?.data.code === 0) { 
      emit('updateResume',store.state.currentResumeId)
      ElMessage.success('上移成功')
    }
  })
}
const moduleDetailSwitchDown = (obj)=>{
  axios.post('posts/moduleDetailSwitchDown',{...obj}).then(res=>{
    if (res?.data.code === 0) { 
      emit('updateResume',store.state.currentResumeId)
      ElMessage.success('下移成功')
    }
  })
}

onMounted(() => {
useResizeObserver(printRef , (entries) => {
  const entry = entries[0]
  const { height } = entry.contentRect
  printHeight.value = height
})
})

const options = [
    { 
      value: 'red-theme',
      label: '红色',
      color: '#F56C6C',
    }
    ,
    {
      value: 'green-theme',
      label: '绿色',
      color: '#67C23A',
    }
    ,
    {
      value: 'blue-theme',
      label: '蓝色',
      color: '#409EFF',
    }
    ,
    {
      value: 'org-theme',
      label: '橙色',
      color: '#E6A23C',
    }
  ]
</script>

<style scoped lang="scss">
.card2{
  width:780px;
  height:calc(100vh - 193px);
  height: -webkit-calc(100vh - 193px);
  height: -moz-calc(100vh - 193px);
  overflow:none; 
  overflow-y:auto;
  scrollbar-width:none;
  -ms-overflow-style: none; /* IE 10+ */
  position: relative;
  .divider{
    height: 24px;
    width: 100%;
    position: absolute;
    top: 1097px;
    z-index: 9;
    background-color: hsla(0,0%,100%,.7);
    .titleName{
      position: relative;
      top: 1px;
      left: 349px;
      font-size: 14px;
      font-weight: bold;
      z-index: 19;
      @include base-color();
      padding: 0 14px;
      background-color: white;
    }
    .line{
      position: relative;
      top: -8px;
      flex-grow: 1;
      border: 1px dashed;
      @include borderColor();
    }
  }
}
.main {
  width: 780px;
  font-size: 14px;
  .personal {
    margin-bottom: 10px;
  }
  .active{
    background-color: darkgray;
    opacity: 0.4;
  }
}
.main::-webkit-scrollbar{
  display: none;
}
// .main {
//   scrollbar-width: none; /* firefox */
//   -ms-overflow-style: none; /* IE 10+ */
//   overflow-x: hidden;
//   overflow-y: auto;
//   }
.card{
  @include left-background();
  @include border-background();
  @include home-color();
}
.features{
    height: 50px;
    width: 100%;
    display:flex;
    justify-content:flex-start;
    align-items: center;
    .colorPick{
      margin: 0 3px 0 6px;
      ::v-deep .el-select .el-input__inner{
      width: 30px;
      }
      ::v-deep .el-input__wrapper{
        @include left-background();
        @include border-background();
      }
    }
    .modelAdd{
      margin: 0 6px 0 3px;
      ::v-deep .el-select .el-input__inner{
      width: 80px;
      @include left-background();
      @include border-background();
      }
    }
}

::v-deep .el-select-dropdown__item {
  height: 80px;
}
::v-deep .el-card__body {
  padding: 0px !important;
}
</style>
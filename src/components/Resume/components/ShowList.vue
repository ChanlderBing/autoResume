<template>
    <div :class="focusIndex == index ? 'active':''" v-for="(item,index) in resumeMoudle" :key="index"  @mouseover="focusMoudel(index)" @mouseleave="blurMoudel()">
      <div :class="focusIndex == index ? ['activeTitle','title']:'title'">
        <div class="titleName"> {{item.title}}</div>
        <div class="line"></div>
        <div class="control" v-if="focusIndex == index">
            <el-tooltip class="box-item" effect="dark" content="添加" placement="top">
              <img src="../../../assets/add.png" v-if="item.title == '工作经历'" @click.stop="addInformation(index)">  
            </el-tooltip>
            <el-tooltip class="box-item" effect="dark" content="向上" placement="top">
              <img src="../../../assets/Up.png" :class="index == '0'? 'abandon':''" style="margin-left: 4px;" @click.stop="switchTabUp(index)">  
            </el-tooltip>
            <el-tooltip class="box-item" effect="dark" content="向下" placement="top">
              <img src="../../../assets/Down.png" :class="index == (resumeMoudle.length - 1).toString()? 'abandon':''" style="margin-right: 4px;"  @click.stop="switchTabDown(index)">
            </el-tooltip>
            <el-tooltip class="box-item" effect="dark" content="删除" placement="top">
              <img src="../../../assets/del.png" alt="删除"  @click.stop="tabDel(index)">
            </el-tooltip>
        </div>
      </div>
      <div class="inputList" v-for="(list,index1) in item.inputList"  @click="editInformation(index,index1,item.expand)" @mouseover="focusDetailMoudel(index1)" @mouseleave="blurDetailMoudel()"> 
          <div class="menu-title"> 
            <div class="title-left">{{list.school}}</div>
            <div class="title-right" v-if="list.Time.startTime">{{list.Time.startTime}}至{{list.Time.endTime}} </div>
          </div>
          <div class="sec-title">
            <div class="title-left">{{list.academy}} {{list.degree}} {{list.city}}</div>
          </div>
          <div class="text">
            <div class="textH5" v-html="list.richText">
            </div>
          </div>
          <div class="control" v-if="focusDetailIndex == index1 && focusIndex == index">
            <el-tooltip class="box-item" effect="dark" content="向上" placement="top">
              <img src="../../../assets/Up.png" :class="index == '0'? 'abandon':''" style="margin-left: 4px;" @click.stop="switchTabUp(index)">  
            </el-tooltip>
            <el-tooltip class="box-item" effect="dark" content="向下" placement="top">
              <img src="../../../assets/Down.png" :class="index == (resumeMoudle.length - 1).toString()? 'abandon':''" style="margin-right: 4px;"  @click.stop="switchTabDown(index)">
            </el-tooltip>
            <el-tooltip class="box-item" effect="dark" content="删除" placement="top">
              <img src="../../../assets/del.png" alt="删除"  @click.stop="tabDel(index)">
            </el-tooltip>
          </div>
      </div>
  </div>
  </template>

<script lang="ts" setup>
  import store from "@/store";
  import { ref } from "vue";

  const props = defineProps({
    resumeMoudle:Object
  })
  let resumeMoudle = ref(props.resumeMoudle)
  let focusIndex = ref()
  let focusDetailIndex = ref()
  
  
  const switchTabUp = (index: any) => {
    if (index === 0) {
      } else {
        resumeMoudle.value[index] = resumeMoudle.value.splice(index - 1, 1, resumeMoudle.value[index])[0]
    }
  }
  const switchTabDown = (index: any) => {
    if (index >= resumeMoudle.value.length - 1) {
    } else {
      resumeMoudle.value[index] = resumeMoudle.value.splice(index + 1, 1, resumeMoudle.value[index])[0]
    }
  }
  const tabDel = (index:any) =>{
    resumeMoudle.value.splice(index,1)
  }
  const focusMoudel = (index:any)=>{
    focusIndex.value = index - 0;
  }
  const blurMoudel = ()=>{
    focusIndex.value = null
  }
  const focusDetailMoudel = (index:any)=>{
    focusDetailIndex.value = index - 0;
  }
  const blurDetailMoudel = ()=>{
    focusDetailIndex.value = null
  }
  const editInformation = (index,index1,isExpand:boolean)=>
  {
    if (store.state.isEdit) {
      store.commit('switch',false)
    }
    setTimeout(() => {
      store.commit('chosenOne',index)
      if (isExpand) {
        store.commit('chosenDetail',index1)
      }else{
        store.commit('chosenDetail', 0)
      }
      store.commit('switch',true)
      }, 100);
  }
  const addInformation = (index)=>{
    if (store.state.isEdit) {
      store.commit('switch',false)
    } 
    store.commit('addStructInit',deepClear(resumeMoudle.value[index].inputList[0]))
    setTimeout(() => {
      store.commit('chosenOne',index)
      store.commit('switchAdd',true)
      }, 100);
  }

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
</script>
<style scoped lang="scss">
.control{
  img{
    width: 24px;
    height: 24px;
    opacity: 0.8;
  }
  img:hover{
    opacity: 0.4;
  }
  .abandon{
    opacity: 0.2;
    cursor:not-allowed;
  }
}
.inputList:hover{
          background-color: #EBEDF0
}
.inputList{
        margin: 0 23px 0 32px;
        font-size: 12px;
        text-align: left;
        .menu-title{
          height: 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 14px;
        .title-left{
          font-weight: bold;
          width: 300px;
          text-align: left;
        }
        .title-right{
          width: 200px;
          text-align: end;
          font-size: 12px;
        }
      }
      .sec-title{
        .title-left{
          height: 24px;       
        }
      }
    }
    .active{
      background-color: #F0F2F5;
    }
    .activeTitle{
     @include color-white();
    }
    .title{
      height: 30px;
      display: flex;
      margin: 13px 20px 0;
      justify-content: space-between;
      align-items: center;
      .titleName{
        font-size: large;
        font-weight: bold;
        // color: #409EFF;
        @include base-color();
        margin:0 5px;
      }
      .line{
        flex-grow: 1;
        height: 1px;
        margin:0 5px;
        @include base-background();
      }
    }
  
  </style>
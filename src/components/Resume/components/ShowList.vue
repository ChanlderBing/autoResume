<template>
    <div :class="focusIndex == index ? 'active':''" v-for="(item,index) in resumeMoudle" :key="index"  @click="editInformation(index)" @mouseover="focusMoudel(index)" @mouseleave="blurMoudel()">
      <div class="title">
        <div class="titleName"> {{item.title}}</div>
        <div class="line"></div>
        <div class="control" v-if="focusIndex == index">
        <el-button type="primary" :icon="Top" @click.stop="switchTabUp(index)" circle />
        <el-button type="primary" :icon="Bottom" @click.stop="switchTabDown(index)" circle />
      <button @click.stop="tabDel(index)">删除</button>
      </div>
    </div>
    <div class="inputList">
        <div class="menu-title"> 
          <div class="title-left">{{item.inputList.school}}</div>
          <div class="title-right" v-if="item.inputList.Time.startTime">{{item.inputList.Time.startTime}}至{{item.inputList.Time.endTime}} </div>
        </div>
        <div class="sec-title">
          <div class="title-left"><span>{{item.inputList.academy}}</span> <span>{{item.inputList.degree}}</span> <span>{{item.inputList.city}}</span></div>
        </div>
        <div class="text">
          <div class="textH5" v-html="item.inputList.richText">
          </div>
        </div>
    </div>
  </div>
  </template>

<script lang="ts" setup>
  import store from "@/store";
  import { ref } from "vue";
  import {Top,Bottom} from '@element-plus/icons-vue'
  const props = defineProps({
    resumeMoudle:Object
  })
  let resumeMoudle = ref(props.resumeMoudle)
  let focusIndex = ref()
  
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
  focusIndex.value = index-0;
}
const blurMoudel = ()=>{
  focusIndex.value = null
}
const editInformation = (index)=>
{
  if (store.state.isEdit) {
    store.commit('switch',false)
  }
  setTimeout(() => {
    store.commit('chosenOne',index)
    store.commit('switch',true)
    }, 100);
}

</script>
  <style scoped lang="scss">
    .inputList{
        // height: 200px;
        width: 100%;
        padding: 0 23px 0 32px;
        font-size: 12px;
        text-align: left;
        box-sizing: border-box;
        .menu-title{
          height: 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 14px;
         
        .title-left{
          font-weight: bold;
          width: 100px;
          text-align: left;
        }
        .title-right{
          // width: 240px;
          // margin-right: 20px;
          width: 200px;
          text-align: end;
          font-size: 12px;
        }
      }
      .sec-title{
        height: 24px;
        width: 125px;
        display: flex;
        justify-content: space-between;
        align-items: center; 
      }
      .textH5{
        
      }
    }
    .active{
    background-color: #F0F2F5;
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
        // background-color: #409EFF;
        @include base-background();
      }
    }
  
  </style>
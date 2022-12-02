<template>
    <div :class="focusIndex == index ? 'active':''" v-for="(item,index) in resumeMoudle" :key="index"  @click="editInformation(index)" @mouseover="focusMoudel(index)" @mouseleave="blurMoudel()">
      <div :class="focusIndex == index ? ['activeTitle','title']:'title'">
        <div class="titleName"> {{item.title}}</div>
        <div class="line"></div>
        <div class="control" v-if="focusIndex == index">
          <el-tooltip
        class="box-item"
        effect="dark"
        content="向上"
        placement="top"
      >
      <img src="../../../assets/Up.png"  style="width: 24px;height: 24px; opacity: 0.8;" @click.stop="switchTabUp(index)">  
      </el-tooltip>
      <el-tooltip
        class="box-item"
        effect="dark"
        content="向下"
        placement="top"
      >
      <img src="../../../assets/Down.png" id="dowm" style="width: 24px;height: 24px;margin-right: 2px;opacity: 0.8;"  @click.stop="switchTabDown(index)">
      </el-tooltip>
      <el-tooltip
        class="box-item"
        effect="dark"
        content="删除"
        placement="top"
      >
      <img src="../../../assets/del.png" alt="删除" style="width: 24px;height: 24px;opacity: 0.7;"  @click.stop="tabDel(index)">
      </el-tooltip>

      </div>
    </div>
    <div class="inputList">
        <div class="menu-title"> 
          <div class="title-left">{{item.inputList.school}}</div>
          <div class="title-right" v-if="item.inputList.Time.startTime">{{item.inputList.Time.startTime}}至{{item.inputList.Time.endTime}} </div>
        </div>
        <div class="sec-title">
          <div class="title-left">{{item.inputList.academy}} {{item.inputList.degree}} {{item.inputList.city}}</div>
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
#dowm:hover #dowm{
  width: 50px;
}
.inputList{
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
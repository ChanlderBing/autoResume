<template>
    <div :class="focusIndex == index ? 'active':''" v-for="(item,index) in resumeMoudle" :key="index">
      <div class="title"> {{item.title}}</div>
      <div class="control">
      <button @click="switchTabUp(index)">上</button>
      <button @click="switchTabDown(index)">下</button>
      <button @click="tabDel(index)">删除</button>
    </div>
    <div class="inputList"  @click="editInformation(index)" @mouseover="focusMoudel(index)" @mouseleave="blurMoudel()">
      <div class v-for="(value,key,index) in item.inputList" :key="index">
        <div class="top">
          {{key}} --- {{value}}
        </div>
      </div>
    </div>
    </div>
  </template>

<script lang="ts" setup>
  import store from "@/store";
import { TIMEOUT } from "dns";
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
let renderStruct 
</script>
  <style scoped lang="scss">
    .inputList{
        height: 200px;
        width: 100%;
        background-color: bisque;
    }
    .active{
    background-color: darkgray;
    opacity: 0.4;
  }
  </style>
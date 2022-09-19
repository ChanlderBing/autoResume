<template>
    <div class="information" v-for="(item,index) in resumeMoudle" :key="index" @click="editInformation()">
      <div class="title"> {{item.title}}</div>
      <div class="control">
      <button @click="switchTabUp(index)">上</button>
      <button @click="switchTabDown(index)">下</button>
      <button @click="tabDel(index)">删除</button>
    </div>
    <div class="inputList">
      <div class="list" v-for="(value,key,index) in item.inputList[0]" :key="index">
     {{value}}
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
  let focusIndex = ref(0)
  
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
const focusMoudle = (index:number)=>{
  focusIndex.value = index;
}
const blurMoudel = ()=>{
  focusIndex.value = null
}
const editInformation = ()=>
{
  store.commit('switch',true)
  
}
</script>
  <style scoped lang="scss">
    .inputList{
        height: 200px;
        width: 100%;
        background-color: bisque;
    }
  </style>
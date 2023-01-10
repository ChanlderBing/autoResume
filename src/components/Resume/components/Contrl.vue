<template>
  <el-tooltip class="box-item" effect="dark" content="添加" placement="top">
    <img src="../../../assets/add.png" @click="handClick()">  
  </el-tooltip>
  <el-tooltip class="box-item" effect="dark" content="向上" placement="top">
      <img src="../../../assets/Up.png" :class="index1 == 0? 'abandon':''" style="margin-left: 4px;">  
  </el-tooltip>
  <el-tooltip class="box-item" effect="dark" content="向下" placement="top">
      <img src="../../../assets/Down.png">
  </el-tooltip>
  <el-tooltip class="box-item" effect="dark" content="删除" placement="top">
      <img src="../../../assets/del.png" alt="删除" >
  </el-tooltip>
</template>


<script lang="ts" setup>
  import store from "@/store";
  import { ref } from "vue";

  const props = defineProps({
    index: Number,
    index1: Number
  })
  let focusIndex = ref()
  let focusDetailIndex = ref()

  const emit = defineEmits(["mytest"]);
  const handClick = ()=>{
    emit("mytest","牛的") 
  }
</script>

<style scoped>
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
</style>
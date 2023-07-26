<template>
  <el-tooltip class="box-item" effect="dark" content="添加" placement="top" v-if="addHidden">
    <img src="../../../assets/add.png" @click=addClick()>  
  </el-tooltip>
  <el-tooltip class="box-item" effect="dark" content="向上" placement="top">
      <img src="../../../assets/Up.png" :class="upBan? 'abandon':''" style="margin-left: 4px;" @click="upClick()">  
  </el-tooltip>
  <el-tooltip class="box-item" effect="dark" content="向下" placement="top">
      <img src="../../../assets/Down.png" :class="downBan? 'abandon':''" style="margin-left: 4px;" @click=dowmClick()>
  </el-tooltip>
  <el-tooltip class="box-item" effect="dark" content="删除" placement="top">
      <img src="../../../assets/del.png" alt="删除" @click=delClick()>
  </el-tooltip>
</template>


<script lang="ts" setup>
  const props = defineProps({
    flag: Number,
    addHidden:Boolean,
    upBan:Boolean,
    downBan:Boolean,
    moudleId:Number,
    id:Number,
  })

  const emit = defineEmits(["up","dowm","del","add"]);
  const upClick = ()=>{
    emit("up",props.flag)
  }
  const dowmClick = ()=>{
    emit("dowm",props.flag) 
  }
  const delClick = ()=>{
    if (props.flag === 8) {
      emit("del",{moudleId:props.moudleId,status:false,id:props.id}) 
    }else{
    emit("del",{moudleId:props.moudleId}) 
    }
  }
  const addClick = ()=>{
    emit("add") 
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
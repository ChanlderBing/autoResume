<template>
  <el-card>
    <div class="personal">
      <div class="information">
        <el-button class="btn" color="#fd6549"><span style="height:20px;width: 20px;">+</span>新建简历</el-button>
    </div>
    </div>
  </el-card>
  </template>

<script lang="ts" setup>
import { Plus } from '@element-plus/icons-vue'
</script>

  <style scoped lang="scss">
    .personal{
        height: 200px;
        width: 100%;
        .btn{
          width: 170px;
          height: 50px;
          border-radius: 10px;
          font-size: 16px;
          color:#ffffff;
          span{
          margin: 0px 10px 0 0;
          font-size: 36px;
          }
        }
    }
    
  </style>
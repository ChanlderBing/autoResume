<template>
  <el-row :gutter="10">
    <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4"
      ><div class="grid-content ep-bg-purple"
    /></el-col>
    <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20"
      ><div class="grid-content ep-bg-purple-light" v-for="item in a"
    >{{item.b}}</div></el-col>
  </el-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';


</script>

<style>
  .el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
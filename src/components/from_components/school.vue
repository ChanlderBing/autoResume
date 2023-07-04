<template>
    <div class="menu-title"> 
        <div class="title-left">{{list.school}}</div>
        <div class="title-right" v-if="list.period">{{list.period}} </div>
    </div>
    <div class="sec-title">
        <div class="title-left">{{list.major}}{{list.academy}} {{list.degree}} {{list.city}}</div>
    </div>
    <div class="text">
        <div class="textH5" v-html="list.richText"></div>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';


  const {list}= defineProps({
    list: Object,
  })


</script>

<style scoped>
.menu-title{
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
  
  .textH5{
    width: 300px;
  }
  .sec-title{
    .title-left{
      height: 24px;       
    }
  }
</style>
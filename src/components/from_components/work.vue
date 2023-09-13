<template>
    <div class="menu-title"> 
        <div class="title-left">{{list.experienceName}}</div>
        <div class="title-right" v-if="list.period">{{list.period}} </div>
    </div>
    <div class="sec-title">
        <div class="title-left">{{ list.department }} {{ list.role }} {{ list.city }} </div>
    </div>
    <div class="text">
        <div class="textH5" v-html="list.richText"></div>
    </div>
</template>
<script lang="ts" setup>
import { reactive } from 'vue';
  const {list} = defineProps({
    list: Object,
  })
 // const list = reactive(props.list)
 //响应式 list 为渲染对象，只有list的值发生变化才会触发响应式，改变props.list不会触发响应式
</script>

<style scoped>
.menu-title{
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    margin-top: 4px;
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
    word-wrap:break-word; 
  }
  .sec-title{
    .title-left{
      height: 24px;
      line-height: 24px;        
    }
  }
  ::v-deep ul{
    margin: 0;
    padding: 0;
    margin-left: 16px;
  }
</style>
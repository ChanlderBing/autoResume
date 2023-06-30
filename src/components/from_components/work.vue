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
  const props = defineProps({
    list: Object,
  })
  const list = props.list
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
  
  .sec-title{
    .title-left{
      height: 24px;       
    }
  }
</style>
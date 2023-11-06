<template>
    <div class="menu-title"> 
        <div class="title-left">{{ list.projectName }}</div>
        <div class="title-right" v-if="list.period">{{list.period}} </div>
    </div>
    <div class="sec-title">
        <div class="title-left">{{ list.projectDescription }} {{ list.city }}</div>
    </div>
    <div class="text">
        <div class="textH5" v-html="list.richText"></div>
    </div>
</template>
<script lang="ts" setup>
  const {list} = defineProps({
    list: Object,
  })

</script>

<style lang="scss" scoped>
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
      font-size: 13px;
    }
  }
  .textH5{
    word-wrap:break-word;
  }
  ::v-deep p{
    padding: 2px 0;
  } 
  .sec-title{
    .title-left{
      height: 24px;
      line-height: 24px; 
      font-size: 13px;      
    }
  }
  ::v-deep ul{
    margin: 0;
    padding: 0;
    margin-left: 16px;
  }
  ::v-deep li{
      padding: 1px 0;
  }
</style>
<template>
    <div class="menu-title"> 
    <div class="text">
        <div class="textH5" v-html="props.list.richText"></div>
    </div>
    </div>
</template>
<script lang="ts" setup>
import { onUpdated, reactive, ref, toRefs } from 'vue';

  const props = defineProps({
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
  
  .sec-title{
    .title-left{
      height: 24px;       
    }
  }
</style>
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

<style scoped lang="scss">
.menu-title{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 4px;
  }
  .textH5{
    font-size: 13px;
    word-wrap:break-word; 
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
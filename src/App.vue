<template>
  <router-view  v-slot="{ Component,route }">
  <transition name="routeChange" mode="out-in">
    <div :key="route.name">
      <component :is="Component"></component>
    </div>
  </transition>
</router-view>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
 
 onMounted(() => {
   document.body.style.setProperty('--el-color-primary', '#56AB2F');
   document.body.style.setProperty('--el-color-primary-light-9', '#F5FBF0');
   document.body.style.setProperty('--el-color-primary-light-3', '#95d475');
 })
  
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
html,body,p,ol{
  padding: 0;
  margin: 0;
}

.routeChange-leave-to {
      opacity: 0;
      transform: translateY(8%);
    }
  .routeChange-leave-active {
    transition: all 1s ease;
  }
  .routeChange-enter-active {
    transition: all 1s ease;
  }
  .routeChange-enter-from {
    opacity: 0;
    transform: translateY(-8%)
  }
</style>

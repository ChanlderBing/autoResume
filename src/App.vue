<template>
  <router-view  v-slot="{ Component }">
  <transition name="routeChange">
      <component :is="Component"></component>
  </transition>
</router-view>

</template>

<script setup lang="ts">
  
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

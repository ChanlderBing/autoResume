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

  
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
html,body,p{
  padding: 0;
  margin: 0;
}
html{
  overflow: -moz-hidden-unscrollable;
}
ol{
  padding: 0;
  margin: 0;
  margin-left: 16px;
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

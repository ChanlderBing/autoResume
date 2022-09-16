<template>
  <div class="home">
    <div class="left">
      
    </div>
    <div class="right">
      <div class="features">
        <Features></Features>
      </div>
      <div class="resumeContent">
        <Resume></Resume>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HelloWorld from '@/components/HelloWorld.vue';
import Resume from '@/components/Resume/Resume.vue';
import Features from '@/components/Features.vue'; // @ is an alias to /src
@Options({
  components: {
    HelloWorld,
    Resume,
    Features
  },
})
export default class HomeView extends Vue {
}
</script>

<style lang="scss">

.home {
  display: flex;
  flex-direction: row;
  justify-content: center;
  .left{
    width: 20%;
    height: 200px;
    margin: 0 40px;
    background-color: aqua;
  }
  .right{
    width: 42%;
    display: flex;
    flex-direction: column;
  }
}
</style>
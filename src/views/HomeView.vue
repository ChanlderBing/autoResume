<template>
  <div class="home">
    <div class="left">
      <Transition name="fade" mode="out-in">
        <div class="edit" v-if="store.state.isEdit" >
          <Skill></Skill>
        </div>
        <div class="test" v-else>
          <Summary></Summary> 
        </div>
      </Transition>
    </div>
    <div class="right">
      <div class="resumeContent">
        <Resume></Resume>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Options, Vue} from 'vue-class-component'
import Resume from '@/components/Resume/Resume.vue'
import Features from '@/components/Features.vue' // @ is an alias to /src
import store from '@/store';
import { ref,reactive } from "vue";
import Skill from '@/components/Resume/components/Skill.vue';
import Summary from '@/components/Resume/components/Summary.vue';

const back = ()=>{
  store.commit('switch',false)
}

</script>

<style lang="scss">
.home {
  display: flex;
  flex-direction: row;
  justify-content: center;
  .left {
    .edit{
    width: 700px;
    height: 800px;
    margin: 0 40px;
    background-color: aqua;
    }
    .test{
    width: 500px;
    height: 600px;
    margin: 0 40px;
    background-color: pink;
    }
  }
  .right {
    width: 700px;
    display: flex;
    flex-direction: column;
  }
}
.fade-enter,
.fade-leave-to {
      opacity: 0;
      transform: translateY(-8%);
    }
    .fade-enter-active,
    .fade-leave-active {
        transition: all 1.2s ease;
    }

    .fade-enter-to {
        transform: translateY(1%)
    }
</style>
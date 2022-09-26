<template>
  <div class="home">
    <div class="left">
      <Transition name="fade" mode="out-in">
        <div class="edit" v-if="store.state.isEdit" >
          <EditForm></EditForm>
        </div>
        <div class="test" v-else>
          <Summary></Summary> 
        </div>
      </Transition>
    </div>
    <div class="right">
      <div class="resumeContent">
        <Transition name="resume" mode="out-in">
        <div v-if="store.state.isEdit" >
          <Resume></Resume>
        </div>
        <div v-else>
          <Resume></Resume>
        </div>
      </Transition>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Resume from '@/components/Resume/Resume.vue'
import store from '@/store';
import Summary from '@/components/Resume/components/Summary.vue';
import EditForm from '@/components/Resume/components/EditForm.vue';

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
    }
    .test{
    width: 500px;
    height: 600px;
    margin: 0 40px;
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
        transition: all 0.6s ease;
    }

    .fade-enter-to {
        transform: translateY(1%)
    }
    .resume-leave-to {
      opacity: 0;
      transform: translateX(8%);
    }
    .resume-enter-active,
    .resume-leave-active {
        transition: all 0.6s ease;
    }
    .resume-enter-to {
        transform: translateX(-1%)
    }
    
</style>
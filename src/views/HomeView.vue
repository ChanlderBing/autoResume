<template>
  <div class="home">
    <div class="left">
      <div class="edit" v-if="store.state.isEdit">
      <button @click="back">回去</button>
      <Skill></Skill>
      <!-- <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item label="Approved by">
      <el-input v-model="formInline.user" placeholder="Approved by" />
    </el-form-item>
    <el-form-item label="Activity zone">
      <el-select v-model="formInline.region" placeholder="Activity zone">
        <el-option label="Zone one" value="shanghai" />
        <el-option label="Zone two" value="beijing" />
      </el-select>
    </el-form-item>
    <el-form-item label="Activity time" v-if="formInline">
      <el-col :span="11">
        <el-date-picker
          v-model="formInline"
          type="date"
          label="Pick a date"
          placeholder="Pick a date"
          style="width: 100%"
        />
      </el-col>
      <el-col class="text-center" :span="1" style="margin: 0 0.5rem">-</el-col>
      <el-col :span="11">
        <el-time-picker
          v-model="formInline"
          label="Pick a time"
          placeholder="Pick a time"
          style="width: 100%"
        />
      </el-col>
    </el-form-item>
  </el-form> -->
  </div>
      <div class="test" v-else></div>
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

const back = ()=>{
  store.commit('switch',false)
}
const formInline = reactive({
  user: '',
  region: '',
})

const onSubmit = () => {
  console.log('submit!')
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
    width: 20%;
    height: 400px;
    margin: 0 40px;
    background-color: pink;
    }
  }
  .right {
    width: 42%;
    display: flex;
    flex-direction: column;
  }
}
</style>
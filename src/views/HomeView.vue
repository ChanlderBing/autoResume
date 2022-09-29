<template>
  <div class="menu" >
    <el-menu
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
  >
    <el-menu-item index="0">LOGO</el-menu-item>
    <div class="flex-grow" />
    <el-menu-item index="1"
    @click="dialogVisible=true">登录</el-menu-item>
    <el-menu-item index="2"
    @click="print()">打印</el-menu-item>
  </el-menu>
  </div> 
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

  <el-dialog
    v-model="dialogVisible"
    title="登录获取存档"
    width="30%"
    heigt="30%"
  >
  <el-form
    label-width="100px"
    :model="formLabelAlign"
    style="max-width: 460px"
  >
    <el-form-item label="账号">
      <el-input v-model="formLabelAlign.Name" />
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="formLabelAlign.region" />
    </el-form-item>
  </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">再想想</el-button>
        <el-button type="primary" @click="loginToGet"
          >确认</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import Resume from '@/components/Resume/Resume.vue'
import store from '@/store';
import Summary from '@/components/Resume/components/Summary.vue';
import EditForm from '@/components/Resume/components/EditForm.vue';
import printjs from 'print-js'
import { ref } from 'vue';


const formLabelAlign =  ref({
  Name:'',
  region:''
})
const dialogVisible = ref(false)
const loginToGet = ()=>{
  dialogVisible.value = false
}
const print = () => {
  printjs({
    printable: 'printC',
    type: 'html',
    targetStyles: ['*'],
    header: null
  })
}
</script>

<style lang="scss">
  .menu{
    margin-bottom: 10px;
    .flex-grow{
      flex-grow: 1;
    }
  }
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
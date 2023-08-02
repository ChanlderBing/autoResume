<template>
  <div>
  <div class="menu" >
    <el-menu
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
  >
    <el-menu-item index="0">LOGO</el-menu-item>
    <div class="flex-grow" />
      <div class="moon1" >
        <transition name ="svg">
          <svg v-if ="!dayNightSwitch" t="1668165895536" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9685" width="20" height="20"><path d="M733.7 649.3c-219.3 0-396.9-181.2-396.9-404.8 0-41 6.1-80.6 17.2-117.8C217 190.5 121.8 331.3 121.8 495c0 223.6 177.6 404.8 396.9 404.8 179 0 330.3-120.9 379.7-287-50.4 23.3-106.1 36.5-164.7 36.5z" fill="#FFD46C" p-id="9686"></path><path d="M551.8 864c-219.3 0-396.9-181.2-396.9-404.8 0-102.9 37.9-197 100-268.3-82.8 74.1-135.3 182.8-135.3 304 0 223.6 177.6 404.8 396.9 404.8 117.9 0 224-52.5 296.4-135.8C743.3 826.1 652 864 551.8 864z" fill="#F49D18" p-id="9687"></path><path d="M518.4 912C311.6 912 137 754.1 112.6 545.1c-0.2-2.6 0.5-5 1.9-7.2 1.6-1.9 3.8-3.4 6.4-3.6l5.2-0.7h1.2c4.7 0 8.7 3.6 9.4 8.4C159.8 738.8 324 887.3 518.8 887.3c159.5 0 303.5-101.5 359.7-252.9-46.1 18-94.8 26.9-144.7 26.9-225.4 0-408.9-187.2-408.9-417 0-31.9 3.5-63.6 10.6-94.5C227.3 210 151.3 323.5 136.7 447.6c-0.5 4.8-4.7 8.4-9.4 8.4h-1.2l-5.2-0.7c-2.6-0.2-4.7-1.7-6.4-3.6-1.6-1.9-2.4-4.6-1.9-7 8.5-71.3 35.1-139.7 77.2-197.5 41.1-57 96.2-102.6 159.2-131.8l5.4-2.4c1.2-0.5 2.6-1 4-1 2.4 0 4.5 0.7 6.1 2.4 2.8 2.4 3.8 6.5 2.8 10.1l-1.6 5.8c-11.1 37-16.7 75.3-16.7 114.2C349 460.9 521.7 637 733.7 637c55.5 0 109.2-12 159.5-35.5l5.4-2.4c1.2-0.5 2.6-1 4-1 2.4 0 4.5 1 6.1 2.4 2.8 2.4 4 6.5 2.8 10.1l-1.6 5.8c-24.9 83.7-76.7 159.1-145.6 212.1C693 883 608.1 912 518.4 912z" fill="#231815" p-id="9688"></path><path d="M518.4 909.6c-205.6 0-379.2-156.9-403.5-364.7-0.2-1.9 0.2-3.8 1.4-5.3 1.2-1.4 2.8-2.4 4.7-2.6l5.2-0.7h0.9c3.5 0 6.6 2.6 7.1 6.2C157.5 740.7 322.6 890 518.6 890c163.5 0 308.2-103.9 363.7-259.4-47.3 19.2-97.4 28.8-148.7 28.8-224.2 0-406.5-186-406.5-414.6 0-33.6 4-66.9 11.8-99.3-111.8 60-189.6 174.7-204.7 302.1-0.5 3.6-3.5 6.2-7.1 6.2h-0.9l-5.2-0.7c-1.9-0.2-3.5-1.2-4.7-2.6-1.2-1.4-1.6-3.4-1.4-5.3 8.2-71 34.8-138.9 76.7-196.3 40.9-56.6 95.8-101.7 158.3-131l5.4-2.4c0.9-0.5 1.9-0.7 2.8-0.7 1.6 0 3.3 0.7 4.7 1.9 2.1 1.9 2.8 4.8 2.1 7.4l-1.6 5.8c-11.1 37.2-16.7 75.8-16.7 114.9 0 217.6 173.6 395 387.2 395 56 0 109.9-12 160.7-35.5l5.4-2.4c0.9-0.5 1.9-0.7 2.8-0.7 1.6 0 3.3 0.7 4.7 1.7 2.1 1.9 2.8 4.8 2.1 7.4l-1.6 5.8c-24.7 83.3-76.2 158.1-144.7 210.7-71.4 54-155.9 82.8-244.8 82.8z" fill="#231815" p-id="9689"></path><path d="M330.7 423c2.8-3.1 2.8-8.4-0.7-11.5-3.3-3.4-8-3.1-11.3 0 0.2 0.5-29.4 34.8-60.9 41.5-31.3 6-62.3-11.5-62.6-12-3.5-2.2-8.2-0.7-10.8 3.4-1.9 4.1-0.2 9.1 3.5 11.5 0 0 36.7 20.9 73.6 13.4 36.5-7.7 68.7-46.1 69.2-46.3z" fill="#091E33" p-id="9690"></path><path d="M342.9 449.6l-24.7-13c-3.5-1.9-4.7-6.2-3.1-9.6l0.7-1.4c1.9-3.6 6.1-5 9.4-3.1l24.7 13c3.5 1.9 4.7 6.2 3.1 9.6l-0.7 1.4c-1.6 3.6-5.9 5-9.4 3.1zM319.4 470.7l-18.6-20.9c-2.6-2.9-2.4-7.4 0.5-10.1l1.2-1.2c2.8-2.6 7.3-2.4 9.9 0.5l18.6 20.9c2.6 2.9 2.4 7.4-0.5 10.1l-1.2 1.2c-2.9 2.6-7.3 2.4-9.9-0.5zM294.9 487.3L281 462.8c-1.9-3.4-0.7-7.9 2.6-9.8l1.4-1c3.3-1.9 7.8-0.7 9.6 2.6l13.9 24.5c1.9 3.4 0.7 7.9-2.6 9.8l-1.4 1c-3.2 1.9-7.7 0.7-9.6-2.6zM265.7 495l-9.2-26.6c-1.2-3.8 0.7-7.9 4.2-9.1l1.6-0.5c3.8-1.2 7.8 0.7 8.9 4.6l9.2 26.6c1.2 3.8-0.7 7.9-4.2 9.1l-1.6 0.5c-3.7 1.1-7.7-0.8-8.9-4.6zM234.5 498.3V470c0-4.1 3.1-7.2 7.1-7.2h1.6c4 0 7.1 3.1 7.1 7.2v28.3c0 4.1-3.1 7.2-7.1 7.2h-1.6c-4.1 0-7.1-3.1-7.1-7.2zM204.6 493l7.8-27.1c1.2-3.8 4.9-6 8.7-4.8l1.6 0.5c3.8 1.2 5.9 5 4.7 8.9l-7.8 27.1c-1.2 3.8-4.9 6-8.7 4.8l-1.6-0.5c-3.6-1.2-5.7-5-4.7-8.9zM175.2 477.4l16.5-22.8c2.4-3.1 6.8-3.8 9.9-1.4l1.4 1c3.1 2.4 3.8 7 1.4 10.1L187.9 487c-2.4 3.1-6.8 3.8-9.9 1.4l-1.4-1c-3.1-2.3-3.8-6.6-1.4-10z" fill="#091E33" p-id="9691"></path></svg>
        </transition>
      </div>
  
    <el-switch
      v-model="dayNightSwitch"
      :change="changeTheme(dayNightSwitch)"
      class="ml-2"
      style="--el-switch-on-color: #80C8EA; --el-switch-off-color: #626aef;margin: auto 0;"
    />
      <div class="moon2" >
        <transition name ="svg">
          <svg v-if ="dayNightSwitch" t="1669289414491" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2851" width="26" height="26"><path d="M270.387022 463.499421A226.484357 226.484357 0 1 1 496.871379 689.983778a226.484357 226.484357 0 0 1-226.484357-226.484357z" fill="#FFDA6A" p-id="2852"></path><path d="M496.12978 823.76825a16.31518 16.31518 0 0 1-8.899189-2.966396L444.959444 790.396292a16.611819 16.611819 0 0 1-3.707996-22.989571 16.760139 16.760139 0 0 1 23.137892-3.856315l33.371958 24.176129 36.190035-22.247972a16.463499 16.463499 0 0 1 16.908458 28.329085l-46.127462 27.735805a16.611819 16.611819 0 0 1-8.602549 2.224797z m193.705678-88.10197a16.463499 16.463499 0 0 1-4.746234-32.482039l41.677868-10.382387 6.674391-40.19467a16.463499 16.463499 0 0 1 32.630359 5.339514l-8.454229 51.318655a16.908459 16.908459 0 0 1-12.310545 13.348784l-52.208574 13.052143zM311.471611 733.738123a12.013905 12.013905 0 0 1-3.263036 0l-51.318656-8.45423a16.463499 16.463499 0 0 1-13.348783-12.310544l-13.052144-52.060255a16.463499 16.463499 0 1 1 31.59212-8.30591l10.382387 41.826188 40.49131 6.526072a16.463499 16.463499 0 0 1-1.483198 32.778679z m187.772885-17.650058a251.253766 251.253766 0 1 1 250.660487-251.253766 251.253766 251.253766 0 0 1-251.105446 251.253766z m0-32.926999a218.326767 218.326767 0 1 0-218.771727-218.326767 218.326767 218.326767 0 0 0 218.326768 218.326767z m-312.954809-156.180765a16.01854 16.01854 0 0 1-14.831981-7.86095l-27.735806-46.275782a16.463499 16.463499 0 0 1 0.741599-18.095017l29.663963-42.271148a16.463499 16.463499 0 0 1 26.697567 19.281576L177.983778 465.279258l22.099652 36.783314a16.463499 16.463499 0 0 1-5.636153 22.544612 14.831981 14.831981 0 0 1-8.15759 2.373117z m625.019699 0a14.831981 14.831981 0 0 1-7.71263-2.373117 16.463499 16.463499 0 0 1-5.636153-22.544612l22.099652-36.783314-23.87949-33.520278a16.16686 16.16686 0 0 1 3.707995-22.841251 16.463499 16.463499 0 0 1 22.989571 3.559675l30.405562 42.271148a16.31518 16.31518 0 0 1 0 18.095017L826.141367 519.119351a16.01854 16.01854 0 0 1-14.831981 7.86095zM338.910776 470.173812a16.463499 16.463499 0 0 1-14.831981-17.501738c3.263036-50.577057 19.429896-90.030127 49.242178-117.469293a185.103129 185.103129 0 0 1 118.655852-43.012746 16.463499 16.463499 0 1 1 1.779838 32.926999c-44.495944 2.373117-76.533024 14.090382-98.780997 34.410197s-35.745075 50.577057-38.563152 95.221321a16.611819 16.611819 0 0 1-17.501738 15.42526zM749.015064 294.414832a16.611819 16.611819 0 0 1-14.831982-13.793743l-7.41599-40.639629-41.677868-10.382387a16.463499 16.463499 0 0 1 8.00927-32.03708l52.208574 13.052144a16.760139 16.760139 0 0 1 12.310545 13.348783l8.454229 51.318656a16.908459 16.908459 0 0 1-13.645423 18.984936z m-504.28737-1.928158a12.310545 12.310545 0 0 1-3.263036 0 16.31518 16.31518 0 0 1-12.013905-20.023175l13.052144-52.208574a16.760139 16.760139 0 0 1 13.348783-12.310545l51.318656-8.30591a16.463499 16.463499 0 1 1 5.191194 32.48204l-40.49131 6.674392-10.382387 41.677867a16.463499 16.463499 0 0 1-16.16686 12.013905z m209.872538-120.287369a16.463499 16.463499 0 0 1-10.234067-29.663963l42.271147-29.663963a16.463499 16.463499 0 0 1 18.095017 0l46.127462 27.735805a16.31518 16.31518 0 0 1 5.636153 22.544612 16.463499 16.463499 0 0 1-22.544611 5.784473l-36.783314-22.247972-32.778679 22.396292a17.056779 17.056779 0 0 1-9.195829 3.114716z" fill="#333333" p-id="2853"></path></svg>
        </transition>
      </div>

  <el-menu-item index="1"
    @click="goToLogin()">登录</el-menu-item>
    <el-menu-item index="2"
    @click="print">打印</el-menu-item>
  </el-menu>
  </div> 
  <div class="home">
    <div class="left">
      <Transition name="fade" mode="out-in">
        <div class="edit" v-if="store.state.isEdit" >
          <EditForm @updateResume="changeResume(store.state.currentResumeId)"></EditForm>
        </div>
        <div class="edit" v-else-if="store.state.editPersonal" >
          <PersonEditForm @updateResume="changeResume(store.state.currentResumeId)"></PersonEditForm>
        </div>
        <div class="edit" v-else-if="store.state.isAdd">
          <AddForm @updateResume="changeResume(store.state.currentResumeId)"></AddForm>
        </div>
        <div class="edit" v-else-if="store.state.addPersonal">
          <PersonAddForm @updateResume="changeResume"></PersonAddForm>
        </div>
        <div class="test" v-else>
          <Summary @changeResume="changeResume"  @changeModelResume="changeModelResume" ></Summary> 
        </div>
      </Transition>
    </div>
    <div class="right">
      <div class="resumeContent">
        <Transition name="resume" mode="out-in">
        <div v-if="store.state.isEdit ||store.state.isAdd || store.state.editPersonal|| store.state.addPersonal" >
          <Resume @updateResume="changeResume"></Resume>
        </div>
        <div v-else>
          <Resume @updateResume="changeResume"></Resume>
        </div>
      </Transition>
      </div>
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
import AddForm from '@/components/Resume/components/AddForm.vue';
import printjs from 'print-js'
import { reactive, ref,provide, onMounted, watch, toRefs, nextTick, onUpdated, watchEffect } from 'vue';
import PersonEditForm from '@/components/Resume/components/PersonEditForm.vue';
import PersonAddForm from '@/components/Resume/components/PersonAddForm.vue';
import {  useRouter } from 'vue-router';
import  axios  from '../api/http';

const formLabelAlign =  ref({
  Name:'',
  region:''
})
const dialogVisible = ref(false)
const loginToGet = ()=>{
  dialogVisible.value = false
}

const router = useRouter()
const goToLogin = ()=>{
  router.push({name:"login"})
}

let resumeMoudle = ref(null)
let personalMoudle = ref(null)
let currentResumeName = ref(null)
let printResumeName = ref(null)

watch(() => store.state.editPersonal,() => {
    if (store.state.currentResumeId === store.state.modelResumeId &&!store.state.editPersonal) {
      personalMoudle.value = JSON.parse(localStorage.getItem('personalMoudle'))
    }
    },{
      deep:true,
    })

watch(() => store.state.isEdit,() => {
if (store.state.currentResumeId === store.state.modelResumeId &&!store.state.isEdit) {
  resumeMoudle.value = JSON.parse(localStorage.getItem('resumeMoudle'))
}
},{
  deep:true,
})

watch(() => store.state.isAdd,() => {
if (store.state.currentResumeId === store.state.modelResumeId &&!store.state.isAdd) {
  resumeMoudle.value = JSON.parse(localStorage.getItem('resumeMoudle'))
}
},{
  deep:true,
}) 

const currentResumeNameChange = (ResumeName)=>{
  currentResumeName.value = ResumeName
}

provide('resumeMoudle',resumeMoudle)
provide('personalMoudle',personalMoudle)

//调用切换接口获取简历
const changeResume = async (resumeId)=>{
  const {data:res} = await axios.get(`posts/getUserResume?resumeId=${resumeId}`)
  store.commit('changeCurrentResumeId',resumeId)
  resumeMoudle.value = res.data.resumeMoudle
  personalMoudle.value = res.data.personalMoudle
}
//切换模板简历简历
const changeModelResume = async ()=>{
  store.commit('changeCurrentResumeId',store.state.modelResumeId)
  resumeMoudle.value = JSON.parse(localStorage.getItem('resumeMoudle'))
  personalMoudle.value = JSON.parse(localStorage.getItem('personalMoudle'))
}
//调用接口获取简历 未登录
const getResumeInit = async ()=>{
  const {data:res} = await axios.get(`posts/getResumeInit`)
  store.commit('changeCurrentResumeId',res.data.resumeId)
  resumeMoudle.value = res.data.resumeMoudle
  personalMoudle.value = res.data.personalMoudle
  localStorage.setItem('resumeMoudle', JSON.stringify(res.data.resumeMoudle))
  localStorage.setItem('personalMoudle',JSON.stringify(res.data.personalMoudle))
}
//调用接口获取不显示
const getResumeInitWithoutPath = async ()=>{
  const {data:res} = await axios.get(`posts/getResumeInit`)
  localStorage.setItem('resumeMoudle', JSON.stringify(res.data.resumeMoudle))
  localStorage.setItem('personalMoudle',JSON.stringify(res.data.personalMoudle))
}
//调用接口获取简历 登录
const resumeInitByJWT = async ()=>{
  const {data:res} = await axios.get(`posts/ResumeInitByJWT`).catch(async (err)=>{
    return  await axios.get(`posts/getResumeInit`)
  })
  store.commit('changeCurrentResumeId',res.data.resumeId)
  resumeMoudle.value = res.data.resumeMoudle
  personalMoudle.value = res.data.personalMoudle
}

const getResumeName = async (resumeId)=>{
  if (store.state.token && store.state.currentResumeId !==store.state.modelResumeId) {
    const {data:res} = await axios.get(`posts/getUserResumeName?resumeId=${resumeId}`)
    if (res.data[0].resumeName === '') {
      document.title = '未命名简历'
    }else{
    document.title =  res.data[0].resumeName
    }
  } else {
    document.title = JSON.parse(localStorage.getItem('modelResume'))[0].resumeName
  }
}
const print =  () => {
  //currentResume实则为resumeId
  getResumeName(store.state.currentResumeId)
  let focuser = setInterval(()=> window.dispatchEvent(new Event('focus')),500)
  printjs({
    printable: 'printC',
    type: 'html',
    targetStyles: ['*'],
    onPrintDialogClose:()=>{
      nextTick(()=>{
      clearInterval(focuser)
      document.title = "简单简历"
    })
    }
   // style:"@media print{@page {size:portrait}};",
  })
}

// 黑夜模式
const dayNightSwitch = ref(true)
const changeTheme = (value)=>{
    window.document.getElementById('app')?.setAttribute('data-theme1', dayNightSwitch.value ? 'light-theme':'dark-theme')
}

onMounted:{
  if (store.state.token) {
    resumeInitByJWT()
    if(localStorage.getItem("resumeMoudle")){
      resumeMoudle.value = JSON.parse(localStorage.getItem('resumeMoudle'))
      personalMoudle.value = JSON.parse(localStorage.getItem('personalMoudle'))
    }else{
      getResumeInitWithoutPath()
    }
  }else{
      if(localStorage.getItem("resumeMoudle")){
        resumeMoudle.value = JSON.parse(localStorage.getItem('resumeMoudle'))
        personalMoudle.value = JSON.parse(localStorage.getItem('personalMoudle'))
      }else{
        getResumeInit()
      }
    }
  }
</script>

<style lang="scss">
  .menu{
    .el-menu {
    @include left-background();
    @include border-background();
    .el-menu-item{
        @include home-color();
      }
    }
    width: 100%;
    .flex-grow{
      flex-grow: 1;
    }
    .moon1{
     position: relative;
     width: 28px;
     svg{
        position: absolute;
        top: 20px;
        right: 6px;
      }
    }
    .moon2{
     position: relative;
     width: 28px;
     svg{
        position: absolute;
        top: 18px;
        right: 0px;
      }
    }
  }
  .home {
    display: flex;
    flex-direction: row;
    justify-content: center;
    height: 1206px;
    @include home-background();
    @include home-color();
    padding-top: 20px;
    .left {
      .edit{
      width: 700px;
      height: 800px;
      margin: 0 40px;
      }
      .test{
      width: 470px;
      height: 600px;
      margin: 0 40px;
      // --el-color-primary:#626aef;
      // --el-color-primary-light-3:#969bf3;
      // --el-color-primary-dark-2:#5a61eb;
      .el-card {
        @include border-background();
      }
      .el-card__body{
        @include left-background();
        }
      }
    }
    .right {
      width: 700px;
      display: flex;
      flex-direction: column;
    }
  }


  .fade-leave-to {
      opacity: 0;
      transform: translateY(8%);
    }
  .fade-leave-active {
    transition: all 0.6s ease;
  }
  .fade-enter-active {
    transition: all 0.5s ease;
  }
  .fade-enter-from {
    opacity: 0;
    transform: translateY(-8%)
  }

  .resume-leave-to {
    opacity: 0;
    transform: translateX(8%);
  }
  .resume-enter-active{
    transition: all 0.5s ease;
  }
  .resume-leave-active {
      transition: all 0.6s ease;
  }
  .resume-enter-from {
      opacity: 0;
      transform: translateX(2%)
  }
    
  .svg-enter-from{
    transform: translateY(24px);
    opacity: 0;
  }
  .svg-enter-active {
      transition: all 1.2s ease;
  }
  .svg-leave-to {
      opacity: 0;
      transform: translateY(24PX);
  }
  .svg-leave-active {
      transition: all 1.2s ease;
  }
</style>
<template>
  <el-card>
    <div class="personal">
      <div class="information">
        <div class="plusBtn"><el-button class="btn" type="primary" @click="createResume()"><span>+</span>新建简历</el-button></div>
          <el-menu
            class="el-menu-demo"
            mode="horizontal"
            @select="switchTab"
            :default-active="activeIndex"
          >
            <el-menu-item index="1">我的简历</el-menu-item>
            <el-menu-item index="2">简历模板</el-menu-item>
          </el-menu>
          <div class="resumeList" loading="loading" >
            <el-empty v-if="arr.authResume&&arr.authResume.length < 1 && activeIndex === '1'" description="暂时没有数据" >
              <el-button type="primary" @click="clickToLogin" v-if="!store.state.token">去登录</el-button>
            </el-empty>
            <el-scrollbar max-height="270px">
              <div class="resume" v-for="(item,index) in arr.resumeList">
                  <div class="content" @click="resumeChange(item.resumeId)">
                    <div class="pic"><img src="../../../assets/img/wyk.jpg"/> </div>
                      <div class="resumeDetail">
                        <div class="top">
                            <span  class="resumeName" @click.stop="test(item.resumeId)" v-if="item.editActive === 0">{{item.resumeName ? item.resumeName:'未命名简历'}}</span>
                            <span v-else-if="item.editActive === 1">
                              <el-input 
                              ref="inputRef"
                              v-model="item.resumeName"
                              @click.stop
                              @blur="emptyCheck(item.resumeId,item.resumeName)"
                                />
                            </span>
                          <span  class="editBtn"><img src="../../../assets/more.png" style="width: 32px;height: 32px;position: absolute;left: -40px;top: -5px;"></span>
                        </div>
                        <div class="editTime" v-if="item.resumeId===resumeId"> 
                          <el-tooltip
                          class="box-item"
                          effect="dark"
                          content="正在查看此简历"
                          placement="top-start"
                          ><svg t="1688526287308" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="15443" width="25" height="25"><path d="M459.8 305.8c11 0 20 9 20 20v15c0 11-9 20-20 20H294.2c-11 0-20-9-20-20v-15c0-11 9-20 20-20h165.6zM347.5 458.6c11 0 20 9 20 20v15c0 11-9 20-20 20h-53.2c-11 0-20-9-20-20v-15c0-11 9-20 20-20h53.2zM347.5 617.7c11 0 20 9 20 20v15c0 11-9 20-20 20h-53.2c-11 0-20-9-20-20v-15c0-11 9-20 20-20h53.2z" fill="#2680F0" p-id="15444"></path><path d="M579.1 345c-116.9 0-211.6 94.7-211.6 211.6 0 116.9 94.7 211.6 211.6 211.6 116.9 0 211.6-94.7 211.6-211.6C790.8 439.7 696 345 579.1 345z m0 369.6c-87.3 0-158-70.8-158-158 0-87.3 70.8-158 158-158s158 70.8 158 158c0.1 87.3-70.7 158-158 158z" fill="#2680F0" p-id="15445"></path><path d="M913.7 875.7c7.8 7.8 7.8 20.5 0 28.3l-10.1 10.1c-7.8 7.8-20.5 7.8-28.3 0L697.7 736.6c-7.8-7.8-7.8-20.5 0-28.3l10.1-10.1c7.8-7.8 20.5-7.8 28.3 0l177.6 177.5z" fill="#2680F0" p-id="15446"></path><path d="M750.7 827.3c-7.8-7.8-14.1-5.1-14.1 5.9V858c0 11-9 20-20 20l-475.8-0.5c-11 0-20-9-20-20V171.9c0-11 9-20 20-20h369.1c11 0 20 9 20 20v68.5c0 11 9 20 20 20h66.7c11 0 20 9 20 20v88.3c0 11 5.6 27.1 12.4 35.7l32 52.3c4.7 10 8.5 9.1 8.5-1.9l0.1-204.7c0-11-6.3-26.4-14.1-34.2L673 113.1c-7.8-7.8-23.1-14.2-34.1-14.2H190.1c-11 0-20 9-20 20v789.4c0 11 9 20 20 20h579.1c11 0 20-9 20-20v-22.5c0-11-6.4-26.4-14.1-34.1l-24.4-24.4z" fill="#2680F0" p-id="15447"></path></svg>
                          </el-tooltip>
                        </div>    
                     
                       
                      <div class="editTime">最后编辑于12-08</div>
                    </div>
                  </div>
     
              </div>
            </el-scrollbar>
          </div>
    </div>
    </div>
  </el-card>
  <el-card class="personalExp">
    <div >
     经历库
    </div>
  </el-card>

  </template>


<script lang="ts" setup>
import  axios  from '../../../api/http';
import { defineEmits, ref, reactive,computed, onMounted, nextTick, getCurrentInstance } from 'vue';
import { ElMessage } from 'element-plus';
import store from '@/store';
import router from '@/router';
//未登录，获取固定模板。登录后获取个人简历列表显示第一份简历
//按钮上传文件，获取登录信息。弹出登录信息/个人信息添加表
//TAB切换

// const token = ref(localStorage.getItem("token"))

// const resumeType = computed(()=>{
//   return token ? '我的简历':'简历模板'
// })

//结构赋值会失去响应式
const  prop  = defineProps({
  resumeId: Number,
  })

// 自定义指令
// const vFocus = {
//   mounted(el,{value}) {
//     if (value) {
//       console.log(el);
//       el.focus()
//     }
       
//   }
// }
const inputRef = ref(null)
const createResumeName = ref('')
const test = (id)=>{
  arr.resumeList.forEach(item=> {
    item.editActive = 0
  })
  
  const index = arr.resumeList.findIndex((item)=>{
    return item.resumeId === id
  })
  createResumeName.value = arr.resumeList[index].resumeName
  arr.resumeList[index].editActive = 1
  setTimeout(()=>{
    inputRef.value[0].focus()
  },0)
}
const loading = ref(true)
//新建简历
const createResume = ()=>{
    if (!store.state.token) {
      ElMessage.error('请先登录！')
  } else {
      store.commit('switchAddPersonal',true)
  }
}

//切换简历
const emit = defineEmits(['changeResume','currentResumeNameChange'])
const resumeChange = (resumeId1:number)=>{
  if (resumeId1 === prop.resumeId) {
    ElMessage.warning('正在浏览该简历')
  }else if(!localStorage.getItem("token")) {
      ElMessage.error('请先登录！')
  } else {
       //选择简历
    emit('changeResume',resumeId1)
  }
}
const clickToLogin = ()=>{
  router.push({name:'login'})
}

const arr = reactive({
  resumeList:null,//列表简历
  modelResume:[],
  authResume:[]
})
const activeIndex = ref('1') 
const switchTab = (key: string) => {
 if (key === '1') {
  activeIndex.value = '1' 
  arr.resumeList = arr.authResume
 } else {
  activeIndex.value = '2' 
  arr.resumeList = arr.modelResume
 }
}

const emptyCheck = (resumeId,resumeName)=>{
  if (!resumeName) {
    ElMessage.error('修改值不能为空')
    inputRef.value[0].focus()
  }else{
    const index = arr.resumeList.findIndex((item)=>{
      return item.resumeId === resumeId
  })
  if (activeIndex.value !== '2' &&createResumeName.value !==resumeName) {
    axios.post('posts/updateResumeName',{resumeId:resumeId,resumeName:resumeName}).then(res=>{
      if (res?.data.code === 0) { 
        ElMessage.success('修改成功')  
      }
    })
  } else if(createResumeName.value !==resumeName){
    emit('currentResumeNameChange',resumeName)
  }
  arr.resumeList[index].editActive = 0
 }
}
const getModelResume = ()=>{
  axios.get('posts/getUserResumeAll').then(res=>{
      if (res?.data?.data?.code === 200) { 
        arr.authResume = res.data.data.data
        arr.resumeList = arr.authResume
        loading.value = false
      }
  }).catch(err=>{
    ElMessage.info('登录信息已过期，请重新登录获取个人信息')
  }).finally(()=>{
    loading.value = false
  })
}
const getResume = async ()=>{
  const {data:res} = await axios.get('posts/getUserResumeOne').finally(()=>{
    loading.value = false
  })
  arr.modelResume = res.data.data
  localStorage.setItem('modelResume',JSON.stringify(arr.modelResume))
}

const noTokenToGet = ()=>{
  if(localStorage.getItem("modelResume")){
    arr.modelResume= JSON.parse(localStorage.getItem("modelResume"))
    loading.value = false
  }else{
    getResume()
  }
}

onMounted:{
  if (store.state.token) {
    getModelResume()
  }
  noTokenToGet()
}
</script>

  <style scoped lang="scss">
    .personal{
        width: 100%;
        .plusBtn{
          margin-bottom: 16px;
        .btn{
          width: 170px;
          height: 50px;
          border-radius: 10px;
          font-size: 16px;
          color:#ffffff;
          span{
            height:34px;
            width: 20px;
            margin: 0px 10px 0 0;
            font-size: 36px;
          }
        }
      }
      .el-menu{
        @include left-background();
        @include border-background();
        --el-color-primary: #626aef;
        --el-color-primary-light-3: #969bf3;
        --el-color-primary-dark-2: #5a61eb;
      }
      .el-menu-item{
        @include home-color();
      }
        .resumeList{
          .resume:hover{
            box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
          }
          .resume{
            border:1px solid;
            @include border-background();
            border-radius: 4px;
            margin-top: 16px;
            .content{
            display: flex;
            margin: 10px 6px 10px 10px;
            .resumeDetail{
              width: 100%;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              .top{
                display: flex;
                justify-content: space-between;
                .editBtn{
                  position: relative;
                  cursor: pointer;
                }
              }
              .editTime{
                font-size: 14px;
                font-weight: 400;
                color: #9c9c9c;
                text-align: end;
                padding: 0 10px 0 0
              }
            }
          }
            .pic{
              // width: 60px;
              // height: 80px;
              margin-right: 8px;
              img{
                width: 55px;
                height: 70px;
              }
            }
          }
        }
    }


.parent {
  display: flex;
  align-items: center;
  width: 200px;
  font-size: 12px;
  border: 1px solid #aaa;
}
h3 {
  margin-right: 4px;
  white-space: nowrap;
}
.personalExp{
  margin-top: 30px;
}   
  </style>
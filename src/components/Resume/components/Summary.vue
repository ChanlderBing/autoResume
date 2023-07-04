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
                            <span  class="resumeName" @click.stop="test(item.resumeId)" v-if="item.editActive === 0">{{item.resumeName}}</span>
                            <span v-else-if="item.editActive === 1">
                              <el-input 
                              ref="inputRef"
                              v-model="item.resumeName"
                              @blur="emptyCheck(item.resumeId,item.resumeName)"
                                />
                            </span>
                          <span  class="editBtn"><img src="../../../assets/more.png" style="width: 32px;height: 32px;position: absolute;left: -40px;top: -5px;"></span>
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

const { resumeId } = defineProps({
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
  });
  
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
      store.commit('switchEditPersonal',true)
  }
}

//切换简历
const emit = defineEmits(['changeResume','currentResumeId'])
const resumeChange = (resumeId:number)=>{
  if (!localStorage.getItem("token")) {
      ElMessage.error('请先登录！')
  } else {
       //选择简历
    emit('changeResume',resumeId)
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
  if (activeIndex.value !== '2') {
    if (createResumeName.value !==resumeName) {
      axios.post('posts/updateResumeName',{resumeId:resumeId,resumeName:resumeName}).then(res=>{
        if (res?.data.code === 0) { 
          ElMessage.success('修改成功')
        }
      })
    }
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
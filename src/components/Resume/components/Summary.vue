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
              <el-card shadow="hover" class="resume" :body-style="{ padding: '2px' }" v-for="(item,index) in arr.resumeList">
                  <div class="content" @click="resumeChange(item.resumeId)">
                    <div class="pic"><img :src="item.avatar?`http://121.41.1.191:80/upload_img/${item.avatar}`:imgSrc"/> </div>
                      <div class="resumeDetail">
                        <div class="top">
                            <span  class="resumeName" @click.stop="test(item.resumeId)" v-if="item.editActive === 0">{{item.resumeName ? item.resumeName:'未命名简历'}}   <svg class="editicon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="13" height="13" data-v-ea893728=""><path d="m199.04 672.64 193.984 112 224-387.968-193.92-112-224 388.032zm-23.872 60.16 32.896 148.288 144.896-45.696L175.168 732.8zM455.04 229.248l193.92 112 56.704-98.112-193.984-112-56.64 98.112zM104.32 708.8l384-665.024 304.768 175.936L409.152 884.8h.064l-248.448 78.336L104.32 708.8zm384 254.272v-64h448v64h-448z" fill="currentColor"></path></svg></span>
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
                        <div class="editTime" v-if="item.resumeId===store.state.currentResumeId"> 
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
     
              </el-card>
            </el-scrollbar>
          </div>
    </div>
    </div>
  </el-card>
  <el-card class="personalExp" v-if="resumeMoudle!=null">
    <div >
     经历库
    </div>
    <el-collapse accordion>
      <el-collapse-item name="1">
        <template #title>
          教育经历
        </template>
          <div class="experienced" v-for="(item,index) in sortModule(0)">
            <div class="detail">
              <div class="name">
                {{item.school}}
              </div>
              <div class="depsDetail">
                {{item.major}} {{item.academy}} {{item.degree}} 
              </div>
              <div class="summary" v-html="item.richText" v-ellipsis="3">
              </div>
            </div>
            <el-divider />
            <div class="action">
              <div class="time">
                {{item.period}}</div>
              <el-button type="primary" class="elbtn" @click="clickToShow(0,true,item.id)" :disabled="item.isShow?true:false">{{ item.isShow ? '已使用':'使用' }}</el-button>
            </div>
          </div>
      </el-collapse-item>
      <el-collapse-item title="工作经历" name="2">
          <div class="experienced" v-for="(item,index) in sortModule(1)">
            <div class="detail">
          <div class="name">{{item.experienceName}}</div>
            <div class="depsDetail">{{ item.department }} {{ item.role }} {{ item.city }}</div>
            <div class="summary" v-html="item.richText" v-ellipsis="3"></div>
            <el-divider />
          <div class="action">
            <div class="time">
              {{item.period}}</div>
              <el-button type="primary" class="elbtn" @click="clickToShow(1,true,item.id)" :disabled="item.isShow?true:false">{{ item.isShow ? '已使用':'使用' }}</el-button>
          </div>
        </div>
          </div>
      </el-collapse-item>
      <el-collapse-item title="项目经历" name="3">
          <div class="experienced" v-for="(item,index) in sortModule(2)">
            <div class="detail">
          <div class="name">{{ item.projectName }}</div>
            <div class="depsDetail">{{ item.projectDescription }} {{ item.city }}</div>
            <div class="summary" v-html="item.richText" v-ellipsis="3"></div>
            <el-divider />
          <div class="action">
            <div class="time">
              {{item.period}}</div>
              <el-button type="primary" class="elbtn" @click="clickToShow(2,true,item.id)" :disabled="item.isShow?true:false">{{ item.isShow ? '已使用':'使用' }}</el-button>
          </div>
        </div>
          </div>
      </el-collapse-item>
      <el-collapse-item title="个人总结" name="4">
          <div class="experienced" v-for="(item,index) in sortModule(3)">
          <div class="summary" v-html="item.richText" v-ellipsis="3"></div>
          <el-divider />
          <div class="action">
            <div class="time">
              {{item.period}}</div>
              <el-button type="primary" class="elbtn" @click="clickToShow(3,true,item.id)" :disabled="item.isShow?true:false">{{ item.isShow ? '已使用':'使用' }}</el-button>
          </div>
          </div>
      </el-collapse-item>
    </el-collapse>
  </el-card>
  </template>


<script lang="ts" setup>
import  axios  from '../../../api/http';
import { defineEmits, ref, reactive,computed, onMounted, nextTick, getCurrentInstance, inject } from 'vue';
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
const imgSrc  =  ref(require('@/assets/img/wyk.jpg'))
//结构赋值会失去响应式
// const  prop  = defineProps({
//   resumeId: Number,
//   })

// 自定义指令
// const vFocus = {
//   mounted(el,{value}) {
//     if (value) {
//       console.log(el);
//       el.focus()
//     }
       
//   }
// }

const vEllipsis ={
  mounted(el, binding){
    // 获取期望的文本行数，默认为1
    const n = binding.value || 1;
    // （1）实现超出n行有省略号
    el.style.display = "-webkit-box";
    el.style.webkitBoxOrient = "vertical";
    el.style.webkitLineClamp = n;
    el.style.overflow = "hidden";
  },
  updated(el, binding){
    // （2）实现鼠标移入在溢出情况下才有提示文案
    nextTick(()=>{
      if (el.clientHeight < el.scrollHeight) {
        el.title = el.innerText;
    }
  })
  },
}

const inputRef = ref({})
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
    inputRef.value.focus()
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
const emit = defineEmits(['changeResume','currentResumeNameChange','changeModelResume'])
const resumeChange = (resumeId1:number)=>{
  if (resumeId1 === store.state.currentResumeId) {
    ElMessage.warning('正在浏览该简历')
  }else if(!localStorage.getItem("token")) {
      ElMessage.error('请先登录！')
  } else if (resumeId1 === store.state.modelResumeId ) {
    emit('changeModelResume')
  }else{
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
let resumeMoudle = inject('resumeMoudle') as any
const sortModule = (moduleId)=>{
  
  return  resumeMoudle.value.find((item)=>{
    return item.moduleId === moduleId
  }).inputList
}
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
  const index = arr.resumeList.findIndex((item)=>{
      return item.resumeId === resumeId
  })
  if (!resumeName) {
    ElMessage.error('简历名称不能为空')
    arr.resumeList[index].resumeName = createResumeName.value
    arr.resumeList[index].editActive = 0
    inputRef.value[0].focus()
  }else{
  if (activeIndex.value !== '2' && createResumeName.value !==resumeName) {
    axios.post('posts/updateResumeName',{resumeId:resumeId,resumeName:resumeName}).then(res=>{
      if (res?.data.code === 0) { 
        ElMessage.success('修改成功')
      }
    })
  } else if(createResumeName.value !==resumeName){
    arr.resumeList[index].editActive = 0
    localStorage.setItem('modelResume',JSON.stringify((arr.resumeList)))
    ElMessage.success('修改成功')
  }
  }
  arr.resumeList[index].editActive = 0
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
  const {data:res} = await axios.get(`posts/getUserResumeOne?resumeId=${store.state.modelResumeId}`).finally(()=>{
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

//经历库加入简历
const clickToShow = (moduleId,status,id)=>{
  if (store.state.currentResumeId !=store.state.modelResumeId && store.state.token) {
    axios.post('posts/updateShowStatus',{moduleId:moduleId,status:status,id:id}).then(res=>{
      if (res?.data.code === 0) { 
        emit('changeResume',store.state.currentResumeId)
        ElMessage.success('添加成功')
      }
    })
  } else {
    const index = resumeMoudle.value.findIndex((item)=>{
      return item.moduleId === moduleId
    })
    const indexMoudel = resumeMoudle.value[index].inputList.findIndex((item)=>{
      return item.id === id
    })
    resumeMoudle.value[index].inputList[indexMoudel].isShow = 1  
    localStorage.setItem("resumeMoudle",JSON.stringify(resumeMoudle.value))
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
        // --el-color-primary: #626aef;
        // --el-color-primary-light-3: #969bf3;
        // --el-color-primary-dark-2: #5a61eb;
      }
      .el-menu-item{
        @include home-color();
      }
        .resumeList{
          // .resume:hover{
          //   box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
          // }
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
                .resumeName{
                  font-size: 14px;
                  .editicon{
                    width: 12px;
                    height: 12px;
                    opacity: 0;
                  }
                }
                .resumeName:hover .editicon{
                  opacity: 1;
                }
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
    .el-divider--horizontal {
      margin: 4px 0;
    }
    .experienced{
      margin-top: 8px;
      background: #ecf5ff;
      border-radius: 13px;
      padding: 6px 10px;
      .detail{
        .name{
          font-weight:bold;
          font-size: 16px;
        }
        .depsDetail{
          font-size: 12px;
        }
      .summary{
        font-size: 12px;
        word-wrap:break-word;
        white-space:pre-wrap;
      }
    }
    .action{
      display: flex;
      justify-content: space-between;
      align-items: center;
      .time{

      }
      .elbtn{

      }
    }
  }
    }
  
  </style>
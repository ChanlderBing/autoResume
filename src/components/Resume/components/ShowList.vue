<template>
    <div :class="focusIndex == index ? 'active':''" v-for="(item,index) in resumeMoudle" :key="item.moduleId"  @mouseover="focusMoudel(index)" @mouseleave="blurMoudel()">
      <div class="piece">
        <div :class="focusIndex == index ? ['activeTitle','title']:'title'">
          <div class="colorDiv"></div>
          <div class="titleName"> {{item.title}}</div>
          <div class="line"></div>
          <div class="control" v-if="focusIndex == index">
              <Contrl 
                @up = "switchTabUp"
                @dowm="switchTabDown"
                @del="tabDel"
                @add="addInformation"
                :moduleIndex="item.moduleIndex"
                :flag = 0
                :moduleId="item.moduleId"
                :addHidden= "item.expand"
                :upBan = "index == 0"
                :downBan = "index == (resumeMoudle.length - 1)"
              >
              </Contrl>
          </div>
        </div>      
        <div class="inputList" v-for="(list,index1) in resumeMoudle3(item.inputList)"  :key="list.sortIndex"  @click="editInformation(item.moduleId,index1,item.expand)" @mouseover="focusDetailMoudel(index1)" @mouseleave="blurDetailMoudel()"> 
          <component :is='dyamicCom[item.moduleId]' :list="list">
              </component>
            <div class="control" v-if ="focusIndex == index && focusDetailIndex == index1 && item.moduleId !==3" @click.stop>
                <Contrl 
                  @up="switchTabUp"
                  @dowm="switchTabDown"
                  @del="tabDel"
                  :id="list.id"
                  :moduleId="item.moduleId"
                  :resumemodelId="list.resumemodelId"
                  :sortIndex="list.sortIndex"
                  :flag = 8
                  :addHidden = false
                  :upBan = "index1 == 0"
                  :downBan = "index1 == item.inputList.length - 1"
                >
              </Contrl>
            </div>
        </div>
      </div>
    </div>
  </template>

<script lang="ts" setup>
  import store from "@/store";
  import { ref,nextTick, computed, inject} from "vue";
  import Contrl from '@/components/Resume/components/Contrl.vue';
  import { defineEmits } from 'vue'
  import school from '@/components/from_components/school.vue'
  import  summary from '../../from_components/summary.vue'
  import project from '../../from_components/project.vue'
  import work from '../../from_components/work.vue'
import { ElMessage, ElMessageBox } from "element-plus";
  // 使用defineEmits创建名称，接受一个数组
  const emit = defineEmits(['clickChild','clickToHide','moduleSwitchUp','moduleSwitchDown','moduleDetailSwitchUp','moduleDetailSwitchDown'])
  let resumeMoudle1  = inject('resumeMoudle') as any
  let resumeMoudle = computed(() => {
    //访问异步数据，这里二次更新
    return resumeMoudle1.value?.filter((res: any) => {
      return res.isShow !== false
    })
  })
  const dyamicCom =  {
    '1':work,
    '2':project,
    '3':summary,
    '0':school
  }
  const sortab = (data)=>{
    return  function(obj1,obj2){
      var value1=obj1[data];
      var value2=obj2[data];
      if(value2<value1){
        return 1
      }else if(value2>value1){
        return -1
      }else{
      return 0
      }
    }
   }
  let resumeMoudle3 = (arr) => {
    arr.sort(sortab("sortIndex"))
    return arr.filter((res: any) => {
      return res.isShow !== 0
    })
  }
  let focusIndex = ref()
  let focusDetailIndex = ref()
  const switchTabUp = (obj) => {
    let index = focusIndex.value
    let detailIndex = focusDetailIndex.value
    if (store.state.token && store.state.currentResumeId != store.state.modelResumeId) {
      if (obj.id && detailIndex && detailIndex !== 0) {
        emit('moduleDetailSwitchUp',{...obj})
      } else if(index && index !== 0&& !obj.id){
        emit('moduleSwitchUp',{...obj,resumeId:store.state.currentResumeId})
      }
    } else {
      if (detailIndex && detailIndex !== 0 && obj.id) 
      {
        resumeMoudle.value[index].inputList[detailIndex].sortIndex = detailIndex - 1
        resumeMoudle.value[index].inputList[detailIndex - 1].sortIndex = detailIndex 
       // resumeMoudle.value[index].inputList[detailIndex] = resumeMoudle.value[index].inputList.splice(detailIndex - 1, 1, resumeMoudle.value[index].inputList[detailIndex])[0]
        localStorage.setItem("resumeMoudle",JSON.stringify(resumeMoudle.value))
      }else if (index && index!==0 && !obj.id)
      {
        resumeMoudle.value[index] = resumeMoudle.value.splice(index - 1, 1, resumeMoudle.value[index])[0]
        localStorage.setItem("resumeMoudle",JSON.stringify(resumeMoudle.value))
        blurMoudel()
      }
    }
   
  }

  const switchTabDown = (obj) => {
    let index = focusIndex.value
    let detailIndex = focusDetailIndex.value
    if (store.state.token && store.state.currentResumeId != store.state.modelResumeId) {
      if (index < resumeMoudle.value.length - 1 && !obj.id) {
        emit('moduleSwitchDown',{...obj,resumeId:store.state.currentResumeId})
      } else if(detailIndex < resumeMoudle.value[index].inputList.length - 1&& obj.id) {
        emit('moduleDetailSwitchDown',{...obj})
      }
    } else {
      if (detailIndex < resumeMoudle.value[index].inputList.length - 1 && obj.id) 
      {
       // resumeMoudle.value[index].inputList[detailIndex] = resumeMoudle.value[index].inputList.splice(detailIndex + 1, 1, resumeMoudle.value[index].inputList[detailIndex])[0]
       resumeMoudle.value[index].inputList[detailIndex].sortIndex = detailIndex + 1
       resumeMoudle.value[index].inputList[detailIndex + 1].sortIndex = detailIndex 
       localStorage.setItem("resumeMoudle",JSON.stringify(resumeMoudle.value))
      }else if (index < resumeMoudle.value.length - 1 && !obj.id)
      {
        resumeMoudle.value[index] = resumeMoudle.value.splice(index + 1, 1, resumeMoudle.value[index])[0]
        localStorage.setItem("resumeMoudle",JSON.stringify(resumeMoudle.value))
        blurMoudel()
      }
    }
  }

  const tabDel = (obj) =>{
    let index = focusIndex.value
    let detailIndex = focusDetailIndex.value
    if (obj.id){
      if (store.state.token && store.state.currentResumeId != store.state.modelResumeId) {
        emit('clickToHide',obj.moduleId,false,obj.id)
      }else{
        const indexModule = resumeMoudle.value[index].inputList.findIndex((item)=>{
            return item.id === obj.id
        })
        resumeMoudle.value[index].inputList[indexModule].isShow = 0  
        localStorage.setItem("resumeMoudle",JSON.stringify(resumeMoudle.value))
      }
    }else{
      emit('clickChild',obj.moduleId)
    }  
  }
  const focusMoudel = (index:any)=>{
    focusIndex.value = index - 0; 
  }
  const blurMoudel = ()=>{
    focusIndex.value = null
  }
  const focusDetailMoudel = (index:any)=>{
    focusDetailIndex.value = index - 0;
  }
  const blurDetailMoudel = ()=>{
    focusDetailIndex.value = null
  }
  const editInformation = (moduleId:any,index1:any,isExpand:boolean)=>
  {
    let index = focusIndex.value
    let detailIndex = focusDetailIndex.value
    if (store.state.isEdit || store.state.isAdd || store.state.editPersonal) {
      ElMessageBox.confirm(
        '要退出当前编辑吗?',
        'Warning',
        {
          confirmButtonText: '是的',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).then(() => {
          trunOffEdit()
        //未登录时顺序错乱
        nextTick(()=>{
          store.commit('chosenOne',index)
          store.commit('chosenDetail',detailIndex)
          store.commit('switch',true)
        })
        }).catch(() => {
          ElMessage({
            type: 'info',
            message: '取消成功',
          })
        })
    }else{
      trunOffEdit()
        //未登录时顺序错乱
      nextTick(()=>{
        store.commit('chosenOne',index)
        store.commit('chosenDetail',detailIndex)
        store.commit('switch',true)
      })
    }
  }
  const addInformation = ()=>{
    let index = focusIndex.value
    if (store.state.isEdit || store.state.isAdd || store.state.editPersonal) {
      ElMessageBox.confirm(
        '要退出当前编辑吗?',
        '提醒',
        {
          confirmButtonText: '是的',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).then(() => {
        trunOffEdit()
        store.commit('addStructInit',deepClear(resumeMoudle1.value[index].inputList[0]))
        setTimeout(() => {
        store.commit('chosenOne',index)
        store.commit('switchAdd',true)
        }, 100);
          }).catch(() => {
            ElMessage({
              type: 'info',
              message: '取消成功',
            })
          })
    }else{
      trunOffEdit()
      store.commit('addStructInit',deepClear(resumeMoudle1.value[index].inputList[0]))
      setTimeout(() => {
        store.commit('chosenOne',index)
        store.commit('switchAdd',true)
        }, 100);
      }
  }

  const deepClear =  (target)=> {
    if (typeof target === 'object' && target) {
        let cloneObj = {}
        for (const key in target) { // 遍历
          const val = target[key]
          if (typeof val === 'object' && val) {
            cloneObj[key] = deepClear(val) // 是对象就再次调用该函数递归
          } else  if(key === 'resumemodelId'){
            cloneObj[key] = val // 基本类型的话直接复制值
          }else if (key === 'sortIndex') {
            cloneObj[key] =  resumeMoudle.value[focusIndex.value].inputList.length
          }else{
            cloneObj[key] = ''
          }
        }
        return cloneObj
    } else {
        return target;
    }
  }
  function trunOffEdit() {
    if (store.state.isEdit || store.state.isAdd || store.state.editPersonal ) {
      store.commit('switch',false)
      store.commit('switchEditPersonal',false)
      store.commit('switchAdd',false)
    }
  }

</script>
<style scoped lang="scss">

  .control{
    img{
      width: 24px;
      height: 24px;
      opacity: 0.8;
    }
    img:hover{
      opacity: 0.4;
    }
    .abandon{
      opacity: 0.2;
      cursor:not-allowed;
    }
  }
  .inputList:hover{
    background-color: #EBEDF0
  }
  .inputList{
    margin: 0 23px 0 21px;
    font-size: 12px;
    text-align: left;
    position: relative;
    min-height: 24px;
    .text{
      font-size: 16px;
    }
  .control{
    position: absolute;
    top: 50%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    right: 0;
  }
  .menu-title{
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
   
    .title-left{
      font-weight: bold;
      width: 300px;
      text-align: left;
    }
    .title-right{
      width: 200px;
      text-align: end;
      font-size: 12px;
    }
  }
  .sec-title{
    .title-left{
      height: 24px;       
    }
  }
  }
  .active{
      background-color: #F0F2F5;
    }
    .activeTitle{
     @include color-white();
    }
    .piece{
      margin: 0 16px;
      .title{
        height: 30px;
        display: flex;
        margin: 13px 20px 0;
        justify-content: space-between;
        align-items: center;
        .colorDiv{
          height: 28px;
          width: 5px;
          @include base-background();
        }
        .titleName{
          font-size: 16px;
          font-weight: bold;
          @include base-color();
          margin:0 5px 0 13px;
        }
        .line{
          flex-grow: 1;
          height: 1px;
          margin:0 5px;
          @include base-background();
        }
      }
    }
  </style>
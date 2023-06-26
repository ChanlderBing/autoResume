<template>
    <div :class="focusIndex == index ? 'active':''" v-for="(item,index) in resumeMoudle" :key="index"  @mouseover="focusMoudel(index)" @mouseleave="blurMoudel()">
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
                :flag = 0
                :moudleId="item.moudleId"
                :addHidden= "item.expand"
                :upBan = "index == 0"
                :downBan = "index == (resumeMoudle.length - 1)"
              >
              </Contrl>
          </div>
        </div>      
        <div class="inputList" v-for="(list,index1) in item.inputList" :key="'Id'+ index1" @click="editInformation(index,index1,item.expand)" @mouseover="focusDetailMoudel(index1)" @mouseleave="blurDetailMoudel()"> 
            <div class="menu-title"> 
              <div class="title-left">{{list.school}}</div>
              <div class="title-right" v-if="list.startTime">{{list.startTime}}至{{list.endTime}} </div>
            </div>
            <div class="sec-title">
              <div class="title-left">{{list.major}}{{list.academy}} {{list.degree}} {{list.city}}</div>
            </div>
            <div class="text">
              <div class="textH5" v-html="list.richText">
              </div>
            </div>
            <div class="control" v-if ="focusIndex == index && focusDetailIndex == index1" @click.stop>
                <Contrl 
                  @up="switchTabUp"
                  @dowm="switchTabDown"
                  @del="tabDel"
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
  import { ref,nextTick, onMounted, computed, inject, watch,reactive, onUpdated } from "vue";
  import Contrl from '@/components/Resume/components/Contrl.vue';
  import { defineEmits } from 'vue'
  // 使用defineEmits创建名称，接受一个数组
  const emit = defineEmits(['clickChild'])
  let resumeMoudle1  = inject('resumeMoudle') as any

  let resumeMoudle = computed({
    get:() => {
      return resumeMoudle1.value?.filter((res: any) => {
        return res.isShow !== false
    })
    },
    set:()=>  resumeMoudle
  })

  let focusIndex = ref()
  let focusDetailIndex = ref()
  const switchTabUp = (flag) => {
    let index = focusIndex.value
    let detailIndex = focusDetailIndex.value
    if (detailIndex && detailIndex !== 0 && flag == 8) 
    {
      resumeMoudle.value[index].inputList[detailIndex] = resumeMoudle.value[index].inputList.splice(detailIndex - 1, 1, resumeMoudle.value[index].inputList[detailIndex])[0]
    }else if (index && index!==0 && flag == 0)
    {
      resumeMoudle.value[index] = resumeMoudle.value.splice(index - 1, 1, resumeMoudle.value[index])[0]
    }
  }

  const switchTabDown = (flag) => {
    let index = focusIndex.value
    let detailIndex = focusDetailIndex.value
    if (detailIndex <= resumeMoudle.value.length - 1 && flag == 8) 
    {
      resumeMoudle.value[index].inputList[detailIndex] = resumeMoudle.value[index].inputList.splice(detailIndex + 1, 1, resumeMoudle.value[index].inputList[detailIndex])[0]
    }else if (detailIndex <= resumeMoudle.value.length - 1 && flag == 0)
    {
      resumeMoudle.value[index] = resumeMoudle.value.splice(index + 1, 1, resumeMoudle.value[index])[0]
    }
  }

  const tabDel = (flag:Number) =>{
    let index = focusIndex.value
    let detailIndex = focusDetailIndex.value
    if (flag == 8)  
    {
      resumeMoudle.value[index].inputList.splice(detailIndex,1)
      localStorage.setItem("resumeMoudle",JSON.stringify(resumeMoudle))
    }else
    {
      emit('clickChild', flag)
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
  const editInformation = (index:any,index1:any,isExpand:boolean)=>
  {
    trunOffEdit()
    nextTick(()=>{
      store.commit('chosenOne',index)
      store.commit('chosenDetail',index1)
      store.commit('switch',true)
    })
  }
  const addInformation = ()=>{
    let index = focusIndex.value
    trunOffEdit()
    store.commit('addStructInit',deepClear(resumeMoudle.value[index].inputList[0]))
    setTimeout(() => {
      store.commit('chosenOne',index)
      store.commit('switchAdd',true)
      }, 100);
  }

  const deepClear =  (target)=> {
    if (typeof target === 'object' && target) {
        let cloneObj = {}
        for (const key in target) { // 遍历
            const val = target[key]
            if (typeof val === 'object' && val) {
                cloneObj[key] = deepClear(val) // 是对象就再次调用该函数递归
            } else {
                cloneObj[key] = '' // 基本类型的话直接复制值
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
    height: 24px;
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
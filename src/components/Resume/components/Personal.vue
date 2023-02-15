<template>
  <div class="personal">
    <div class="information"  @click="editInformation()">
    <p><h2>{{ personalMoudle[0].userName }}</h2></p>
    <div>
      <span v-for="(list,key,index) in personalMoudle[0].inputList[0]">{{ list }} <span v-if="index <list.length-1"> | </span></span>
    </div>
    <div>
      <span v-for="(list1,key1,index1) in personalMoudle[0].inputList[1]">{{ list1 }} <span v-if="index1 <list1.length-1"> | </span></span>
    </div>
  </div>
  
  <div class="avatar" @mouseleave="isShow = false;"  @mouseenter="isShow = true" >
    <img :src=imgSrc alt="Ikun!" blue class="aa">
    <div class="mask" v-show="isShow">
    <span @click="upload">更换<svg t="1667906788133" class="icon" viewBox="0 0 1066 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3896" width="20" height="20"><path d="M852.650667 256H210.901333a21.333333 21.333333 0 0 0 0 42.666667h66.858667v442.624A113.493333 113.493333 0 0 0 390.954667 854.613333h284.8a113.450667 113.450667 0 0 0 113.28-113.322666V620.416a21.333333 21.333333 0 1 0-42.666667 0v120.874667c0 38.954667-31.658667 70.656-70.613333 70.656H390.954667a70.741333 70.741333 0 0 1-70.613334-70.656V298.666667h426.069334v190.208a21.333333 21.333333 0 0 0 42.666666 0V298.666667h63.573334a21.333333 21.333333 0 0 0 0-42.666667" p-id="3897"></path><path d="M442.88 213.333333h187.818667a21.333333 21.333333 0 1 0 0-42.666666H442.88a21.333333 21.333333 0 0 0 0 42.666666M426.922667 405.333333v298.666667a21.333333 21.333333 0 0 0 42.666666 0v-298.666667a21.333333 21.333333 0 0 0-42.666666 0M597.589333 405.333333v298.666667a21.333333 21.333333 0 0 0 42.666667 0v-298.666667a21.333333 21.333333 0 0 0-42.666667 0" p-id="3898"></path></svg></span>
    </div>
    </div> 
      <input type="file" name="logo" style="display: none" ref="inputFile" @change="updateFile" accept=".jpge,.png,.jpg">
      <input type="submit" value="提交" hidden>
  </div>
</template>

<script lang="ts" setup>
import { nextTick, ref } from "vue";
import { ElMessage } from 'element-plus';
import store from "@/store";
import personalMoudleMock from '@/utils/personal.js'

let personalMoudle = ref(JSON.parse(localStorage.getItem('personalMoudle')))


const isShow = ref(false)

const editInformation = ()=>
  {
    if (store.state.isEdit) {
      store.commit('switch',false)
    }
    nextTick(()=>{
      store.commit('switchEditPersonal',true)
      store.commit('switch',true)
    })
  }


const inputFile = ref(null)
const imgSrc  =  ref(require('@/assets/img/wyk.jpg'))
const updateFile =(e)=>{
  const file = e.target.files[0]
  let arr = file.name.split('.')
  let name = arr[1]
  if (name.toLowerCase()== 'jpge'||'png' || 'jpg') {
    let img = new FileReader()
    img.readAsDataURL(e.target.files[0])
    img.onload = ({target})=>{
      imgSrc.value = target.result as string
    }
    ElMessage.success("上传成功")
  } else
  {
    ElMessage.error("文件格式错误")
  }
}
const upload = ()=>{
   const a = inputFile.value.click()
}

onMounted:{
  if (!localStorage.getItem('personalMoudle')) {
      localStorage.setItem('personalMoudle', JSON.stringify(personalMoudleMock));
  }
}
</script>

<style scoped lang="scss">
.personal{
  display: flex;
  .information{
    width: 60%;
    margin: 0 89px 0 36px;
    p{
      text-align: start;
    }
    .spanGap{
      padding-right:4px;
      padding-left:4px;
    }
  }
  .avatar{
    width: 100px;
    position: relative;
    margin: 15px;
    img{
      height: 110px;
      width: 100px;
      //-webkit-mask: linear-gradient(90deg, transparent, #fff);
    }
    .mask{
      height: 110px;
      width: 100px;
      position: absolute;
      right: 0px;
      bottom: 2px;
      background: rgba(64,64,64,.5);
      span{
        color: aliceblue;
        line-height: 110px;
        cursor: default;
      }
      svg{
        stroke: aliceblue;
      }
    }
  }
}


// .avatar::after {
//     content: "";
//     position: absolute;
//     top: 0;
//     left: 0;
//     bottom: 0;
//     right: 0;
//     height: 100px;
//     width: 80px;
//     background: #000 no-repeat;
//     background-size: cover;
//     mask: linear-gradient(110deg, #000 10%, transparent 70%, transparent);
// }
</style>
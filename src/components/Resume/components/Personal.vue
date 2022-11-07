<template>
  <div class="personal">
    <div class="information">
    <!-- <div class="name"></div> -->
    <p><h2>GearLessJOE</h2></p>
    <p>东莞理工学院</p>
    <p>983270722@qq.com</p>
    <!-- <div class="edu"></div>
    <div class="email">983270722@qq.com</div> -->
  </div>
  
  <div class="avatar" >
    <img :src=imgSrc alt="Ikun!" blue @click="upload" class="aa"  @mouseleave="isShow = false;"  @mouseenter="isShow = true">
    <div class="mask" v-show="isShow"></div>
    </div> 
      <input type="file" name="logo" style="display: none" ref="inputFile" @change="updateFile">
      <input type="submit" value="提交" hidden>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";

const inputFile = ref(null)
const imgSrc  =  ref(require('@/assets/img/wyk.jpg'))
const isShow = ref(false)

const upload = ()=>{
   const a = inputFile.value.click()
}
const updateFile =(e)=>{
  const file = e.target.files[0]
  let img = new FileReader()
  img.readAsDataURL(e.target.files[0])
  img.onload = ({target})=>{
    imgSrc.value = target.result as string
  }
}

</script>

<style scoped lang="scss">
.personal{
  display: flex;
  justify-content: space-around;
  .information{
    width: 60%;
    p{
      text-align: start;
      margin: 8px 20px;
    }
  }
  .avatar{
    width: 40%;
    position: relative;
    img{
      padding-left: 180px;
      height: 100px;
      width: 100px;
      margin: 15px;
      //-webkit-mask: linear-gradient(90deg, transparent, #fff);
    }
    .mask{
      height: 100px;
      width: 100px;
      position: absolute;
      right: 16px;
      bottom: 17px;
      background: rgba(64,64,64,.5);
      text-align: right;
      cursor: auto; 
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
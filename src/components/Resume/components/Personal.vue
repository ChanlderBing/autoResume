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

  
  <div class="avatar">
    <img src="@/assets/img/wyk.jpg" alt="Ikun!" blue @click="upload">
      </div> 
      <input type="file" name="logo" style="display: none" ref="inputFile">
      <input type="submit" value="提交" hidden>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";

const inputFile = ref(null)
  const upload = ()=>{
    inputFile.value.click()
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
    img{
      padding-left: 180px;
      height: 100px;
      width: 80px;
    }
  }
}


</style>
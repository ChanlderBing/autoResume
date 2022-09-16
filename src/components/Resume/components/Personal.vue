<template>
  <div class="personal">
    <div class="information">
    <!-- <div class="name"></div> -->
    <p><h2>joe</h2></p>
    <p>dgut</p>
    <p>983270722@qq.com</p>
    <!-- <div class="edu"></div>
    <div class="email">983270722@qq.com</div> -->
  </div>
  <div class="avatar"><img src="@/assets/img/wyk.jpg" alt="Ikun!"></div> 
  </div>
</template>

<style scoped lang="scss">
.personal{
  display: flex;
  justify-content: space-around;
  .information{
    width: 60%;
    p{
      text-align: start;
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
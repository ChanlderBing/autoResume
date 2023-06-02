<template>
 <div :class="value1 == 1 ?['container', 'right-panel-active'] : 'container'">
    <!-- Sign Up -->
    <div class="container__form container--signup">
      <div  class="form" id="form1">
        <h2 class="form__title">Sign Up</h2>
        <el-form :model="signUpData" label-width="60px" :rules="rules" ref="signUpRuleForms">
          <el-form-item label="账号"  prop="userName">
            <el-input type="text" placeholder="请输入账号" class="input" v-model="signUpData.userName"   />
          </el-form-item>
          <el-form-item label="密码"  prop="password">
            <el-input type="password" placeholder="输入密码" class="input" v-model="signUpData.password"   />
          </el-form-item>
          <el-form-item >
            <button class="btn" @click="signUp()">Sign Up</button>
          </el-form-item>
        </el-form>
        
      </div>
    </div>

    <!-- Sign In -->
    <div class="container__form container--signin">
      <div  class="form" id="form1">
        <h2 class="form__title">Sign In</h2>
        <el-form :model="signInData" label-width="80px" ref="signInRuleForms" :rules="rules" >
          <el-form-item label="账号"  prop="userName">
            <el-input type="text" placeholder="请输入账号" class="input" v-model="signInData.userName"  />
          </el-form-item>
          <el-form-item label="密码"  prop="password">
            <el-input type="password" placeholder="请输入密码" class="input" v-model="signInData.password"   />
          </el-form-item>
          <el-form-item label="密码确认"  prop="repassword">
            <el-input type="password" placeholder="密码确认" class="input" v-model="signInData.repassword"   />
          </el-form-item>
        </el-form>
        <button class="btn" @click="signIn()">Sign In</button>
      </div>
    </div>

    <!-- Overlay -->
      <div class="container__overlay">
        <div class="overlay">
          <div class="overlay__panel overlay--left">
            <button class="btn" id="signIn" @click="signInClick()">Sign In</button>
          </div>
          <div class="overlay__panel overlay--right">
            <button class="btn" id="signUp" @click="signUpClick()">Sign Up</button>
          </div>
        </div>
      </div>
  </div>
</template>

<script lang="ts" setup>
import router from '@/router';
import { ElMessage } from 'element-plus';
import { reactive, ref } from 'vue';
import  axios  from '../api/http';

//动画切换
const value1 = ref(1)
const signInClick = ()=>{
value1.value = 2
}
const signUpClick =()=>{
  value1.value = 1
}

const signUpRuleForms = ref(null);
const signUpData = reactive({
 userName:'',
 password:''
})
const signUp = ()=>{
  signUpRuleForms.value.validate((valid)=>{
  if (valid) {
    axios.post('user/login',{...signUpData}).then(res=>{
      if (res?.data?.data.code === 200) {   
        localStorage.setItem("token",res.data.data.data.token)
        router.push({name:"home"})
      }
    }).catch(error=>{
      console.log(error);
  })
  } else {
    ElMessage.error("输入数据格式不对")
  }
}) 
}


const valiRepassword = (rule: any, value: any, callback: any) => {
  if (value === '') {
         callback(new Error('请再次输入密码'))
         // password 是表单上绑定的字段
      } else if (value !== signInData.password) {
         callback(new Error('两次输入密码不一致!'))
      } else {
       	 callback()

      }
  }
const rules = reactive({
    userName: [
            { required: true, message: "请输入昵称", trigger: 'blur'},
            { message: '请输入昵称', trigger: 'change' }
          ],
    password: [       
            { required: true, message: "请输入密码", trigger: "blur" },
            { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'change' }
          ],
    repassword:[
            { required: true, message: "确认密码", trigger: "blur" },
            { validator: valiRepassword, message: '两次密码不对应', trigger: 'change' }
          ]
})

const signInData = reactive({
 userName:'',
 password:'',
 repassword:''
})

const signInRuleForms = ref(null);
const signIn = ()=>{
  signInRuleForms.value.validate((valid)=>{
  if (valid) {
    axios.post('register',{...signInData}).then(res=>{
      if (res?.data?.data.code === 200) {   
       ElMessage.success("注册成功！")
       signInRuleForms.value.resetFields()
       value1.value = 1;
      }else{
        ElMessage.error(res?.data?.data.msg)
      }
    }).catch(error=>{
      console.log(error);
  })
  } else {
    ElMessage.error("输入数据格式不对")
  }
}) 
}

</script>


<style lang="scss" scoped>

    .form__title {
      font-weight: 300;
      margin: 0;
      margin-bottom: 1.25rem;
    }

    .link {
      color: $gray;
      font-size: 0.9rem;
      margin: 1.5rem 0;
      text-decoration: none;
    }
    .container {
      background-color: $white;
      border-radius: 0.7rem;
      box-shadow: 0 0.9rem 1.7rem rgba(0, 0, 0, 0.25),
        0 0.7rem 0.7rem rgba(0, 0, 0, 0.22);
      height: 420px;
      max-width: 758px;
      overflow: hidden;
      position: relative;
      width: 100%;
      margin: 226px auto;
    }

    .container__form {
      height: 100%;
      position: absolute;
      top: 0;
      transition: all 0.6s ease-in-out;
    }

    .container--signin {
      left: 0;
      width: 50%;
      z-index: 2;
    }

    .container.right-panel-active .container--signin {
      transform: translateX(100%);
    }

    .container--signup {
      left: 0;
      opacity: 0;
      width: 50%;
      z-index: 1;
    }

    .container.right-panel-active .container--signup {
      animation: show 0.6s;
      opacity: 1;
      transform: translateX(100%);
      z-index: 5;
    }

    .container__overlay {
      height: 100%;
      left: 50%;
      overflow: hidden;
      position: absolute;
      top: 0;
      transition: transform 0.6s ease-in-out;
      width: 50%;
      z-index: 100;
    }

    .container.right-panel-active .container__overlay {
      transform: translateX(-100%);
    }

    .overlay {
      background-color: $light-blue;
      background: url("https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547_1280.jpg");
      background-attachment: fixed;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      height: 100%;
      left: -100%;
      position: relative;
      transform: translateX(0);
      transition: transform 0.6s ease-in-out;
      width: 200%;
    }

    .container.right-panel-active .overlay {
      transform: translateX(50%);
    }

    .overlay__panel {
      align-items: center;
      display: flex;
      flex-direction: column;
      height: 100%;
      justify-content: center;
      position: absolute;
      text-align: center;
      top: 0;
      transform: translateX(0);
      transition: transform 0.6s ease-in-out;
      width: 50%;
    }

    .overlay--left {
      transform: translateX(-20%);
    }

    .container.right-panel-active .overlay--left {
      transform: translateX(0);
    }

    .overlay--right {
      right: 0;
      transform: translateX(0);
    }

    .container.right-panel-active .overlay--right {
      transform: translateX(20%);
    }

    .btn {
      background-color: $blue;
      background-image: linear-gradient(90deg, $blue 0%, $light-blue 74%);
      border-radius: 20px;
      border: 1px solid $blue;
      color: $white;
      cursor: pointer;
      font-size: 0.8rem;
      font-weight: bold;
      letter-spacing: 0.1rem;
      padding: 0.9rem 4rem;
      text-transform: uppercase;
      transition: transform 80ms ease-in;
    }

    .form>.btn {
      margin-top: 1.5rem;
    }

    .btn:active {
      transform: scale(0.95);
    }

    .btn:focus {
      outline: none;
    }

    .form {
      background-color: $white;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      padding: 0 3rem;
      height: 100%;
      text-align: center;
    }

    .input {
      background-color: #fff;
      border: none;
      width: 100%;
    }

    @keyframes show {

      0%,
      49.99% {
        opacity: 0;
        z-index: 1;
      }

      50%,
      100% {
        opacity: 1;
        z-index: 5;
      }
    }
    .el-form-item__error {
    display: block !important;
  }
</style>
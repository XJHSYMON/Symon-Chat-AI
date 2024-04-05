<script setup >
import {ref} from "vue"
import {useUserStore} from "@/stores/index.js";
import "@/assets/uiLogin.css"
import {userLoginService,userRegisterService} from "@/api/user.js";
import router from "@/router/index.js";
import {ElMessage} from "element-plus";


const isRegister = ref(true)
const userStore = useUserStore()

const form = ref({
  username: '',
  showErrorAccountMessage: 0,
  password: '',
  showErrorPasswordMessage: 0
})
const form2 = ref ({
  username: '',
  showErrorAccountMessage: 0,

  password: '',
  showErrorPasswordMessage: 0,
  repassword:'',
  showErrorRepasswordMessage: 0,
})
const checkAccount = () => {
  const re = /^[A-Za-z0-9]+$/;

  if (!re.test(form.value.username)) {
    form.value.showErrorAccountMessage = 1;
  } else {
    form.value.showErrorAccountMessage = 0;
  }
}
const checkPassword = () => {
  const re01 = /^[a-zA-Z0-9]{6,16}$/;
  const re02 = /^$/;
  if (!re02.test(form.value.password)) {
    form.value.showErrorPasswordMessage = 1;
  }else if (!re01.test(form.value.password)) {
    form.value.showErrorPasswordMessage = 2;
  } else {
    form.value.showErrorPasswordMessage = 0;
  }

}
const checkRepassword = () =>{
  if(form2.value.repassword !== form2.value.password){
    form2.value.showErrorRepasswordMessage = 1
  }else {
    form2.value.showErrorRepasswordMessage = 0
  }

}
const check = () => {
  if (form.value.username === 'xjh') {
    if (form.value.password === '123456') {
      alert('登入成功')
    } else {
      alert('登入失败')
    }
  } else {
    alert('登入失败')
  }
}


const LoginButton = async () => {
  // 输入表单校验
  if (form.value.password === '' || form.value.username === '') {
    form.value.showErrorAccountMessage = 1;
    form.value.showErrorPasswordMessage = 1;
    return; // 如果校验未通过，直接返回，不进行后续操作
  } else {
    form.value.showErrorAccountMessage = 0;
    form.value.showErrorPasswordMessage = 0;
  }


    const res = await userLoginService(form.value)
    console.log(res)
    userStore.setToken(res.data.token)
    ElMessage.success('登入成功')
    router.push('/article/channel')
  }

const RegisterButton = async () => {
  //输入表单校验
  if (form2.value.repassword !== form2.value.password ) {
    form2.value.showErrorAccountMessage = 1;
    form2.value.showErrorPasswordMessage = 1;
  } else {
    form2.value.showErrorAccountMessage = 0;
    form2.value.showErrorPasswordMessage = 0;
  }
  try {
    await userRegisterService(form2.value).then((res) => {
      console.log(res);
      alert('注册成功');
      isRegister.value = true;

    })

  } catch (error) {
    // 处理登录失败的情况
    console.error('注册失败:', error);
    alert('注册失败')
  }

}





</script>

<template>
  <div class="column" >
    <div class="pageTop">
      <img src="https://uniportal.huawei.com/uniportal1/images/language_logo.png" class="imgTop">
      <div class="dishTop">简体中文</div>
    </div>
    <div class="pageMid">
      <img src="https://uniportal.huawei.com/uniportal1/rest/hwidcenter/logon-logo" class="imgMid">
    </div>
    <div class="pageLogin" v-if="isRegister">
      <div class="loginTitle">Uniportal账号登录</div>
      <input type="text" placeholder="请输入账号名/邮箱/手机号/W3账号" style="margin-top: 40px;" class="inputStyle" v-model="form.username"  @blur="checkAccount"  @focus="form.showErrorAccountMessage=0" :class="{'error-Input': form.showErrorAccountMessage}"/>
      <p v-if="form.showErrorAccountMessage" class="error-accountMessage">请输入账号名/邮箱/手机号/W3账号！</p>

      <input type="password" placeholder="请输入密码"  class="inputStyle" v-model="form.password"  @blur="checkPassword"  @focus="form.showErrorPasswordMessage=0" :class="{'error-Input': form.showErrorPasswordMessage}"/>
      <p v-if="form.showErrorPasswordMessage === 2 " class="error-passwordMessage">密码不能为空!</p>
      <p v-if= "form.showErrorPasswordMessage === 1 " class="error-passwordMessage">输入6-12位密码!</p>
      <div class="fourLayer">
        <input type="checkbox" name="vechicle" value="password,user" style="margin:20px 0 0 30px; ">
        <div class="rememberName">记住用户名</div>
        <button class="fourFontRer" style="border:none;color: cadetblue;margin:20px 0 0 300px;font-size: 13px;">验证码登入</button>
      </div>
      <button class="buttonLogin" @click="LoginButton" >登入</button>
      <button style="border: none; margin-bottom:10px;color: #757373 " @click="isRegister = false">←立即注册</button>
      <img src="https://uniportal.huawei.com/uniportal1/images/icon_huawei@2x.png" style="margin: 0 auto;width: 10%">
      <div style="text-align: center;  color: rgba(51, 51, 51, 0.79);
    font-size: 12px;">华为账号</div>
    </div>

    <div class="pageLogin" v-else>
      <div class="loginTitle">Uniportal账号注册</div>
      <input type="text" placeholder="请输入账号名/邮箱/手机号/W3账号" style="margin-top: 40px;" class="inputStyle" v-model="form2.username"  @blur="checkAccount"  @focus="form.showErrorAccountMessage=0" :class="{'error-Input': form.showErrorAccountMessage}"/>
      <p v-if="form.showErrorAccountMessage" class="error-accountMessage" style="top: 290px">请输入账号名/邮箱/手机号/W3账号！</p>
      <input type="password" placeholder="请输入密码"  class="inputStyle" v-model="form2.password"  @blur="checkPassword"  @focus="form.showErrorPasswordMessage=0" :class="{'error-Input': form.showErrorPasswordMessage}"/>
      <p v-if="form.showErrorPasswordMessage === 2 " class="error-passwordMessage" style="top: 362px">密码不能为空!</p>
      <p v-if= "form.showErrorPasswordMessage === 1 " class="error-passwordMessage">输入6-12位密码!</p>
      <input type="password" placeholder="请再次输入密码"  class="inputStyle" v-model="form2.repassword" @blur="checkRepassword" @focus="form.showErrorRepasswordMessage=0"  :class="{'error-Input': form.showErrorRepasswordMessage}"/>
      <p v-if="form.showErrorRepasswordMessage === 1 " class="error-RepasswordMessage" style="top: 434px">密码不能为空!</p>

      <div class="fourLayer">
        <input type="checkbox" name="vechicle" value="password,user" style="margin:20px 0 0 30px; ">
        <div class="rememberName">记住用户名</div>
        <button class="fourFontRer" style="border:none;color: cadetblue;margin:20px 0 0 300px;font-size: 13px;">验证码登入</button>
      </div>
      <button class="buttonLogin" @click="RegisterButton" >注册</button>
      <button style="border: none; margin-bottom:10px;color: #757373 " @click="isRegister = true">立即登入→</button>
      <img src="https://uniportal.huawei.com/uniportal1/images/icon_huawei@2x.png" style="margin: 0 auto;width: 10%">
      <div style="text-align: center;  color: rgba(51, 51, 51, 0.79);
    font-size: 12px;">华为账号</div>
    </div>
  </div>
</template>

<style scoped>

</style>

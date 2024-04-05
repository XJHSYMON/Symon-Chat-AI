<script setup>
import router from "@/router/index.js";
import {ref} from 'vue'
import instance from "@/utils/request.js";
import {userLoginService,userRegisterService} from "@/api/user.js";
import {useUserStore} from "@/stores/index.js";
import {ElMessage} from "element-plus";
import {useRouter} from "vue-router";

const userInfo = ref({
  username : '',
  password : '',
})
const userRegisterInfo = ref({
  username: '',
  password:'',
  repassword:'',
})
const userStore = useUserStore()

const login = async () => {
  const res = await userLoginService(userInfo.value)
  console.log(res)
  userStore.setToken(res.data.token)
  ElMessage.success('登入成功')
  router.push('/article/channel')
}
// const login = async () => {
//   try{
//     await userLoginService(userInfo.value).then((res) => {
//       console.log(res);
//       alert('登入成功');
//       router.push('/article/Manage');
//     })
//
//
//   } catch (error) {
//     // 处理登录失败的情况
//     console.error('登录失败:', error);
//     alert('登入失败')
//   }
//
// }
// const register = async () => {
//   try{
//     await userRegisterService(userRegisterInfo.value).then((res) => {
//       console.log(res);
//       alert('注册成功');
//       router.push('/login');
//     })
//
//   } catch (error) {
//     // 处理登录失败的情况
//     console.error('注册失败:', error);
//     alert('注册失败')
//   }
//
// }
const register01 = async () => {
  const response01 = await userRegisterService(userRegisterInfo.value);
  console.log(response01);
  ElMessage.success('注册成功')
  router.push('/login');
}
</script>
<!--1.获取值-->
<!--2.格式校验-->
<!--3.发送api请求-->
<!--4.获取response(true,flase)-->
<!--5.存储response的数据-->
<!--6.跳转-->

<template>
  <div>
    <div>
      <input v-model="userRegisterInfo.username" >
      <input type="password" v-model="userRegisterInfo.password" >
      <input type="password" v-model="userRegisterInfo.repassword" >
      <button @click="register01">注册</button>
    </div>
    <div>
      <input v-model="userInfo.username" >
      <input type="password" v-model="userInfo.password" >
      <button @click="login">登入</button>
    </div>
  </div>
</template>

<style scoped>

</style>


import {defineStore} from "pinia";
import {ref} from "vue";
import {userGetInfoService} from "@/api/user.js";
//用户接受模块 token和 removeToken
export const useUserStore = defineStore(
    'big-user',
    () =>{
    const token = ref('')
    const setToken = (newToken) => {
        token.value = newToken
    }
    const removeToken = () => {
        token.value = ''
    }
    //获取user的数据内容并存到pinia中
    const user = ref({});
    const getUser = async () => {
        const res = await userGetInfoService()
        console.log('获取user数据成功')
        user.value = res.data.data
    }

    return{
        token,
        setToken,
        removeToken,
        user,
        getUser,
    }
    },
    {
        persist:true
    }
    )

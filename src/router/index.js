import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/index.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: () => import('@/views/login/loginPage.vue')
    },
    {
      path: '/statement',
      component: () => import('@/views/privacy/statement.vue')
    },
    {
      path: '/agreement',
      component: () => import('@/views/privacy/agreement.vue')
    },
    {
      path: '/',
      component: () => import('@/views/layout/layoutContainer.vue'),
      redirect: '/login',
      children: [
        { path: '/article/manage', component: () => import('@/views/article/articleManage.vue') },
        { path: '/article/channel', component: () => import('@/views/article/articleChannel.vue') },
        { path: '/map/aMap', component: () => import('@/views/map/aMap.vue') },
        {
          path: '/dialogBox/dialogChat',
          component: () => import('@/views/dialogBox/dialogChat.vue')
        },
        { path: '/user/password', component: () => import('@/views/user/userPassword.vue') },
        { path: '/user/avatar', component: () => import('@/views/user/userAvatar.vue') },
        { path: '/user/profile', component: () => import('@/views/user/userProfile.vue') }
      ]
    }
  ]
})
//登入访问拦截(导航守卫)
//登入访问拦截=>默认是直接放行的
//根据返回值决定，是放行还是拦截
//返回值:
//1.undefined / true是直接放行
//2.false拦截回到from的地址页面
//3.具体路径 或 路径对象 拦截到具体地址
// router.beforeEach((to) => {
//   const useStore = useUserStore()
//   if (!useStore.token && to.path !== '/login') return '/login'
//   return true
// })
export default router

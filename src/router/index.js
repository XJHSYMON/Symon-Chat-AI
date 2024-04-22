import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: () => import('@/views/testPage/dropDownBox.vue')
    },
    {
      path: '/',
      component: () => import('@/views/layout/layoutContainer.vue'),
      redirect: '/login',
      children: [
        { path: '/article/manage', component: () => import('@/views/article/articleManage.vue') },
        { path: '/article/channel', component: () => import('@/views/article/articleChannel.vue') },
        { path: '/user/password', component: () => import('@/views/user/userPassword.vue') },
        { path: '/user/avatar', component: () => import('@/views/user/userAvatar.vue') },
        { path: '/user/profile', component: () => import('@/views/user/userProfile.vue') }
      ]
    }
  ]
})
export default router

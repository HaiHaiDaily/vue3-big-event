import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores'

// createRouter 创建路由实例
// 配置 history 模式
// 1. history模式: createWebHistory      地址栏不带#
// 2. hash模式:    createWebHashHistory  地址栏带#
const router = createRouter({
  // vite 中的环境变量 import.meta .env.BASE_URL 就是 vite.config.js 中的 base配置项
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', component: () => import('@/views/login/LoginPage.vue') },
    {
      path: '/',
      component: () => import('@/views/layout/LayoutContainer.vue'),
      redirect: '/article/manage',
      children: [
        {
          path: '/article/manage',
          component: () => import('@/views/article/ArticleManage.vue')
        },
        {
          path: '/article/channel',
          component: () => import('@/views/article/ArticleChannel.vue')
        },
        {
          path: '/user/profile',
          component: () => import('@/views/user/UserProfile.vue')
        },
        {
          path: '/user/avatar',
          component: () => import('@/views/user/UserAvatar.vue')
        },
        {
          path: '/user/password',
          component: () => import('@/views/user/UserPassword.vue')
        }
      ]
    }
  ]
})

// 登录拦截(默认是放行的):没有token只能访问到登录页
// 根据返回值决定，是放行还是拦截
//  返回值:
//    1. undefined / true直接放行
//    2. false拦回from的地址页面
//    3．具体路径或路径对象拦截到对应的地址 '/login'||{ name: 'login'}
router.beforeEach((to) => {
  const userStore = useUserStore()
  // 如果没有token，并且访问的是非登录页，拦截到登录，其他情况正常放行
  if (!userStore.token && to.path !== '/login') {
    return '/login'
  }
})

export default router

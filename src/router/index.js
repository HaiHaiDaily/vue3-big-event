import { createRouter, createWebHistory } from 'vue-router'

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
      component: () => import('@/views/layout/LayoutPage.vue'),
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
          component: () => import('@/views/article/UserProfile.vue')
        },
        {
          path: '/user/avatar',
          component: () => import('@/views/article/UserAvatar.vue')
        },
        {
          path: '/user/password',
          component: () => import('@/views/article/UserPassword.vue')
        }
      ]
    }
  ]
})

export default router

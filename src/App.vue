<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores'
// 在Vue3 CompositionAPI 中
// 1. 获取路由对象 router useRouter
const router = useRouter()
// 2. 获取路由参数 route useRoute
const route = useRoute()
const goList = () => {
  //vue3中 this->undefined 所以this.$router.push()失效
  router.push('/list')
  console.log(route, router)
}

const userStore = useUserStore()
</script>

<template>
  <hr />
  <!-- 路由出口 -->
  <router-view></router-view>
  <hr />
  <hr />
  <div>我是App</div>
  <el-button @click="$router.push('/home')">首页</el-button>
  <el-button @click="goList">列表</el-button>
  <el-button @click="$router.go(-1)">返回上一页</el-button>
  <hr />
  <p>{{ userStore.token }}</p>
  <el-button @click="userStore.setToken('awdjawghdajwhdg')">登录</el-button>
  <el-button @click="userStore.removeToken">退出</el-button>
</template>

<style scoped></style>

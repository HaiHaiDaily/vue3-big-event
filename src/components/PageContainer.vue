<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <!-- 定制标题 props 定制标题-->
        <span>{{ title }}</span>
        <div class="extra">
          <!-- 具名插槽 extra  定制头部右侧额外的按钮 -->
          <slot name="extra"></slot>
        </div>
      </div>
    </template>
    <!-- 内容部分：默认插槽 default 定制内容主体 -->
    <slot></slot>
  </el-card>
</template>

<script setup>
defineProps({
  title: {
    required: true,
    type: String
  }
})
</script>

<style lang="scss" scoped>
.page-container {
  min-height: 100%;
  box-sizing: border-box;
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>

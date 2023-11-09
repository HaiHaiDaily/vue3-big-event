<template>
  <page-container title="文章分类">
    <template #extra>
      <el-button @click="onAddChannel"> 添加分类 </el-button>
    </template>
    <!-- 主体部分 -->
    <el-table v-loading="loading" :data="channelList" style="width: 100%">
      <el-table-column label="序号" width="100" type="index"> </el-table-column>
      <el-table-column label="分类名称" prop="cate_name"></el-table-column>
      <el-table-column label="分类别名" prop="cate_alias"></el-table-column>

      <el-table-column label="操作" width="100">
        <!-- el-table-column 作用域插槽  { row }:channelList的每一行数据 $index:下标 -->
        <template #default="{ row }">
          <!-- 编辑按钮 -->
          <el-button
            :icon="Edit"
            circle
            plain
            type="primary"
            @click="onEditChannel(row)"
          ></el-button>
          <!-- 删除按钮 -->
          <el-button
            :icon="Delete"
            circle
            plain
            type="danger"
            @click="onDelChannel(row)"
          ></el-button>
        </template>
      </el-table-column>

      <!-- 没有数据时显示 -->
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>

    <!-- 弹层 -->
    <ChannelEdit ref="dialog" @success="onSuccess"></ChannelEdit>
  </page-container>
</template>

<script setup>
import { ref } from 'vue'
import { artGetChannelsService, artDelChannelService } from '@/api/artivle'
import { Edit, Delete } from '@element-plus/icons-vue'
import ChannelEdit from './components/ChannelEdit.vue'
import { ElMessageBox } from 'element-plus'

// loding效果
const loading = ref(false)
// 文章分类数据
const channelList = ref([])
// 绑定弹层
const dialog = ref(null)
// 定义方法 获取文章分类数据
const getChannelList = async () => {
  // 开启loding
  loading.value = true
  const res = await artGetChannelsService()
  console.log(res.data.data)
  channelList.value = res.data.data
  // 关闭loding
  loading.value = false
}
getChannelList()

// 编辑分类
const onEditChannel = (row) => {
  // 显示弹层  并回显数据
  dialog.value.open(row)
}
// 删除分类
const onDelChannel = async (row) => {
  // 消息弹窗  并等待
  await ElMessageBox.confirm('你确定要删除该分类信息吗？', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确定',
    cancelButtonText: '取消'
  })
  // 发请求删除
  await artDelChannelService(row.id)
  // 删除成功消息
  ElMessage.success({ type: 'success', message: '删除成功' })
  // 重新渲染
  getChannelList()
  // console.log(row)
}
// 添加分类
const onAddChannel = () => {
  // 显示弹层
  dialog.value.open({})
}

// 监听弹层组件 更新渲染
const onSuccess = () => {
  getChannelList()
}
</script>

<style lang="scss" scoped></style>

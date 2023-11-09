<script setup>
import { Delete, Edit } from '@element-plus/icons-vue'
import ChannelSelect from '@/views/article/components/ChannelSelect.vue'
import { artGetListService, artDelService } from '@/api/artivle'
import ArticleEdit from '@/views/article/components/ArticleEdit.vue'
import { formatTime } from '@/utils/format'
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
// 数据
const articleList = ref([])
const total = ref(0)

// 双向绑定数据
const params = ref({
  pagenum: 1, // 第几页
  pagesize: 5, // 每页几条数据
  cate_id: '',
  state: ''
})

// loding
const loading = ref(false)

// 绑定抽屉
const articleEditRef = ref()

// 获取数据 并保存
const getArtcleList = async () => {
  loading.value = true
  const res = await artGetListService(params.value)
  articleList.value = res.data.data
  total.value = res.data.total
  loading.value = false
}
getArtcleList()

// 每页几条数据发生变化
const onSizeChange = (size) => {
  // 每页条数变化 -->从第一页渲染即可
  params.value.pagenum = 1
  params.value.pagesize = size
  getArtcleList()
}

// 第几页发生变化
const onCurrentChange = (page) => {
  // 更新当前页
  params.value.pagenum = page
  // 基于当前页渲染
  getArtcleList()
}

// 搜索逻辑
const onSearch = () => {
  // 从第一页开始渲染
  params.value.pagenum = 1
  // 根据最新的条件发请求渲染
  getArtcleList()
}

// 重置逻辑
const onReset = () => {
  // 重置搜索条件
  params.value.pagenum = 1
  params.value.cate_id = ''
  params.value.state = ''
  // 重新发请求
  getArtcleList()
}

// 编辑新增逻辑
const onAddArticle = () => {
  articleEditRef.value.open({})
}
// 添加逻辑
const onEditArticle = (row) => {
  articleEditRef.value.open(row)
}

// 删除逻辑
const onDeleteArticle = async (row) => {
  // 消息弹框
  await ElMessageBox.confirm('您确定删除该文章信息吗？', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
  //删除请求
  await artDelService(row.id)
  ElMessage({ type: 'success', message: '删除成功' })
  // 重新渲染
  getArtcleList()
}

// 添加|修改 成功
const onSuccess = (type) => {
  if (type === 'add') {
    //添加 --> 在最后添加--> 跳转最后一页并渲染
    const lastPage = Math.ceil((total.value + 1) / params.value.pagesize)
    params.value.pagenum = lastPage
  }
  getArtcleList()
}
</script>

<template>
  <page-container title="文章管理">
    <template #extra>
      <el-button @click="onAddArticle" type="primary"> 发布文章 </el-button>
    </template>
    <!-- 搜索表单区域 -->
    <el-form inline>
      <el-form-item label="文章分类：">
        <!-- vue2 v-model  :value 和  @input 的简写 -->
        <!-- vue  v-model  :modelValue 和 @update:modelValue 的简写 -->
        <ChannelSelect v-model="params.cate_id" width="100%"></ChannelSelect>
      </el-form-item>
      <el-form-item label="发布状态：">
        <el-select v-model="params.state">
          <el-option label="已发布" value="已发布"></el-option>
          <el-option label="草稿" value="草稿"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSearch" type="primary">搜索</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格区域 -->
    <el-table v-loading="loading" :data="articleList" style="width: 100%">
      <el-table-column label="文章标题" width="400">
        <template #default="{ row }">
          <el-link type="primary" :underline="false">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="分类" prop="cate_name"></el-table-column>
      <el-table-column label="发表时间" prop="pub_date">
        <template #default="{ row }">
          {{ formatTime(row.pub_date) }}
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="state"></el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="{ row }">
          <el-button
            :icon="Edit"
            circle
            plain
            type="primary"
            @click="onEditArticle(row)"
          ></el-button>
          <el-button
            :icon="Delete"
            circle
            plain
            type="danger"
            @click="onDeleteArticle(row)"
          ></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>
    <!-- 分页区域 -->
    <el-pagination
      v-model:current-page="params.pagenum"
      v-model:page-size="params.pagesize"
      :page-sizes="[2, 3, 4, 5, 10]"
      layout="jumper, total, sizes, prev, pager, next"
      background
      :total="total"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
      style="margin-top: 20px; justify-content: flex-end"
    />

    <!-- 抽屉弹窗 -->
    <ArticleEdit ref="articleEditRef" @success="onSuccess"></ArticleEdit>
  </page-container>
</template>

<style lang="scss" scoped></style>

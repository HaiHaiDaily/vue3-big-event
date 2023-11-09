<script setup>
import { ref } from 'vue'
import { artEditChannelService, artAddChannelService } from '@/api/artivle'

// 绑定表单
const formRef = ref(null)
// 子传父通信
const emit = defineEmits(['success'])

// 提交表单 添加|编辑
const onSubmit = async () => {
  // 提交前进行校验
  await formRef.value.validate()
  // id 存在则表示编辑 不存在则是添加
  formModel.value.id
    ? await artEditChannelService(formModel.value)
    : await artAddChannelService(formModel.value)
  // 成功消息提示
  ElMessage({
    type: 'success',
    message: formModel.value.id ? '编辑成功' : '添加成功'
  })
  // 通知父组件 更新渲染
  emit('success')
  // 关闭弹层
  dialogVisible.value = false
}

// 表单数据
const formModel = ref({
  cate_name: '',
  cate_alias: ''
})
// 定义规则
const rules = {
  cate_name: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
    {
      pattern: /^\S{1,10}$/,
      message: '分类名必须是1-10位的非空字符',
      trigger: 'blur'
    }
  ],
  cate_alias: [
    { required: true, message: '请输入分类别名', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{1,15}$/,
      message: '分类别名必须是1-15位的字母数字',
      trigger: 'blur'
    }
  ]
}

const dialogVisible = ref(false)
// 添加 和 编辑，可以共用一个弹层，所以可以将弹层封装成一个组件
// 组件对外暴露一个方法 open,  基于 open 的参数，初始化表单数据，并判断区分是添加 还是 编辑
// 1. open({ })                   =>  添加操作，添加表单初始化无数据
// 2. open({ id: xx,  ...  })  =>  编辑操作，编辑表单初始化需回显
const open = async (row) => {
  // 显示弹层
  dialogVisible.value = true
  // 获取回显数据    编辑-->存储数据   添加-->{}
  formModel.value = row //{ ...row }
  console.log(row)
}

// 向外暴露 open
defineExpose({
  open
})
</script>

<template>
  <el-dialog v-model="dialogVisible" title="添加弹层" width="30%">
    <!-- 弹层表单 -->
    <el-form
      ref="formRef"
      :model="formModel"
      :rules="rules"
      label-width="100px"
      style="padding-right: 30px"
    >
      <el-form-item label="分类名称" prop="cate_name">
        <el-input
          v-model="formModel.cate_name"
          minlength="1"
          maxlength="10"
        ></el-input>
      </el-form-item>
      <el-form-item label="分类别名" prop="cate_alias">
        <el-input
          v-model="formModel.cate_alias"
          minlength="1"
          maxlength="15"
        ></el-input>
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">关闭</el-button>
        <el-button type="primary" @click="onSubmit"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped></style>

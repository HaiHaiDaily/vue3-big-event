<script setup>
import { artGetChannelsService } from '@/api/artivle'
import { ref } from 'vue'

// 父传子 数据
defineProps({
  modelValue: {
    type: [Number, String]
  },
  width: {
    type: String
  }
})

const emit = defineEmits(['update:modelValue'])
// 下拉菜单数据
const channelList = ref([])
// 请求方法获取文章分类数据
const getChannelList = async () => {
  const res = await artGetChannelsService()
  channelList.value = res.data.data
}
getChannelList()
</script>
<template>
  <el-select
    :style="{ width }"
    :modelValue="modelValue"
    @update:modelValue="emit('update:modelValue', $event)"
  >
    <el-option
      v-for="channel in channelList"
      :key="channel.id"
      :label="channel.cate_name"
      :value="channel.id"
    ></el-option>
  </el-select>
</template>

<style lang="scss" scoped></style>

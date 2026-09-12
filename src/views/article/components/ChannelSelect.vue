<script setup>
import { artGetChannelsService } from '@/api/article'
import { ref } from 'vue'

defineProps({
  modelValue: {
    type: [Number, String],
  },

  // 下拉框宽度
  width: {
    type: String,
    default: '180px',
  },
})

const emit = defineEmits(['update:modelValue'])

const channelList = ref([])

// 获取文章分类列表
const getChannelList = async () => {
  const res = await artGetChannelsService()

  channelList.value = res.data.data
}

getChannelList()
</script>

<template>
  <el-select
    :style="{ width }"
    :model-value="modelValue"
    placeholder="请选择"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <el-option
      v-for="channel in channelList"
      :key="channel.id"
      :label="channel.cate_name"
      :value="channel.id"
    />
  </el-select>
</template>

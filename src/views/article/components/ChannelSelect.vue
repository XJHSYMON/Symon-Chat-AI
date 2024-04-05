<script setup>
import { artGetChannelsService } from '@/api/article.js'
import { ref } from 'vue'
defineProps({
  modelValue: {
    type: [String, Number]
  }
})
const emit = defineEmits(['update:modelValue'])
const ChannelList = ref([])
const getChannelList = async () => {
  const res = await artGetChannelsService()
  ChannelList.value = res.data.data
  console.log(ChannelList.value)
}
getChannelList()
</script>

<template>
  <el-select
    placeholder="选择"
    :modelValue="modelValue"
    @update:modelValue="emit('update:modelValue', $event)"
  >
    <el-option
      v-for="channel in ChannelList"
      :key="channel.id"
      :label="channel.cate_name"
      :value="channel.id"
    ></el-option>
  </el-select>
</template>

<style scoped></style>

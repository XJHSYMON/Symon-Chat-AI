<script setup>
import PageContainer from '@/components/PageContainer.vue'
import { ref } from 'vue'
import { artGetChannelsService, artDeleteChannelsService } from '@/api/article.js'
import { Edit, Delete } from '@element-plus/icons-vue'
import ChannelEdit from '@/views/article/components/ChannelEdit.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
const channelList = ref([])
const loading = ref(false)
const dialog = ref()

const getChannelList = async () => {
  loading.value = true
  const res = await artGetChannelsService()
  channelList.value = res.data.data
  loading.value = false
  console.log(channelList.value)
}
getChannelList()

const onEditChannel = (row) => {
  dialog.value.open(row)
}

const onDeleteChannel = async (row) => {
  await ElMessageBox.confirm('你确定要删除该分类吗?', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
  await artDeleteChannelsService(row.id)
  ElMessage.success('删除成功')
  getChannelList()
}
const onAddChannel = () => {
  dialog.value.open({})
}
const onSuccess = () => {
  getChannelList()
}
</script>
<!--内容架子，每个页面都有的样式，自定义内容（部分内容不写死）-->
<template>
  <page-container title="文章分类">
    <template #extra>
      <el-button type="primary" @click="onAddChannel" plain>添加分类</el-button>
    </template>
    <!--文章主题部分-->
    <el-table :data="channelList" style="width: 100%" v-loading="loading">
      <el-table-column label="序号" type="index" width="200"></el-table-column>
      <el-table-column label="分类名称" prop="cate_name"></el-table-column>
      <el-table-column label="分类别名" prop="cate_alias"></el-table-column>
      <el-table-column label="操作" width="200">
        <!--  row就是channelList的一项，%index是索引，-->
        <template #default="{ row, $index }">
          <el-button
            @click="onEditChannel(row, $index)"
            :icon="Edit"
            type="primary"
            circle
            plain
          ></el-button>
          <el-button
            @click="onDeleteChannel(row)"
            :icon="Delete"
            type="danger"
            circle
            plain
          ></el-button>
        </template>
      </el-table-column>
      <!--  ↑↑  自定义列内容-->
      <template #empty>
        <el-empty description="没有数据"></el-empty>
      </template>
    </el-table>
    <!--  弹窗组件渲染 ,ref='dialog'表示将<channel-edit>的组件实例赋值给父组件中的dialog变量，父组件可以通过dialog直接访问子组件中的方法，属性等 -->
    <channel-edit ref="dialog" @success="onSuccess"></channel-edit>
  </page-container>
</template>

<style scoped></style>

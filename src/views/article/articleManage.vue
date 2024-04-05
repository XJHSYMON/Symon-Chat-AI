<script setup>
import PageContainer from '@/components/PageContainer.vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import { ref } from 'vue'
import ChannelSelect from '@/views/article/components/ChannelSelect.vue'
import { artGetListService } from '@/api/article.js'
import { formatTime } from '@/utils/format.js'
import ArticleEdit from '@/views/article/components/ArticleEdit.vue'

const ArticleData = ref([])
const total = ref()
const loading = ref(false)
const articleEditRef = ref()
// 定义请求参数对象，便于维护，以及未来要请求获取表单数据需要传输的对象进行封装
const params = ref({
  pagenum: 1, //当前页面
  pagesize: 2, //当前生效的每页数据条数
  cate_id: '',
  state: ''
})
//基于params参数，获取文章列表
const getArtcileList = async () => {
  loading.value = true
  const res = await artGetListService(params.value)
  ArticleData.value = res.data.data
  total.value = res.data.total
  console.log(ArticleData.value)
  loading.value = false
}
getArtcileList()

//处理分页逻辑
const handleSizeChange = (size) => {
  //要是每一页可以显示的数据条数改变，那么再次访问当前页的意义不大，数据大概率不是原来的一行，所以直接跳转到第一页
  params.value.pagenum = 1
  params.value.pagesize = size
  //基于最新的当前页和每页条数，重新从后端拿取数据渲染
  getArtcileList()
  // console.log('更改页面数据成功')
}
const handleCurrentChange = (page) => {
  params.value.pagenum = page
  getArtcileList()
}

//搜索逻辑 => 按照最新的条件，重新检索，从第一页开始
const onSearch = () => {
  params.value.pagenum = 1
  getArtcileList()
}
//重置逻辑 => 将筛选条件清空，重新检索，从第一页开始
const onReSet = () => {
  params.value.pagenum = 1
  params.value.cate_id = ''
  params.value.state = ''
  getArtcileList()
}
//添加逻辑
const onAddArticle = () => {
  articleEditRef.value.open({})
}
//编辑逻辑
const onEditArticle = (row) => {
  articleEditRef.value.open(row)
}
//删除逻辑
const onDeleteArticle = () => {}
//添加或者编辑成功的回调
const onSuccess = (type) => {
  if (type === 'add') {
    //如果是添加，渲染最后一页，因为添加的新数据在最后一页
    const lastPage = Math.ceil((total.value + 1) / params.value.pagesize)
    //更新页面
    params.value.pagenum = lastPage
    getArtcileList()
  } else {
    //直接在当前页渲染
    getArtcileList()
  }
}
</script>
<!--最外层通用-->
<template>
  <page-container title="文章管理">
    <template #extra>
      <el-button type="primary" plain @click="onAddArticle">发布文章</el-button>
    </template>
    <!--  表单区域  -->
    <el-form class="x-row" style="justify-content: space-between">
      <el-form-item label="文章分类:">
        <!-- VUE3中的v-model本质是:modelValue和@update:modelValue的简写本质上就是父传子和子传父   -->
        <channel-select v-model="params.cate_id"></channel-select>
      </el-form-item>
      <el-form-item label="发布状态:" style="margin-left: 40px">
        <el-select placeholder="选择" v-model="params.state">
          <el-option label="已发布" value="已发布"></el-option>
          <el-option label="草稿" value="草稿"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item style="margin-left: auto">
        <el-form-item>
          <el-button @click="onSearch">搜索</el-button>
          <el-button @click="onReSet">重置</el-button>
        </el-form-item>
      </el-form-item>
    </el-form>
    <!--  表格区域  -->
    <el-table :data="ArticleData" v-loading="loading">
      <el-table-column label="文章标题" prop="title">
        <template #default="{ row }">
          <el-link :underline="false" type="primary">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="分类" prop="cate_name"></el-table-column>
      <el-table-column label="发布时间" prop="pub_date">
        <template #default="{ row }">
          {{ formatTime(row.pub_data) }}
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="state"></el-table-column>
      <el-table-column label="操作" width="200">
        <template #default="{ row }">
          <el-button
            :icon="Edit"
            type="primary"
            circle
            plain
            @click="onEditArticle(row)"
          ></el-button>
          <el-button :icon="Delete" type="danger" circle plain @click="onDeleteArticle"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页区域pagination   -->
    <div class="demo-pagination-block">
      <el-pagination
        v-model:current-page="params.pagenum"
        v-model:page-size="params.pagesize"
        :page-sizes="[2, 3, 4, 5]"
        :background="true"
        layout="jumper,total, sizes, prev, pager, next "
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        style="justify-content: end; margin-top: 20px"
      />
    </div>
    <!-- 抽屉Drawer   -->
    <article-edit ref="articleEditRef" @success="onSuccess"></article-edit>
  </page-container>
</template>

<style scoped></style>

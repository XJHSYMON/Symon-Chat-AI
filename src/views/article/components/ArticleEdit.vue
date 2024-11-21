<script setup>
import { ref } from 'vue'
import ChannelSelect from '@/views/article/components/ChannelSelect.vue'
import { Plus } from '@element-plus/icons-vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { artPublishService } from '@/api/article.js'
import { ElMessage } from 'element-plus'
import { artGetDetailService, artEditService } from '@/api/article.js'
import { baseURL } from '@/utils/request.js'
import axios from 'axios'

const visibleDrawer = ref(false)
const formRef = ref()
const imageUrl = ref()
// 默认数据
const defaultFormData = {
  title: '',
  cate_id: '',
  content: '',
  cover_img: '',
  state: ''
}
// 准备文章数据内容，根据接口文档来，用来接受参数，发布文章接口
const formModel = ref({ ...defaultFormData })
//图片上传相关逻辑
const onSelectFile = (uploadfile) => {
  imageUrl.value = URL.createObjectURL(uploadfile.raw) //创建本地图片预览地址
  formModel.value.cover_img = uploadfile.raw
  console.log(uploadfile.raw)
}
// <!--弹窗组件分为添加和编辑-->
// <!--组件对外暴露一个 open 方法，基于open传来的参数，区分是添加还是编辑-->
// <!--open({}) => 表单无需渲染，说明是添加-->
// <!--open({id,cate_name,....}) => 传来完整的对象，表单需要渲染，说明是编辑-->
// <!--open调用后会打开弹窗-->
const editorRef = ref()
const open = async (row) => {
  visibleDrawer.value = true
  // 基于row.id发送请求，获取编辑对应的详细数据，进行回显
  if (row.id) {
    const res = await artGetDetailService(row.id)
    console.log('编辑回显')
    // console.log(res)
    formModel.value = res.data.data
    //图片数据需要单独回显
    imageUrl.value = baseURL + formModel.value.cover_img
    //更新数据
    //根据接口文档，需要将图片地址 => 转换成file对象，存储起来
    const file = await imageUrlToFile(imageUrl.value, formModel.value.cover_img)
    formModel.value.cover_img = file
  } else {
    formModel.value = { ...defaultFormData } //基于默认数据，重置form数据
    //这里重置了表单的数据，但是图片和富文本编辑器重置需要手动重置
    imageUrl.value = ''
    editorRef.value.setHTML('')
    //采用vue-quill中的方法来修改内容，具体看文档
    console.log('添加')
  }
}
//将网络图片地址转换为file对象
async function imageUrlToFile(url, fileName) {
  try {
    // 第一步：使用axios获取网络图片数据
    const response = await axios.get(url, { responseType: 'arraybuffer' })
    const imageData = response.data

    // 第二步：将图片数据转换为Blob对象
    const blob = new Blob([imageData], { type: response.headers['content-type'] })

    // 第三步：创建一个新的File对象
    const file = new File([blob], fileName, { type: blob.type })

    return file
  } catch (error) {
    console.error('将图片转换为File对象时发生错误:', error)
    throw error
  }
}
const emit = defineEmits(['success'])
//提交
const onPublish = async (state) => {
  formModel.value.state = state

  //注意：当前接口，需要的是formData对象
  //需要将当前的普通js对象 => formData对象
  const fd = new FormData()
  for (let key in formModel.value) {
    fd.append(key, formModel.value[key])
  }
  //发请求
  if (formModel.value.id) {
    //编辑操作
    await artEditService(fd)
    ElMessage.success('修改成功')
    visibleDrawer.value = false
    emit('success', 'edit')
  } else {
    //添加操作
    await artPublishService(fd)
    ElMessage.success('添加成功')
    visibleDrawer.value = false
    //通知父组件，父组件监听success
    emit('success', 'add')
    //上面的add用于区分添加和编辑，添加成功了跳转到最后一页，编辑当前页面渲染
  }
}

defineExpose({
  open
})
</script>

<template>
  <el-drawer v-model="visibleDrawer" size="50%" :title="formModel.id ? '编辑文章' : '添加文章'">
    <!--  发表文章表单  -->
    <el-form :model="formModel" ref="formRef">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="formModel.title"></el-input>
      </el-form-item>
      <el-form-item label="文章分类" prop="cate_id">
        <channel-select v-model="formModel.cate_id" style="width: 100%"></channel-select>
      </el-form-item>
      <el-form-item label="文章封面" prop="cover_img">
        <!-- 自处需要手动关闭element-plus的自动上传后端，不需要配置action等参数
           只需要做前端的图片预览即可，无需在点击提交按钮前上传数据到后端，从而减小服务器的压力
           语法:URL.createObjectURL(...) 创建本地图片预览地址-->
        <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          :auto-upload="false"
          :on-change="onSelectFile"
        >
          <!--   on-change是一个钩子函数，在图片状态发生改变的时候触发    -->
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <!--      富文本编辑器vueQuill-->
      <el-form-item label="文章封面" prop="content">
        <div class="editor">
          <quill-editor
            ref="editorRef"
            theme="snow"
            v-model:content="formModel.content"
            content-type="html"
          ></quill-editor>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button @click="onPublish('已发布')">发布</el-button>
        <el-button @click="onPublish('草稿')">草稿</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<style lang="scss" scoped>
.editor {
  width: 100%;
  :deep(.ql-editor) {
    min-height: 200px;
  }
}
.avatar-uploader {
  :deep() {
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }
    .el-upload:hover {
      border-color: var(--el-color-primary);
    }
    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      text-align: center;
    }
  }
}
</style>

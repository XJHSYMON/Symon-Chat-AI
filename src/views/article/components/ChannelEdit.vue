<script setup>
import { ref } from 'vue'
import '@/assets/X-style.css'
import { ElMessage } from 'element-plus'
import { artEditChannelsService, artAddChannelsService } from '@/api/article.js'

const dialogVisible = ref(false)
const formModel = ref({
  cate_name: '',
  cate_alias: ''
})
const rules = {
  cate_name: [
    {
      required: true,
      message: '请输入分类名称',
      trigger: 'blur'
    },
    {
      pattern: /^\S{1,10}$/,
      message: '分类名称必须为1-10位的非空字符',
      trigger: 'blur'
    }
  ],
  cate_alias: [
    {
      required: true,
      message: '请输入分类别名',
      trigger: 'blur'
    },
    {
      pattern: /^\S{1,10}$/,
      message: '分类名称必须为1-10位的非空字符',
      trigger: 'blur'
    }
  ]
}
// <!--弹窗组件分为添加和编辑-->
// <!--组件对外暴露一个 open 方法，基于open传来的参数，区分是添加还是编辑-->
// <!--open({}) => 表单无需渲染，说明是添加-->
// <!--open({id,cate_name,....}) => 传来完整的对象，表单需要渲染，说明是编辑-->
// <!--open调用后会打开弹窗-->
const open = (row) => {
  console.log(row)
  dialogVisible.value = true
  // 将父组件中的数据回显
  formModel.value = row
}
//向外暴露方法才能被调用
defineExpose({ open })

// 接受前端input框内数据传递给后端
const formRef = ref()
// 前端提交数据给后端的逻辑
// 1.先校验添加内容
// 2.再判断更新还是添加
// 3.发送请求
//4.关闭弹窗
//5.更新数据(子传父) 子组件defineEmits(['success'])  父组件@success='onSuccess'接收
const emit = defineEmits(['success'])
const onSubmit = async () => {
  // await formRef.value.validate()
  const isEdit = formModel.value.id
  if (isEdit) {
    await artEditChannelsService(formModel.value)
    ElMessage.success('编辑成功')
  } else {
    await artAddChannelsService(formModel.value)
    ElMessage.success('添加成功')
  }
  dialogVisible.value = false
  emit('success')
}
</script>

<template>
  <!--弹窗组件-->
  <!-- 不将title写死-->
  <el-dialog v-model="dialogVisible" :title="formModel.id ? '编辑分类' : '添加分类'" width="500">
    <el-form
      ref="formRef"
      :model="formModel"
      label-width="100px"
      style="padding: 0 20px"
      :rules="rules"
    >
      <el-form-item label="分类名称" prop="cate_name" style="margin-bottom: 30px">
        <el-input
          v-model="formModel.cate_name"
          placeholder="请输入分类名称"
          style="width: 300px"
        ></el-input>
      </el-form-item>
      <el-form-item label="分类别名" prop="cate_alias">
        <el-input
          v-model="formModel.cate_alias"
          placeholder="请输入分类别名"
          style="width: 300px"
        ></el-input>
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="onSubmit"> Confirm </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped></style>

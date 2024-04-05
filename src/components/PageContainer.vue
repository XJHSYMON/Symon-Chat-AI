<script setup>
defineProps({
  title: {
    required:true,
    type: String,
  }
})
// 父传子数据
</script>

<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>{{ title }}</span>
        <div class="extra">
          <slot name="extra"></slot>
<!--          具名插槽-->
        </div>
      </div>
    </template>
<!--    文章主题内容-->
    <slot></slot>
  </el-card>
</template>

<style scoped>
.header{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.page-container{
  min-height: 100%;
  box-sizing: border-box;
  /*元素的高度包括内容框、padding和border。默认值仅包括内容框。*/
}

</style>
<script setup>
</script>

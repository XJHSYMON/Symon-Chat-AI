<script setup>
import { ref } from 'vue'
import { ArrowDown, ArrowUp } from '@element-plus/icons-vue'
const dataList = [
  { key: 1, value: '718' },
  { key: 2, value: '911' },
  { key: 3, value: 'Taycan Turbo' },
  { key: 4, value: 'Panamera' },
  { key: 5, value: 'Macan' },
  { key: 6, value: 'Cayenne' }
]

const isShowSelect = ref(true)
const isShowArrowDwon = ref(true)
const isShowArrowUp = ref(false)
//icon逻辑
const arrowDown = () => {
  isShowSelect.value = !isShowSelect.value
  isShowArrowDwon.value = !isShowArrowDwon.value
  isShowArrowUp.value = !isShowArrowUp.value
}
//点击触发select选项，更改unitName
const select = (item, index) => {
  unitName.value = item.value
  console.log(unitName.value)
}
const unitName = ref('请输入您喜欢的保时捷车型')
//<p>标签根据{{unitName}}改变而更改字体颜色
const unitNameColor = () => {
  if (unitName.value === '请输入您喜欢的保时捷车型') {
    return '#888686'
  } else {
    return '#303133'
  }
}
</script>

<template>
  <div class="content">
    <div class="selectBox" style="width: 238px">
      <div class="selectBox_show">
        <p style="margin: 10px" :style="{ color: unitNameColor() }">{{ unitName }}</p>
        <el-icon
          @click="arrowDown"
          v-show="isShowArrowDwon"
          style="margin-top: 12.8px; position: absolute; left: 212px"
          ><ArrowDown
        /></el-icon>
        <el-icon
          @click="arrowDown"
          v-show="isShowArrowUp"
          style="position: absolute; left: 212px; margin-top: 12.8px"
          ><ArrowUp
        /></el-icon>
        <div class="selectBox_list" v-if="!isShowSelect">
          <div
            class="selectBox_listLi"
            v-for="(item, index) in dataList"
            :key="item.key"
            @click="select(item, index)"
          >
            {{ item.value }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content {
  height: 100vh;
  .selectBox {
    .selectBox_show {
      display: flex;
      flex-direction: row;
      position: relative;
      border: 2px #eeeded solid;
      border-radius: 5px;
      box-shadow: 0 0 5px #e1e1e1;
      margin: 0;
      .selectBox_list {
        position: absolute;
        top: 100%;
        width: 234.8px;
        border: 2px #eeeded solid;
        border-radius: 5px;
        box-shadow: 0 0 5px #e1e1e1;
        text-align: center;
        .selectBox_listLi {
          margin-top: 5px;
        }
        .selectBox_listLi:hover {
          margin-top: 5px;
          outline: none;
          cursor: pointer;
          user-select: none;
          background-color: #e9e9ec;
          transition: background-color 0.3s ease;
        }
      }
    }
  }
}
</style>

<script setup>
import AMapLoader from '@amap/amap-jsapi-loader'
import { onMounted, onUnmounted, ref } from 'vue'
// https://lbs.amap.com/api/javascript-api-v2/guide/abc/amap-vue
const dialogVisible = ref(false)
let map = null
let polygons = []
onMounted(() => {
  window._AMapSecurityConfig = {
    securityJsCode: '77be47425b3092da1a9c40c067b61a26'
  }
  AMapLoader.load({
    key: '151ba42699a7b210f72f80c6b00755d9', // 申请好的Web端开发者Key，首次调用 load 时必填
    version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: ['AMap.Scale'] //需要使用的的插件列表，如比例尺'AMap.Scale'，支持添加多个如：['...','...']
  })
    .then((AMap) => {
      console.log(AMap)
      map = new AMap.Map('container', {
        // 设置地图容器id
        viewMode: '3D', // 是否为3D地图模式
        zoom: 13, // 初始化地图级别
        center: [113.56276099999991, 22.161173] // 初始化地图中心点位置
      })
      //地图高亮
      //标记点
      let marker = new AMap.Marker({
        position: new AMap.LngLat(113.56276099999991, 22.161173), //经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        title: '澳门城市大学'
      })
      marker.on('click', function (e) {
        dialogVisible.value = true
      })
      map.add(marker)
    })
    .catch((e) => {
      console.log(e)
    })
})

onUnmounted(() => {
  map?.destroy()
})
</script>

<template>
  <div id="container">
    <el-dialog v-model="dialogVisible" title="位置信息" width="30%">
      <span>这里是澳门城市大学</span>
      <template #footer>
        <el-button @click="dialogVisible = false">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
#container {
  width: 100%;
  height: 800px;
}
</style>

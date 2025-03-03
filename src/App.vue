<template>
  <div class="app" id="cesiumContainer"></div>
</template>

<script setup>
import * as Cesium from 'cesium'
import { onMounted } from 'vue'
import { initViewer } from '@/cesium'

onMounted(async () => {
  const viewer = await initViewer()
  //跳转到广州塔
  const position = Cesium.Cartesian3.fromDegrees(113.3191, 23.109, 1000)
  viewer.camera.flyTo({ destination: position, duration: 2 })
})
</script>

<style lang="less" scoped>
.app {
  width: 100vw;
  height: 100vh;
}
</style>

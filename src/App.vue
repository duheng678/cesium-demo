<template>
  <div class="app" id="cesiumContainer"></div>
</template>

<script setup>
import * as Cesium from 'cesium'
import { onMounted } from 'vue'
import {
  LoadLightLine,
  RectFlyLight,
  LightCone,
  initViewer,
  MousePosition,
  modifyMap,
  modifyBuilding,
  RadarLight,
  LightSpread,
  LightWall,
  ParticleLight,
} from '@/cesium'
import CesiumNavigation from 'cesium-navigation-es6'

onMounted(async () => {
  // 初始化
  const viewer = await initViewer()
  //跳转到广州塔
  const position = Cesium.Cartesian3.fromDegrees(
    113.3301,
    // 纬度
    23.0991,
    1500
  )

  window.addEventListener('keydown', event => {
    if (event.key == 1) {
      viewer.camera.flyTo({
        destination: position,
        duration: 2,
        orientation: {
          heading: Cesium.Math.toRadians(0), // 方向
          pitch: Cesium.Math.toRadians(-30), // 倾斜
          roll: 0, // 旋转
        },
      })
    }
  })
  //控制相机角度

  //根据鼠标位置生成经纬度
  new MousePosition(viewer)
  //罗盘控制
  const options = {
    // 用于启用或禁用罗盘。true是启用罗盘，false是禁用罗盘。默认值为true。如果将选项设置为false，则罗盘将不会添加到地图中。
    enableCompass: true,
    // 用于启用或禁用缩放控件。true是启用，false是禁用。默认值为true。如果将选项设置为false，则缩放控件将不会添加到地图中。
    enableZoomControls: true,
    // 用于启用或禁用距离图例。true是启用，false是禁用。默认值为true。如果将选项设置为false，距离图例将不会添加到地图中。
    enableDistanceLegend: true,
    // 用于启用或禁用指南针外环。true是启用，false是禁用。默认值为true。如果将选项设置为false，则该环将可见但无效。
    enableCompassOuterRing: true,
  }
  // 初始化导航罗盘
  new CesiumNavigation(viewer, options)
  //修改地图的底色
  // modifyMap(viewer)
  //修改底图建筑
  modifyBuilding(viewer)
  //创建动态光锥
  new LightCone(viewer)
  //创建区域上升流光飞线
  new RectFlyLight(viewer)
  //创建道路线
  const roadLine = new LoadLightLine(viewer)
  //雷达扫描
  new RadarLight(viewer)
  //六边形扩散效果
  new LightSpread(viewer)
  //光墙
  new LightWall(viewer)
  //烟花
  new ParticleLight(viewer)
  new ParticleLight(viewer, Cesium.Color.GREEN)
  new ParticleLight(viewer, Cesium.Color.PURPLE)
})
</script>

<style lang="less" scoped>
.app {
  width: 100vw;
  height: 100vh;
}
</style>

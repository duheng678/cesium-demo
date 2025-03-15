import * as Cesium from 'cesium'
export const initViewer = async () => {
  Cesium.Ion.defaultAccessToken = import.meta.env.VITE_APP_TOKEN
  // // 设置cesium的根目录
  // window.CESIUM_BASE_URL = '/'
  // //设置cesium的默认视角
  Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(
    89.5, //西经
    20.4, //南纬
    110.4, //东经
    61.2 //北纬
  )
  const viewer = new Cesium.Viewer('cesiumContainer', {
    infoBox: false,
    shouldAnimate: true,
    geocoder: false, //source:false,//搜索框
    homeButton: false, //首页按钮
    sceneModePicker: false, //3D/2D切换
    baseLayerPicker: false, //底图切换
    fullscreenButton: false, //全屏按钮
    navigationHelpButton: false, //帮助按钮
    animation: false, //动画控制
    timeline: false, //时间轴
  })
  viewer.cesiumWidget.creditContainer.style.display = 'none'
  var iframe = document.getElementsByClassName('cesium-infoBox-iframe')[0]
  if (iframe) {
    iframe.setAttribute('sandbox', 'allow-same-origin allow-scripts allow-popups allow-forms')
    iframe.setAttribute('src', '')
  }

  return viewer
}

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

  // 移除默认的 Cesium Ion 底图（如果存在）
  // if (viewer.imageryLayers.length > 0) {
  //   viewer.imageryLayers.removeAll()
  // }

  // 添加天地图影像底图（img_w 是影像图层）
  // viewer.imageryLayers.addImageryProvider(
  //   new Cesium.WebMapTileServiceImageryProvider({
  //     url: 'http://t{s}.tianditu.com/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=00a0eb37ce20466034702928f409754a',
  //     layer: 'img',
  //     style: 'default',
  //     format: 'tiles',
  //     tileMatrixSetID: 'w',
  //     subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
  //     maximumLevel: 18,
  //   })
  // )

  // 添加天地图注记图层（cia_w 是注记图层）
  viewer.imageryLayers.addImageryProvider(
    new Cesium.WebMapTileServiceImageryProvider({
      url: 'http://t{s}.tianditu.com/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=00a0eb37ce20466034702928f409754a',
      layer: 'cia',
      style: 'default',
      format: 'tiles',
      tileMatrixSetID: 'w',
      subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
      maximumLevel: 18,
    })
  )
  // const imageryProvider = new Cesium.TileMapServiceImageryProvider({
  //   url: 'http://localhost:5173/tiles/{z}/{x}/{y}.png', // 替换为影像数据URL
  //   fileExtension: 'png', // 影像文件扩展名
  //   minimumLevel: 0, // 最小层级
  //   maximumLevel: 10, // 最大层级
  //   rectangle: Cesium.Rectangle.fromDegrees(-180.0, -90.0, 180.0, 90.0), // 影像覆盖范围
  // })
  // viewer.imageryLayers.addImageryProvider(imageryProvider)
  viewer.cesiumWidget.creditContainer.style.display = 'none'
  var iframe = document.getElementsByClassName('cesium-infoBox-iframe')[0]
  if (iframe) {
    iframe.setAttribute('sandbox', 'allow-same-origin allow-scripts allow-popups allow-forms')
    iframe.setAttribute('src', '')
  }

  return viewer
}

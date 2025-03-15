import * as Cesium from 'cesium'
export class MousePosition {
  constructor(viewer) {
    this.divDom = document.createElement('div')
    this.divDom.style.cssText = `
    position:fixed;
    bottom:0;
    right:0;
    height:30px;
    padding:0 15px;
    line-height:30px;
    color:#fff;
    background:rgba(0,0,0,0.2);    
    border-radius:5px;
    `
    document.body.appendChild(this.divDom)

    //坚挺鼠标垫移动事件
    const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)
    handler.setInputAction(movement => {
      //获取鼠标坐标
      const cartesian = viewer.camera.pickEllipsoid(movement.endPosition, viewer.scene.globe.ellipsoid)
      if (cartesian) {
        //将笛卡尔坐标转成经纬度坐标
        const cartographic = Cesium.Cartographic.fromCartesian(cartesian)
        // const position =Cesium.
        const longitude = Cesium.Math.toDegrees(cartographic.longitude).toFixed(2)
        const latitude = Cesium.Math.toDegrees(cartographic.latitude).toFixed(2)
        this.divDom.innerHTML = `精度:${longitude} 纬度:${latitude}`
      }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
  }
}

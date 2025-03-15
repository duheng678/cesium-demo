import * as Cesium from 'cesium'
import * as turf from '@turf/turf'
import { PolylineTrailMaterialProperty } from './material/PolylineTrailMaterialProperty'

export class RectFlyLight {
  constructor(viewer) {
    // 设置矩形区域
    this.bbox = [113.2691, 23.014, 113.3691, 23.159]
    //创建随机点
    let points = turf.randomPoint(300, { bbox: this.bbox })
    //通过生成的随机点生成线
    let features = points.features
    features.forEach(feature => {
      //获取点的经纬度
      let point = feature.geometry.coordinates
      //根据点设置起始位置
      let start = Cesium.Cartesian3.fromDegrees(point[0], point[1], 0)
      //根据点设置结束位置
      let end = Cesium.Cartesian3.fromDegrees(point[0], point[1], 200 + Math.random() * 3000)
      //创建线

      let flyLine = viewer.entities.add({
        polyline: {
          positions: [start, end],
          width: 2,
          material: new PolylineTrailMaterialProperty(),
        },
      })
    })
  }
}

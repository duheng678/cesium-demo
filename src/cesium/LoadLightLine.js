import * as Cesium from 'cesium'
import { PolylineTrailMaterialProperty } from './material/PolylineTrailMaterialProperty'
import { SpritelineTrailMaterialProperty } from './material/SpritelineTrailMaterialProperty'
export class LoadLightLine {
  constructor(viewer) {
    let geoJsonP = Cesium.GeoJsonDataSource.load('/geojson/roadline.geojson')
    geoJsonP.then(dataSource => {
      console.log(dataSource)
      viewer.dataSources.add(dataSource)
      let entities = dataSource.entities.values
      let polylineTrailMaterialProperty = new PolylineTrailMaterialProperty(new Cesium.Color(0.7, 1.0, 0.7))
      let spritelineTrailMaterialProperty = new SpritelineTrailMaterialProperty()
      entities.forEach(entity => {
        let polyline = entity.polyline
        polyline.material = spritelineTrailMaterialProperty
      })
    })
  }
  init() {}
}

import * as Cesium from 'cesium'
import { LightWallMaterialProperty } from './material/LightWallMaterialProperty'
import gsap from 'gsap'
export class LightWall {
  constructor(viewer) {
    this.params = {
      minLot: 113.3091,
      minLat: 23.099,
      maxLot: 113.3191,
      maxLat: 23.109,
    }
    this.wallMaterial = new LightWallMaterialProperty('LightWallMaterial')
    this.entity = viewer.entities.add({
      wall: {
        positions: Cesium.Cartesian3.fromDegreesArrayHeights([
          113.3051, 23.099, 200.0, 113.3101, 23.099, 200.0, 113.3101, 23.104, 200.0, 113.3051, 23.104, 200.0, 113.3051,
          23.099, 200.0,
        ]),
        material: this.wallMaterial,
        // outline: true,
      },
    })
  }
}

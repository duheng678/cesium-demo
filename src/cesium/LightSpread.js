import * as Cesium from 'cesium'
import { LightSpreadMaterialProperty } from './material/LightSpreadMaterialProperty'
import gsap from 'gsap'
export class LightSpread {
  constructor(viewer) {
    this.params = {
      minLot: 113.3091,
      minLat: 23.099,
      maxLot: 113.3191,
      maxLat: 23.109,
    }
    this.radarMaterial = new LightSpreadMaterialProperty('LightSpreadMaterial')
    this.entity = viewer.entities.add({
      rectangle: {
        coordinates: Cesium.Rectangle.fromDegrees(113.3091, 23.099, 113.3191, 23.109),
        material: this.radarMaterial,
      },
    })
    gsap.to(this.params, {
      minLot: 113.1991,
      minLat: 23.009,
      maxLot: 113.4241,
      maxLat: 23.234,
      duration: 5,
      repeat: -1,
      // yoyo: true,
      ease: 'power1.inOut',
      onUpdate: () => {
        this.entity.rectangle.coordinates = Cesium.Rectangle.fromDegrees(
          this.params.minLot,
          this.params.minLat,
          this.params.maxLot,
          this.params.maxLat
        )
      },
    })
  }
}

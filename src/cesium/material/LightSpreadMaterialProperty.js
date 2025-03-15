import * as Cesium from 'cesium'
import gsap from 'gsap'
let num = 0
export class LightSpreadMaterialProperty {
  constructor(name) {
    this.name = name
    this.typeNum = num++
    this.definitionChanged = new Cesium.Event()
    Cesium.Material._materialCache.addMaterial('LightSpreadMaterialProperty' + this.typeNum, {
      fabric: {
        type: 'LightSpreadMaterialProperty' + this.typeNum,
        uniforms: {
          uTime: 0,
          image: '/texture/hexagon.png',
        },
        source: `
      czm_material czm_getMaterial(czm_materialInput materialInput)
          {
            // 生成默认的基础材质
            czm_material material = czm_getDefaultMaterial(materialInput);
            vec2 st = materialInput.st;
            //根据uv采样颜色
            vec4 color = texture(image,st);
            material.diffuse = color.rgb;
            material.alpha = color.a;
            return material;
          }
      `,
      },
    })
    this.params = {
      uTime: 0,
    }
    gsap.to(this.params, {
      uTime: 6.2832,
      duration: 1,
      repeat: Infinity,
      ease: 'linear',
    })
  }
  getType() {
    return 'LightSpreadMaterialProperty' + this.typeNum
  }
  getValue(time, result) {
    // console.log(time, result)
    // let t = performance.now() / 1000
    // t = t % 1
    // result.uTime = t
    result.uTime = this.params.uTime
    return result
  }
  equals(other) {
    return other instanceof LightSpreadMaterialProperty && this.name === other.name
  }
}

import * as Cesium from 'cesium'
import gsap from 'gsap'
let num = 0
export class SpritelineTrailMaterialProperty {
  constructor(name) {
    this.name = name
    this.typeNum = num++
    this.definitionChanged = new Cesium.Event()
    Cesium.Material._materialCache.addMaterial('SpritelineTrailMaterialProperty' + this.typeNum, {
      fabric: {
        type: 'SpritelineTrailMaterialProperty' + this.typeNum,
        uniforms: {
          uTime: 0,
          image: '/texture/spriteline1.png',
        },
        source: `
      czm_material czm_getMaterial(czm_materialInput materialInput)
          {
            // 生成默认的基础材质
            czm_material material = czm_getDefaultMaterial(materialInput);
            vec2 st = materialInput.st;
            //根据uv采样颜色
            vec4 color = texture(image,vec2(fract(st.s-uTime),st.t));
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
      uTime: 1,
      duration: 1,
      repeat: Infinity,
      ease: 'linear',
    })
  }
  getType() {
    return 'SpritelineTrailMaterialProperty' + this.typeNum
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
    return other instanceof SpritelineTrailMaterialProperty && this.name === other.name
  }
}

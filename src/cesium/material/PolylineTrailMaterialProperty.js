import * as Cesium from 'cesium'
import gsap from 'gsap'
let num = 0
export class PolylineTrailMaterialProperty {
  constructor(color = new Cesium.Color(0.7, 0.6, 1.0)) {
    this.color = color
    this.typeNum = num++
    this.definitionChanged = new Cesium.Event()
    Cesium.Material._materialCache.addMaterial('PolylineTrailMaterialProperty' + this.typeNum, {
      fabric: {
        type: 'PolylineTrailMaterialProperty' + this.typeNum,
        uniforms: {
          uTime: 0,
          color: this.color,
        },
        source: `
      czm_material czm_getMaterial(czm_materialInput materialInput)
          {
            // 生成默认的基础材质
            czm_material material = czm_getDefaultMaterial(materialInput);
            vec2 st =materialInput.st;
            // float t = materialInput.t;
            //获取当前帧数
            float time =fract(czm_frameNumber/(60.0*10.0));
            time=time*(1.0+0.1);
            //平滑过度函数
            float alpha = smoothstep(time-0.1,time,st.s)*step(-time,-st.s)+0.05;
            material.alpha = alpha; 
            material.diffuse = vec3(color);
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
      duration: 2,
      repeat: Infinity,
      ease: 'linear',
      yoyo: true,
    })
  }
  getType() {
    return 'PolylineTrailMaterialProperty' + this.typeNum
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
    return other instanceof PolylineTrailMaterialProperty && this.color === other.color
  }
}

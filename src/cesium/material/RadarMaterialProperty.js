import * as Cesium from 'cesium'
import gsap from 'gsap'
let num = 0
export class RadarMaterialProperty {
  constructor(name) {
    this.name = name
    this.typeNum = num++
    this.definitionChanged = new Cesium.Event()
    Cesium.Material._materialCache.addMaterial('RadarMaterialProperty' + this.typeNum, {
      fabric: {
        type: 'RadarMaterialProperty' + this.typeNum,
        uniforms: {
          uTime: 0,
          image: '/texture/spriteline1.png',
        },
        source: `
      czm_material czm_getMaterial(czm_materialInput materialInput)
          {
            // 生成默认的基础材质
            czm_material material = czm_getDefaultMaterial(materialInput);
            //旋转uv
            vec2 newSt= mat2(cos(uTime),-sin(uTime), sin(uTime),cos(uTime))*(materialInput.st-0.5);
            newSt+=0.5;
            vec2 st = newSt;

            //根据uv采样颜色
          float alpha =step(distance(vec2(0.5),st),0.5);
          //根据角度来设置强弱 angle从-PI到PI
          float angle =atan(st.s-0.5,st.t-0.5);
          float strength = (angle+3.1416)/6.2832;
          // 将强弱与透明度结合
          alpha *= strength;
          material.alpha=alpha;

          material.diffuse=vec3(st.s,st.t,1.0);
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
    return 'RadarMaterialProperty' + this.typeNum
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
    return other instanceof RadarMaterialProperty && this.name === other.name
  }
}

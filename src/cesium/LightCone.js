import * as Cesium from 'cesium'
import gsap from 'gsap'

export class LightCone {
  constructor(viewer) {
    this.params = {
      height: 700,
      degree: 0,
    }
    this.initModel(viewer)
    this.model = null
    this.modelMatrix = null
  }
  async initModel(viewer) {
    //设置模型位置矩阵
    this.modelMatrix = Cesium.Transforms.headingPitchRollToFixedFrame(
      Cesium.Cartesian3.fromDegrees(
        113.3191,
        23.109,
        this.params.height //高度
      ),
      //模型旋转情况
      new Cesium.HeadingPitchRoll(this.params.degree, 0, 0)
    )
    this.model = await Cesium.Model.fromGltfAsync({
      url: './model/pyramid.glb',
      show: true,
      scale: 200,
      minimumPixelSize: 10,
      maximumPixelSize: 20000,
      allowPicking: false,
      debugShowBoundingVolume: false,
      debugWireframe: false,
      color: Cesium.Color.YELLOW.withAlpha(0.5),
      //设置颜色的混合模式
      colorBlendMode: Cesium.ColorBlendMode.MIX,
      modelMatrix: this.modelMatrix,
    })
    viewer.scene.primitives.add(this.model)
    this.animate()
  }
  animate() {
    gsap.to(this.params, {
      height: 800,
      degree: Math.PI,
      yoyo: true,
      repeat: -1,
      duration: 1,
      ease: 'power1.inOut',
      onUpdate: () => {
        this.model.modelMatrix = Cesium.Transforms.headingPitchRollToFixedFrame(
          Cesium.Cartesian3.fromDegrees(
            113.3191,
            23.109,
            this.params.height //高度
          ),
          //模型旋转情况
          new Cesium.HeadingPitchRoll(this.params.degree, 0, 0)
        )
      },
    })
  }
}

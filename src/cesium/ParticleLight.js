import * as Cesium from 'cesium'
export class ParticleLight {
  constructor(viewer, color = Cesium.Color.WHITE) {
    this.boxEntity = viewer.entities.add({
      name: 'box',
      position: Cesium.Cartesian3.fromDegrees(113.3191, 23.109, 200.0),
      box: {
        dimensions: new Cesium.Cartesian3(100.0, 100.0, 500.0),
        material: Cesium.Color.CHOCOLATE.withAlpha(0.01),
      },
    })
    const particleSystem = new Cesium.ParticleSystem({
      image: '/texture/smoke.png',
      // imageSize: new Cesium.Cartesian2(30, 30),
      minimumImageSize: new Cesium.Cartesian2(10, 10),
      maximumImageSize: new Cesium.Cartesian2(30, 30),

      //粒子数量

      startScale: 0.1,
      endScale: 4.0,
      speed: 1.0,
      startColor: color,
      endColor: Cesium.Color.PINK.withAlpha(1),
      // emitter: new Cesium.ConeEmitter(Cesium.Math.toRadians(1160.0)),
      emitter: new Cesium.BoxEmitter(new Cesium.Cartesian3(100, 100, 500)),
      emissionRate: 1.0,
      lifetime: 10.0,
      modelMatrix: this.boxEntity.computeModelMatrix(viewer.clock.currentTime, new Cesium.Matrix4()),
    })
    viewer.scene.primitives.add(particleSystem)
  }
}

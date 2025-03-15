import * as Cesium from 'cesium'
export const modifyBuilding = async viewer => {
  //添加3d建筑
  const tiles3d = await Cesium.createOsmBuildingsAsync()
  viewer.scene.primitives.add(tiles3d)
  tiles3d.show = true
  tiles3d.style = new Cesium.Cesium3DTileStyle({
    // show: "${feature['name']} !== '广州塔'",
  })

  const customShader = new Cesium.CustomShader({
    fragmentShaderText: `
    void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
      float strength =fsInput.attributes.positionMC.z/200.0;
       material.diffuse = vec3(strength,0.28*strength,strength/1.0);
    //czm_frameNumber获取当前帧数
       float time =fract(czm_frameNumber/(60.0*10.0));
      //  实现往返操作
      time=abs(time-0.5)*2.0;
      float diff = abs(clamp(fsInput.attributes.positionMC.z/500.0,0.0,1.0)-time);
      diff=step(0.01,diff);
      material.diffuse+=vec3(0.5)*(1.0-diff);
    }
    `,
  })
  tiles3d.customShader = customShader
}

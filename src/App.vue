<style scoped>
#earth {
  width: 100vw;
  height: 100vh;
  position: relative;
}
#popup {
  /* transform-origin: left bottom 0; */
  position: absolute;
  /* top: 0; */
  left: 0;
  z-index: 2;
  width: 200px;
  height: 200px;
}
.btn {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 2;
  padding: 5px 10px;
  background-color: #007aff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.btn2 {
  position: absolute;
  top: 10px;
  left: 110px;
  z-index: 2;
  padding: 5px 10px;
  background-color: #007aff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.btn3 {
  position: absolute;
  top: 10px;
  left: 210px;
  z-index: 2;
  padding: 5px 10px;
  background-color: #007aff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>

<template>

  <div id="earth">
    <div id="popup"></div>
    <button @click="loadModel" class="btn">加载模型</button>
    <button @click="selectModel" class="btn2">模型选择</button>
    <button @click="moveModel" class="btn3">移动模型</button>
  </div>

</template>

<script setup>
import * as Cesium from 'cesium'
import { onMounted } from 'vue';
import CesiumTool from './CesiumTool.js'
import PopUp from './PopUp.vue'
import {h} from 'vue'
let cesiumTool, viewer
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlNjE3ODRmNC00MGUzLTRiZjUtOTBjMC1iOGFhNjc3Mzc4ZTIiLCJpZCI6MjEyMjA3LCJpYXQiOjE3MTQ0NDk0NzZ9.kEVmlDS3buD33-zPcN-_5wsS-YmFkfbULki0UbBR3_k'
onMounted(() => {
  viewer = new Cesium.Viewer('earth')
  cesiumTool = new CesiumTool(viewer)
  const osm = new Cesium.OpenStreetMapImageryProvider({
    url : 'https://tile.openstreetmap.org/'
  });
  viewer.imageryLayers.addImageryProvider(osm);
  const directionLight = new Cesium.DirectionalLight({
    direction: viewer.scene.camera.directionWC,
    intensity: 3
  })
  viewer.scene.light = directionLight
})
function loadModel() {
  cesiumTool.add3DTileset({url: "./model/淮安水文地质模型.json"})
}
function selectModel() {
  viewer.screenSpaceEventHandler.setInputAction(function onLeftClick(event) {
    // const screenPosition = Cesium.SceneTransforms.wgs84ToWindowCoordinates(viewer.scene, positionOnEllipsoid)
    // const screenPosition = viewer.scene.cartesianToCanvasCoordinates(new Cesium.Cartesian3(event.position.x, event.position.y, 0))
    // debugger
    const pickedFeature = viewer.scene.pick(event.position)
    cesiumTool.highlightFeature(pickedFeature)
    cesiumTool.addPopUp(pickedFeature, '#popup', PopUp, event.position)
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
}
function moveModel() {
  viewer.screenSpaceEventHandler.setInputAction(function onLeftDown(event) {
    cesiumTool.leftDownAction(event)
  }, Cesium.ScreenSpaceEventType.LEFT_DOWN)
  viewer.screenSpaceEventHandler.setInputAction(function onMouseMove(event) {
    cesiumTool.mouseMoveAction(event)
  }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
  viewer.screenSpaceEventHandler.setInputAction(function onLeftUp(event) {
    cesiumTool.leftUpAction(event)
  }, Cesium.ScreenSpaceEventType.LEFT_UP)
}
</script>

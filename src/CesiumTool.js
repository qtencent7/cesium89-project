import * as Cesium from 'cesium'
import { createApp } from 'vue'
class CesiumTool {
    constructor(viewer, hightlightColor) {
        this.viewer = viewer;
        this.hightLighted = { feautre: undefined, originalColor: hightlightColor ||new Cesium.Color() }
        this.leftDownFlag = undefined
        this.pointDraged = undefined
    }

    add3DTileset(options) {
        const model = new Cesium.Cesium3DTileset(options)
        model.colorBlendMode = 1
        this.viewer.scene.primitives.add(model);
        this.viewer.flyTo(model)
    }

    highlightFeature(feature) {
        if (Cesium.defined(this.hightLighted.feature)) {
            this.hightLighted.feature.color = this.hightLighted.originalColor;
            this.hightLighted.feature = undefined;
        }
        if (!Cesium.defined(feature)) {
            return;
        }
        this.hightLighted.feature = feature;
        Cesium.Color.clone(
            feature.color,
            this.hightLighted.originalColor
        );
        feature.color = Cesium.Color.RED
    }
    addPopUp(feature, selector, component, position) {
        const viewer = this.viewer;
        const popup = document.querySelector(selector);
        this.viewer.cesiumWidget.container.appendChild(popup);
        createApp(component).mount(selector);
        viewer.cesiumWidget.container.appendChild(popup);
        var screenPosition = new Cesium.Cartesian2(position.x, position.y)
        var ray = viewer.camera.getPickRay(screenPosition);
        var intersection = viewer.scene.globe.pick(ray, viewer.scene);
        var cartographic = Cesium.Ellipsoid.WGS84.cartesianToCartographic(intersection);

        // 将经纬度转换为度
        var longitude = Cesium.Math.toDegrees(cartographic.longitude);
        var latitude = Cesium.Math.toDegrees(cartographic.latitude);

        viewer.scene.postRender.addEventListener(() => {
            let windowCoord = Cesium.SceneTransforms.wgs84ToWindowCoordinates(
                viewer.scene,
                Cesium.Cartesian3.fromDegrees(...[longitude, latitude], 0)
            )
            let scale = 1 - Math.floor(viewer.camera.positionCartographic.height / 100000) / 10
            if (scale  < 0)
                scale = 0
            else if (scale > 1)
                scale = 1
            popup.style.left = windowCoord.x + "px";
            popup.style.bottom = document.body.offsetHeight - windowCoord.y + "px";
            popup.style.transform = `scale(${scale}, ${scale})`
        })
    }

    leftDownAction(event) {
        this.pointDraged = this.viewer.scene.pick(event.position);//选取当前的entity
        this.leftDownFlag = true;
        if (this.pointDraged) {
          this.viewer.scene.screenSpaceCameraController.enableRotate = false;//锁定相机
        }
    }
    mouseMoveAction(event) {
        if (this.leftDownFlag && this.pointDraged) {
            // debugger
            this.pointDraged.tileset._modelMatrix = cartesian;
            const center = this.pointDraged.tileset.boundingSphere.center
            const cartographic = Cesium.Cartographic.fromCartesian(center)
            //此处根据具体entity来处理，也可能是pointDraged.id.position=cartesian;
        }
    }
    leftUpAction() {
        this.leftDownFlag = false;
        this.pointDraged = null;
        this.viewer.scene.screenSpaceCameraController.enableRotate = true;//解锁相机
    }
}

export default CesiumTool;
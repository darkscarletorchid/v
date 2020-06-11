import AFRAME from 'aframe/dist/aframe-v1.0.4';
import './rotate-by-controller-3dof.js';
import './zoom-by-controller-3dof.js';
import './rotate-by-controller-6dof.js';
import './zoom-by-controller-6dof.js';
AFRAME.registerComponent('scene-config', {

    init: function () {

        this.camera = this.el.camera;
        this.controllerRight = document.getElementById("controllerRight");
        this.controllerLeft = document.getElementById("controllerLeft");
        this.parentRig = document.getElementById("parentRig");

        this.is3DoF = AFRAME.utils.device.isMobileVR();
        this.is6DoF = !AFRAME.utils.device.isMobileVR() && AFRAME.utils.device.checkHeadsetConnected();

        //set up positions for parent rig
        var cameraPos = this.camera.parent.position;
        this.OBJECTSPOS_3DOF = {x: 0, y: cameraPos.y, z: -0.7};
        this.OBJECTSPOS_6DOF = {x: 0, y: cameraPos.y, z: -0.7};

        // //set up components to controllers
        if (this.is3DoF) {
            this.parentRig.setAttribute("position", this.OBJECTSPOS_3DOF)
            this.controllerRight.setAttribute("rotate-by-controller-3dof", {target:"#parentRig", radius: 100});
            this.controllerRight.setAttribute("zoom-by-controller-3dof", {target:"#parentRig", nearLimit: 0.5});
        } else if (this.is6DoF) {
            this.parentRig.setAttribute("position", this.OBJECTSPOS_6DOF)
             this.controllerRight.setAttribute("rotate-by-controller-6dof", {target:"#parentRig"});
             this.controllerRight.setAttribute("zoom-by-controller-3dof", {target:"#parentRig"});
         }
        //else {
        //     throw new Error("Not supported headset type");
        // }
    }
});
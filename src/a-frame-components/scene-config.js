import AFRAME from 'aframe';

AFRAME.registerComponent('scene-config', {

    init: function () {

        this.camera = document.getElementById("camera");
        this.controllerRight = document.getElementById("controllerRight");
        this.controllerLeft = document.getElementById("controllerLeft");
        this.parentRig = document.getElementById("parentRig");

        this.is3DoF = AFRAME.utils.device.isMobile();
        this.is6DoF = AFRAME.utils.device.checkHeadsetConnected();

        //set up positions for parent rig
        this.OBJECTSPOS_3DOF = "0 1.675 -0.7";
        this.OBJECTSPOS_6DOF = "0 0 0";

        // //set up components to controllers
        if (this.is3DoF) {
            this.controllerRight.setAttribute("rotate-by-controller-3dof", {target:"#parentRig"});
            this.controllerRight.setAttribute("zoom-by-controller-3dof", {target:"#parentRig"});
        } //else if (this.is6DoF) {
        //     this.controllerRight.setAttribute("rotate-by-controller-6dof", {target:"#parentRig"});
        //     this.controllerRight.setAttribute("zoom-by-controller-3dof", {target:"#parentRig"});
        // }else {
        //     throw new Error("Not supported headset type");
        // }
    }
});
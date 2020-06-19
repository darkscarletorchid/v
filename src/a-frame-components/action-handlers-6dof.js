/* eslint-disable */ 
import AFRAME from 'aframe/dist/aframe-v1.0.4';

AFRAME.registerComponent("action-handlers-6dof", {

    schema: {
    },

    init: function () {
        this.el.isGrabbedBy = [];

        this.onGrabStart = this.onGrabStart.bind(this);
        this.onGrabEnd = this.onGrabEnd.bind(this);
    },

    play: function () {
        const el = this.el;
        el.addEventListener('grabStart', this.onGrabStart);
        el.addEventListener('grabEnd', this.onGrabEnd);

    },

    pause: function () {
        const el = this.el;
        el.removeEventListener('grabStart', this.onGrabStart);
        el.removeEventListener('grabEnd', this.onGrabEnd);
    },

    onGrabStart: function(e) {
        var detail = e.detail;

        if (this.el.isGrabbedBy.filter(function(controller) {
            return controller.id === detail.ctrl.id;
        }).length > 0) {return;}

        this.el.isGrabbedBy.push(detail.ctrl);
    },

    onGrabEnd: function(e) {

        var detail = e.detail;

        if (!this.el.isGrabbedBy.length) { return; }



        if (this.el.isGrabbedBy.filter(function(controller) {
            return controller.id === detail.ctrl.id;
        }).length > 0) {
            this.el.isGrabbedBy = this.el.isGrabbedBy.filter(function(el) {
               return el.id !== detail.ctrl.id;
            });
        } else {
            return;
        }
    },

    tick: function() {
        if ((this.el.isGrabbedBy.length === 0)) {
            this.ACTION = "NONE";
            //nothing to do, no object grabbed
            return;
        }
        else if (this.el.isGrabbedBy.length === 1) {
            this.ACTION = "PANROTATE";

            var controllerPos =  new THREE.Vector3();
            this.el.isGrabbedBy[0].object3D.getWorldPosition(controllerPos);
            var controllerRot = new THREE.Quaternion();
            this.el.isGrabbedBy[0].object3D.getWorldQuaternion(controllerRot);

            if (!this.prevPos  && !this.prevRot) {
                this.prevPos = controllerPos.clone();
                this.prevRot = controllerRot.clone();

                return;
            }

            //TODO calculate rotation and position delta 
            var posDelta = controllerPos.clone().sub(this.prevPos.clone());

            var objWorldPos = new THREE.Vector3();
            this.el.object3D.getWorldPosition(objWorldPos);

            var finalPos = objWorldPos.clone().add(posDelta.clone())

            this.el.object3D.position.set(finalPos.x, finalPos.y, finalPos.z);

            this.prevPos = controllerPos.clone();
            this.prevRot = controllerRot.clone();

        } else if (this.el.isGrabbedBy.length === 2) {
            this.ACTION = "ZOOM";
            var d = this.el.isGrabbedBy[0].object3D.position.distanceTo( this.el.isGrabbedBy[1].object3D.position );

            if (!this.prevDist) {
                this.prevDist = d;
            }

            var delta = d - this.prevDist;

            if (Math.abs(delta) > 0.00075) {
                var scale = this.el.object3D.scale.clone();

                if (delta < 0) {
                    scale.add(new THREE.Vector3(-0.00005, -0.00005, -0.00005));
                } else if (delta > 0) {
                    scale.add(new THREE.Vector3(0.00005, 0.00005, 0.00005));
                }
                this.el.object3D.scale.set(scale.x, scale.y, scale.z);
            }
            this.prevDist = d;
        }
    }
});
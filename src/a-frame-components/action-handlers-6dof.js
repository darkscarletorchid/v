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

        // if (this.el.isGrabbedBy.includes(detail.ctrl.id)) {return; }
        
        this.el.isGrabbedBy.push(detail.ctrl);
        

        //if holded by 1 controller = attach
        if (this.el.isGrabbedBy.length === 1 && this.el.isGrabbedBy[0].id === detail.ctrl.id) {
        //TODO correctly transform 
            this.el.object3D.position.set(0, 0, -0.1);

            detail.ctrl.object3D.add(this.el.object3D);
        }
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

        if (!this.el.isGrabbedBy.length )
        {
            this.el.sceneEl.object3D.add(this.el.object3D);

            //TODO correctly transform back to world coordinates preserving rotation and position of objects
            this.el.object3D.position.set(0, 1.6, -0.7);
        } else 
        { 
            //attach to different contrtollers
             this.el.object3D.position.set(0, 0, -0.1);

             this.el.isGrabbedBy[0].object3D.add(this.el.object3D);
        }
    },

    tick: function() {
        if ((this.el.isGrabbedBy.length === 0)) {
            //nothing to do, no object grabbed
            return;
        }
        else if (this.el.isGrabbedBy.length === 1) {
            //just grabbing - rotating and moving along controller
            return;
        } else if (this.el.isGrabbedBy.length === 2) {
            
            var d = this.el.isGrabbedBy[0].object3D.position.distanceTo( this.el.isGrabbedBy[1].object3D.position );

            if (!this.prevDist) {
                this.prevDist = d;
            }

            var delta = d - this.prevDist;

            var scale = this.el.object3D.scale.clone();

            if (delta < 0) {
                scale.add(new THREE.Vector3(-0.0001, -0.0001, -0.0001));
            } else if (delta > 0) {
                scale.add(new THREE.Vector3(0.0001, 0.0001, 0.0001));
            }
            this.el.object3D.scale.set(scale.x, scale.y, scale.z);

            this.prevDist = d;
        }
    }
});
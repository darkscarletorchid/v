/* eslint-disable */ 
import AFRAME from 'aframe/dist/aframe-v1.0.4';

AFRAME.registerComponent('rotate-by-controller-6dof', {

    schema: {
        target: { type: 'selector' }
    },

    init: function () {
        var self = this;
        var el = this.el;
        
        //TODO count based on default front camera
        var defaultRotation = new THREE.Vector3(-90, 0, 0);

        var parentRig = this.data.target.object3D;
        parentRig.rotation.set(defaultRotation.x, defaultRotation.y, defaultRotation.z);

        el.addEventListener('triggerdown', function (e) {
            self.triggerPressed = true;
            el.object3D.add(parentRig);
        });

        el.addEventListener('triggerup', function (e) {
            self.triggerPressed = false;

            el.sceneEl.object3D.add(parentRig);
        });

        el.addEventListener('touchpadup', function (e) {
            //default rotation
            setTimeout(function () {
                parentRig.rotation.set(defaultRotation.x, defaultRotation.y, defaultRotation.z);
            }, 50);
        });
    }
});
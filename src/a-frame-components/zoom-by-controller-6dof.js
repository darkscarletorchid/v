/* eslint-disable */ 
import AFRAME from 'aframe/dist/aframe-v1.0.4';

AFRAME.registerComponent('zoom-by-controller-6dof', {
    schema: {
        target: { type: 'selector' },
        nearLimit: { type: 'number' }
    },

    init: function () {
        var self = this;
        var el = this.el;
        var parentRig = this.data.target.object3D;

        el.addEventListener('buttondown', function (e) {
            self.buttonPressed = true;
        });

        el.addEventListener('buttonup', function (e) {

            setTimeout(function () {
                self.buttonPressed = false;                
            }, 100);
        });


        el.addEventListener('touchpadup', function (e) {
            //default
            setTimeout(function () {
                self.scale = undefined;
                parentRig.scale.set(self.defaultScale, self.defaultScale, self.defaultScale);
            }, 50);

        });


        el.addEventListener('axismove', function (e) {

            //discard touchpad tracking when touchpad and trigger are pressed
            if (self.buttonPressed) {
                return;
            }

            //discard default when touching ended
            if (e.detail.axis[0] === 0 && e.detail.axis[1] === 0) {
                self.prev = undefined;
                self.scale = undefined;
                return;
            }

            if (!self.prev) {
                self.prev = e.detail.axis[1];
            }

            var delta = self.prev - e.detail.axis[1];
            var scale = parentRig.scale.clone();

            if (delta < 0) {
                scale.add(new THREE.Vector3(-0.0001, -0.0001, -0.0001));
            } else if (delta > 0) {
                scale.add(new THREE.Vector3(0.0001, 0.0001, 0.0001));
            }

            if (scale.x < (self.defaultScale / 4) || scale.x > (self.defaultScale * 10)) {
                return;
            }

            self.scale = scale.clone();
            self.prev = e.detail.axis[1];
        });
    },

    tick: function () {
        if (!this.el.sceneEl.is('vr-mode') || this.buttonPressed)
            return;

        var parentRig = this.data.target.object3D;

        if (this.scale) {
            parentRig.scale.set(this.scale.x, this.scale.y, this.scale.z);
        }
    },

    update: function() {
        if (this.data.nearLimit) {
            this.defaultScale = 0.3 / this.data.nearLimit * 0.001;
            this.data.target.object3D.scale.set(this.defaultScale, this.defaultScale, this.defaultScale);
        }
    }
});
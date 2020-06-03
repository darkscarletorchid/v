

AFRAME.registerComponent('rotate-by-controller-3dof', {

    schema: {
        target: { type: 'selector' },
        radius: { type: 'number' }
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
        });

        el.addEventListener('triggerup', function (e) {
            self.triggerPressed = false;
            self.prevPosition = undefined;
            self.isCircleMode = null;
        });

        el.addEventListener('trackpadup', function (e) {
            //default rotation
            setTimeout(function () {
                parentRig.rotation.set(defaultRotation.x, defaultRotation.y, defaultRotation.z);
            }, 50);
        });
    },

    tick: function () {
        if (!this.el.sceneEl.is('vr-mode'))
            return;

        var ray = this.el.getAttribute("line");
        if (!ray)
            return;

        var objCenter = this.data.target.object3D.position;

        var matrix = this.el.object3D.matrixWorld;
        var lStart = new THREE.Vector3(ray.start.x, ray.start.y, ray.start.z);
        var lEnd = new THREE.Vector3(ray.end.x, ray.end.y, ray.end.z);
        lStart.applyMatrix4(matrix);
        lEnd.applyMatrix4(matrix);
        var line = new THREE.Line3(lStart, lEnd);

        var constant = -objCenter.z;
        var normal = new THREE.Vector3(0, 0, 1);
        var direction = line.delta(new THREE.Vector3());
        var denominator = normal.dot(direction);
        var t = -(line.start.dot(normal) + constant) / denominator;
        var point = direction.clone().multiplyScalar(t).add(line.start);

        if (!this.circle1) {
            var geometry1 = new THREE.CircleGeometry(0.0025, 32);
            var material1 = new THREE.MeshBasicMaterial({ color: 0x000000, depthTest: false });
            this.circle1 = new THREE.Mesh(geometry1, material1);
            this.circle1.renderOrder = 10;
            this.el.sceneEl.object3D.add(this.circle1);
        }
        if (!this.circle2) {
            var geometry2 = new THREE.CircleGeometry(0.002, 32);
            var material2 = new THREE.MeshBasicMaterial({ color: 0xffffff, depthTest: false });
            this.circle2 = new THREE.Mesh(geometry2, material2);
            this.circle2.renderOrder = 20;
            this.el.sceneEl.object3D.add(this.circle2);
        }

        this.circle1.position.set(point.x, point.y, point.z);
        this.circle2.position.set(point.x, point.y, point.z);

        var d = point.distanceTo(objCenter);
        var radius = this.data.radius * this.data.target.object3D.scale.x * 1000;

        if (!this.triggerPressed) {
            if (d > radius)
                this.circle2.material.color.setHex(0xbbbbbb);
            else
                this.circle2.material.color.setHex(0xffffff);
        }
        else {
            this.circle2.material.color.setHex(0x0000ff);
            if (this.prevPosition) {
                var isSet = false;
                var quaternion = new THREE.Quaternion();
                if (this.isCircleMode) {
                    // Rotation around Z axis
                    var center = objCenter;
                    var begPosition = new THREE.Vector3().subVectors(this.prevPosition, center);
                    var endPosition = new THREE.Vector3().subVectors(point, center);
                    var angle = Math.acos(begPosition.dot(endPosition) / begPosition.length() / endPosition.length());
                    if (angle) {
                        var axis = (new THREE.Vector3()).crossVectors(begPosition, endPosition).normalize();
                        quaternion.setFromAxisAngle(axis, angle);
                        isSet = true;
                    }
                }
                if (!isSet) {
                    // Rotations around X and Y axes
                    var factor = 10;
                    var yRot = point.x - this.prevPosition.x;
                    var xRot = point.y - this.prevPosition.y;
                    quaternion.multiplyQuaternions(
                        new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), yRot * factor),
                        new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), -xRot * factor));
                }

                this.data.target.object3D.applyQuaternion(quaternion);
            } else {
                this.isCircleMode = d > radius;
            }

            this.prevPosition = point;
        }
    }
});
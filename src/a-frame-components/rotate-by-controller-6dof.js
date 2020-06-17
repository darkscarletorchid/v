/* eslint-disable */ 
import AFRAME from 'aframe/dist/aframe-v1.0.4';

AFRAME.registerComponent('rotate-by-controller-6dof', {

    schema: {
        target: { type: 'selector' }
    },

    init: function () {
        var self = this;
        var el = this.el;
        
        this.GRABBED_STATE = 'grabbed';


        this.grabbing = false;
        this.hitEl = null;

        this.onHit = this.onHit.bind(this);
        this.onTriggerDown = this.onTriggerDown.bind(this);
        this.onTriggerUp = this.onTriggerUp.bind(this);

        //TODO count based on default front camera
        // var defaultRotation = new THREE.Vector3(-90, 0, 0);

        this.parentRig = this.data.target.object3D;
        // parentRig.rotation.set(defaultRotation.x, defaultRotation.y, defaultRotation.z);
    },

    play: function () {
        const el = this.el;
        el.addEventListener('hit', this.onHit);
        el.addEventListener('triggerdown', this.onTriggerDown);
        el.addEventListener('triggerup', this.onTriggerUp);
      },

    pause: function () {
        const el = this.el;
        el.removeEventListener('hit', this.onHit);
        el.removeEventListener('triggerdown', this.onGripClose);
        el.removeEventListener('triggerup', this.onGripOpen);
    },

    onTriggerDown: function() {
        this.grabbing = true;
    },

    onTriggerUp: function () {
        const hitEl = this.hitEl;
        this.grabbing = false;
        if (!hitEl) { return; }
        hitEl.removeState(this.GRABBED_STATE);
        this.hitEl = undefined;

        var objects = this.parentRig.children;

        objects.forEach(element => {
            element.matrix =  element.prevMatrix;
        });

        this.el.sceneEl.object3D.add(this.parentRig);
        this.parentRig.position.set(0, 1.6, -0.7);
        this.parentRig.scale.set(0.001, 0.001, 0.001);
      },

    onHit: function(evt) {
        const hitEl = evt.detail.el;
        //todo add grabbed state on parent rig
        if (!hitEl || hitEl.is(this.GRABBED_STATE) || !this.grabbing || this.hitEl) { return; }
        hitEl.addState(this.GRABBED_STATE);
        this.hitEl = hitEl;

        console.log(this.hitEl);
        
        var objects = this.parentRig.children;

        objects.forEach(element => {
            element.prevMatrix = element.matrix;
            element.applyMatrix(new THREE.Matrix4().getInverse(element.matrix))
        });
        this.parentRig.position.set(0, 0.1, 0);
        this.parentRig.scale.set(0.1, 0.1, 0.1);

        this.el.object3D.add(this.parentRig);
    }
});
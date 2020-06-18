/* eslint-disable */ 
import AFRAME from 'aframe/dist/aframe-v1.0.4';

AFRAME.registerComponent('rotate-by-controller-6dof', {

    schema: {
        target: { type: 'selector' }
    },

    init: function () {
        this.GRABBED_STATE = 'grabbed';


        this.grabbing = false;

        this.onHit = this.onHit.bind(this);
        this.onTriggerDown = this.onTriggerDown.bind(this);
        this.onTriggerUp = this.onTriggerUp.bind(this);

        this.parentRig = this.data.target.object3D;        
        this.parentRig.actionState = {};
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

    onTriggerDown: function(e) {
        this.grabbing = true;
    },

    onTriggerUp: function () {
        this.grabbing = false;

        if (this.parentRig.actionState.action !== this.GRABBED_STATE || this.parentRig.actionState.controllerId !== this.el.id ) { return; }
        
        this.parentRig.actionState.action = undefined;
        this.parentRig.actionState.controllerId = undefined;

        this.el.sceneEl.object3D.add(this.parentRig);
        //TODO correctly transform back to world coordinates preserving rotation and position of objects
        this.parentRig.position.set(0, 1.6, -0.7);
      },

    onHit: function(evt) {
        const hitEl = evt.detail.el;
        if (!hitEl ||
            this.parentRig.actionState.action === this.GRABBED_STATE || !this.grabbing) { return; }
        
        this.parentRig.actionState = {action: this.GRABBED_STATE, controllerId: this.el.id};
        
        //TODO correctly transform 
        this.parentRig.position.set(0, 0, -0.1);

        this.el.object3D.add(this.parentRig);
    }
});
/* eslint-disable */ 
import AFRAME from 'aframe/dist/aframe-v1.0.4';

AFRAME.registerComponent('rotate-by-controller-6dof', {

    schema: {
        target: { type: 'selector' }
    },

    init: function () {

        this.grabbing = false;

        this.onHit = this.onHit.bind(this);
        this.onTriggerDown = this.onTriggerDown.bind(this);
        this.onTriggerUp = this.onTriggerUp.bind(this);

        this.parentRig = this.data.target;        
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

        //fire grabEnd
        this.parentRig.emit("grabEnd", {ctrl: this.el});
      },

    onHit: function(evt) {
        const hitEl = evt.detail.el;

        if (!hitEl || !this.grabbing) { return; }

        //fire grabStart
        this.parentRig.emit("grabStart", {ctrl: this.el});
    }
});
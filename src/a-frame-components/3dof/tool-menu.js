/* eslint-disable */ 
import AFRAME from 'aframe/dist/aframe-v1.0.4';

AFRAME.registerComponent("tool-menu", {

    init: function() {

        this.ROTATION = "rotate";
        this.PANNING = "pan";
        this.ZOOMING = "zoom";
        
        this.STATES = [this.ROTATION, this.PANNING, this.ZOOMING];

        this.STATECOUNTER = 0;

        this.onTouchpadDown = this.onTouchpadDown.bind(this);
        this.onTouchpadUp = this.onTouchpadUp.bind(this);
    },

    play: function() {
        const el = this.el;
        el.addEventListener('touchpaddown', this.onTouchpadDown);
        el.addEventListener('touchpadup', this.onTouchpadUp);
    },

    pause: function() {
        const el = this.el;
        el.removeEventListener('touchpaddown', this.onTouchpadDown);
        el.removeEventListener('touchpadup', this.onTouchpadUp);
    },

    onTouchpadDown: function() {
        
    },

    onTouchpadUp: function() {
        const eventNameEnd = this.STATES[this.STATECOUNTER] + "End";
        this.emit(eventNameEnd);
        
        this.STATECOUNTER = this.STATECOUNTER >= this.STATES.length ? 0 : this.STATECOUNTER + 1;
        var eventNameStart = this.STATES[this.STATECOUNTER] + "Start";
        this.emit(eventNameStart);
    }

});
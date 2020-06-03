import React from 'react';
import sky from './surgeonRoom.jpg';

import './App.css';
import 'aframe';
import './a-frame-components/scene-config.js';

function App() {
  return (
    <div className="App">
      <a-scene id="vrScene" vr-mode-ui="enabled: true" scene-config>
        <a-assets>
          <img id="sky" src={sky}></img>
        </a-assets>
        <a-sky src="#sky" rotation="0 -90 0"></a-sky>
        <a-entity id="lights" >
          <a-entity light="type: ambient; color: #FFF; intensity: 0.4"></a-entity>
          <a-entity light="type: directional; color: #FFF; intensity: 0.4" position="-0.5 1 1"></a-entity>
        </a-entity>
        <a-entity id="cameraRig" position="0 0 0">
            <a-camera look-controls="enabled:false" wasd-controls="enabled:false" id="camera">
            </a-camera>
            <a-entity id="controllerRight" laser-controls="model:true;hand:right" raycaster="showLine: true; far:0.1; objects: .raycastable">
            </a-entity>
            <a-entity id="controllerLeft" laser-controls="model:true;hand:left" raycaster="far:0"></a-entity>
        </a-entity>

        <a-entity id="parentRig" rotation="-90 0 0" scale="0.001 0.001 0.001">

        </a-entity>

        <a-box position="-1 0.5 -3" rotation="0 45 0" color="#4CC3D9" shadow></a-box>
        <a-sphere position="0 1.25 -5" radius="1.25" color="#EF2D5E" shadow></a-sphere>
        <a-cylinder position="1 0.75 -3" radius="0.5" height="1.5" color="#FFC65D" shadow></a-cylinder>
        <a-plane position="0 0 -4" rotation="-90 0 0" width="4" height="4" color="#7BC8A4" shadow></a-plane>
      </a-scene>
    </div>
  );
}

export default App;

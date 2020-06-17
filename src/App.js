import React from 'react';
import sky from './surgeonRoom.jpg';

import './App.css';
import 'aframe/dist/aframe-v1.0.4';
import './a-frame-components/scene-config.js';
import 'aframe-extras';
import 'aframe-physics-system/dist/aframe-physics-system';

function App() {
  return (
    <div className="App">
      <a-scene id="vrScene" vr-mode-ui="enabled: true" scene-config>
        <a id="myEnterVRButton" href="#" style={{height: "100px", display: "block"}}></a>
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
            <a-entity id="controllerRight" sphere-collider="objects: .models"></a-entity>
            <a-entity id="controllerLeft" sphere-collider></a-entity>
        </a-entity>

        <a-entity id="parentRig" rotation="-90 0 0" scale="0.001 0.001 0.001">
          <a-box class="models" position="0 0 0" rotation="0 0 0" color="#4CC3D9" scale="100 100 100" shadow></a-box>
          <a-sphere class="models" position="-100 0 0" radius="1" color="#EF2D5E" scale="100 100 100" shadow></a-sphere>
        </a-entity>

        {/* <a-box position="-1 0.5 -3" rotation="0 45 0" color="#4CC3D9" shadow></a-box>
        <a-sphere position="0 1.25 -5" radius="1.25" color="#EF2D5E" shadow></a-sphere>
        <a-cylinder position="1 0.75 -3" radius="0.5" height="1.5" color="#FFC65D" shadow></a-cylinder>
        <a-plane position="0 0 -4" rotation="-90 0 0" width="4" height="4" color="#7BC8A4" shadow></a-plane> */}
      </a-scene>
    </div>
  );
}

export default App;

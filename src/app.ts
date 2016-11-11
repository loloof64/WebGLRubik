/// <reference path="../typings/index.d.ts" />
import * as THREE from 'three';
import {addCubesToScene, addWholeRubikGroupToScene, rotateWholeCube} from './cube';

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild( renderer.domElement );

addCubesToScene(scene);
addWholeRubikGroupToScene(scene);

camera.position.z = 5;
renderer.setClearColor (0xcc6600, 1);

let cubeRotationAxis = new THREE.Vector3(0, 1, 0);

function render(){
    requestAnimationFrame(render);
    renderer.render(scene, camera);

    rotateWholeCube({axis: cubeRotationAxis, angleRad: Math.PI / 120});
}

render();
/// <reference path="../typings/index.d.ts" />
import * as THREE from 'three';

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);

let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild( renderer.domElement );

let geometry = new THREE.BoxGeometry( 1, 1, 1 );
let material = new THREE.MeshBasicMaterial( {color: 0x00FF00} );
let cube = new THREE.Mesh( geometry, material );
scene.add(cube);
camera.position.z = 5;
renderer.setClearColor (0xcc6600, 1);

function render(){
    requestAnimationFrame(render);
    renderer.render(scene, camera);

    cube.rotation.x += 0.1;
    cube.rotation.y += 0.1;
}

render();
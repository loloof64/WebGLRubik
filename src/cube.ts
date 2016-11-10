/// <reference path="../typings/index.d.ts" />
import * as THREE from 'three';

export function buildLittleCube(){
    let blue = 0x0000FF;
    let green = 0x00FF00;
    let red = 0xFF0000;
    let orange = 0xFF3300;
    let yellow = 0xFFFF00;
    let white = 0xFFFFFF;

    let geometry = new THREE.BoxGeometry( 1, 1, 1 );
    let material = new THREE.MultiMaterial([
        new THREE.MeshBasicMaterial({color: blue}),
        new THREE.MeshBasicMaterial({color: green}),
        new THREE.MeshBasicMaterial({color: white}),
        new THREE.MeshBasicMaterial({color: yellow}),
        new THREE.MeshBasicMaterial({color: orange}),
        new THREE.MeshBasicMaterial({color: red}),
    ]);
    let cube = new THREE.Mesh( geometry, material );

    return cube;
}
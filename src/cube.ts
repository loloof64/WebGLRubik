/// <reference path="../typings/index.d.ts" />
import * as THREE from 'three';

interface CubeRemovedColors {
    blue?: boolean;
    green?: boolean;
    white?: boolean;
    yellow?: boolean;
    orange?: boolean;
    red?: boolean;
}

export function buildLittleCube(removedColors?: CubeRemovedColors){
    let colorsToRemove = removedColors || {};

    let blue = colorsToRemove['blue'] ?  0 : 0x0000FF;
    let green = colorsToRemove['green'] ?  0 : 0x00FF00;
    let red = colorsToRemove['red'] ?  0 : 0xFF0000;
    let orange = colorsToRemove['orange'] ?  0 : 0xFF3300;
    let yellow = colorsToRemove['yellow'] ?  0 : 0xFFFF00;
    let white = colorsToRemove['white'] ?  0 : 0xFFFFFF;

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
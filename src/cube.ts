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

interface Position {
    x?: number;
    y?: number;
    z?: number;
}

interface Rotation {
    axis: THREE.Vector3;
    angleRad: number;
}

function buildLittleCube(position: Position, removedColors?: CubeRemovedColors){
    let colorsToRemove = removedColors || {};

    let x = position.x || 0.0;
    let y = position.y || 0.0;
    let z = position.z || 0.0;

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

    cube.position.x = x;
    cube.position.y = y;
    cube.position.z = z;

    return cube;
}

let rubik_cubes_bottom_back = [
    buildLittleCube({x: -1.07, y: -1.07, z: -1.07}, {blue : true, orange: true, white: true}),
    buildLittleCube({x: 0, y: -1.07, z: -1.07}, {blue : true, orange: true, white: true, green: true}),
    buildLittleCube({x: 1.07, y: -1.07, z: -1.07}, {orange: true, white: true, green: true})
];

let rubik_cubes_bottom_middle = [
    buildLittleCube({x: -1.07, y: -1.07, z: 0}, {blue : true, orange: true, white: true, red: true}),
    buildLittleCube({x: 0, y: -1.07, z: 0}, {blue : true, orange: true, white: true, green: true, red: true}),
    buildLittleCube({x: 1.07, y: -1.07, z: 0}, {orange: true, white: true, green: true, red: true})
];

let rubik_cubes_bottom_front = [
    buildLittleCube({x: -1.07, y: -1.07, z: 1.07}, {blue : true, white: true, red: true}),
    buildLittleCube({x: 0, y: -1.07, z: 1.07}, {blue : true, white: true, green: true, red: true}),
    buildLittleCube({x: 1.07, y: -1.07, z: 1.07}, {white: true, green: true, red: true})
];

let rubik_cubes_middle_back = [
    buildLittleCube({x: -1.07, y: 0, z: -1.07}, {blue : true, orange: true, white: true, yellow: true}),
    buildLittleCube({x: 0, y: 0, z: -1.07}, {blue : true, orange: true, white: true, green: true, yellow: true}),
    buildLittleCube({x: 1.07, y: 0, z: -1.07}, {orange: true, white: true, green: true, yellow: true})
];

let rubik_cubes_middle_middle = [
    buildLittleCube({x: -1.07, y: 0, z: 0}, {blue : true, orange: true, white: true, red: true, yellow: true}),
    buildLittleCube({x: 0, y: 0, z: 0}, {blue : true, orange: true, white: true, green: true, red: true, yellow: true}),
    buildLittleCube({x: 1.07, y: 0, z: 0}, {orange: true, white: true, green: true, red: true, yellow: true})
];

let rubik_cubes_middle_front = [
    buildLittleCube({x: -1.07, y: 0, z: 1.07}, {blue : true, white: true, red: true, yellow: true}),
    buildLittleCube({x: 0, y: 0, z: 1.07}, {blue : true, white: true, green: true, red: true, yellow: true}),
    buildLittleCube({x: 1.07, y: 0, z: 1.07}, {white: true, green: true, red: true, yellow: true})
];

let rubik_cubes_top_back = [
    buildLittleCube({x: -1.07, y: 1.07, z: -1.07}, {blue : true, orange: true, yellow: true}),
    buildLittleCube({x: 0, y: 1.07, z: -1.07}, {blue : true, orange: true, green: true, yellow: true}),
    buildLittleCube({x: 1.07, y: 1.07, z: -1.07}, {orange: true, green: true, yellow: true})
];

let rubik_cubes_top_middle = [
    buildLittleCube({x: -1.07, y: 1.07, z: 0}, {blue : true, orange: true, red: true, yellow: true}),
    buildLittleCube({x: 0, y: 1.07, z: 0}, {blue : true, orange: true, green: true, red: true, yellow: true}),
    buildLittleCube({x: 1.07, y: 1.07, z: 0}, {orange: true, green: true, red: true, yellow: true})
];

let rubik_cubes_top_front = [
    buildLittleCube({x: -1.07, y: 1.07, z: 1.07}, {blue : true, red: true, yellow: true}),
    buildLittleCube({x: 0, y: 1.07, z: 1.07}, {blue : true, green: true, red: true, yellow: true}),
    buildLittleCube({x: 1.07, y: 1.07, z: 1.07}, {green: true, red: true, yellow: true})
];

let rubik_cubes_cubes = [
    [rubik_cubes_bottom_back, rubik_cubes_bottom_middle, rubik_cubes_bottom_front],
    [rubik_cubes_middle_back, rubik_cubes_middle_middle, rubik_cubes_middle_front],
    [rubik_cubes_top_back, rubik_cubes_top_middle, rubik_cubes_top_front]
];

let wholeRubik = new THREE.Object3D();

export function addWholeRubikGroupToScene(scene: THREE.Scene){
    for (let layer of rubik_cubes_cubes){
        for (let stick of layer){
            for (let cube of stick){
                wholeRubik.add(cube);
            }
        }
    }
    scene.add(wholeRubik);
}

export function addCubesToScene(scene: THREE.Scene){
    for (let layer of rubik_cubes_cubes){
        for (let stick of layer){
            for (let cube of stick){
                scene.add(cube);
            }
        }
    }
}

export function rotateWholeCube(rotation: Rotation){
    wholeRubik.rotateOnAxis(rotation.axis, rotation.angleRad);
}
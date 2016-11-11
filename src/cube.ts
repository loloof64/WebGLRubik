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

export class RubikCube {
    constructor(scene: THREE.Scene){
        this.scene = scene;
        this.addCubesToScene();
    }

    rotateWholeCube(rotation: Rotation){
        /* Safe as three.js only add a child once.
           Here we need to be sure that the wanted children belongs to the good group.
        */
        this.addWholeRubikGroupToScene();
        this.wholeRubik.rotateOnAxis(rotation.axis, rotation.angleRad);
    }

    rotateLeftLayer(angleRad: number){
        /* Safe as three.js only add a child once.
           Here we need to be sure that the wanted children belongs to the good group.
        */
        this.addLeftLayerToScene();
        this.leftLayer.rotateOnAxis(new THREE.Vector3(1, 0, 0), angleRad);
    }

    rotateLeftRightBetweenLayer(angleRad: number){
        /* Safe as three.js only add a child once.
           Here we need to be sure that the wanted children belongs to the good group.
        */
        this.addLeftRightBetweenLayerToScene();
        this.leftRightBetweenLayer.rotateOnAxis(new THREE.Vector3(1, 0, 0), angleRad);
    }

    rotateRightLayer(angleRad: number){
        /* Safe as three.js only add a child once.
           Here we need to be sure that the wanted children belongs to the good group.
        */
        this.addRightLayerToScene();
        this.rightLayer.rotateOnAxis(new THREE.Vector3(1, 0, 0), angleRad);
    }

    rotateFrontLayer(angleRad: number){
        /* Safe as three.js only add a child once.
           Here we need to be sure that the wanted children belongs to the good group.
        */
        this.addFrontLayerToScene();
        this.frontLayer.rotateOnAxis(new THREE.Vector3(0, 0, 1), angleRad);
    }

    rotateFrontBackBetweenLayer(angleRad: number){
        /* Safe as three.js only add a child once.
           Here we need to be sure that the wanted children belongs to the good group.
        */
        this.addFrontBackBetweenLayerToScene();
        this.frontBackBetweenLayer.rotateOnAxis(new THREE.Vector3(0, 0, 1), angleRad);
    }

    rotateBackLayer(angleRad: number){
        /* Safe as three.js only add a child once.
           Here we need to be sure that the wanted children belongs to the good group.
        */
        this.addBackLayerToScene();
        this.backLayer.rotateOnAxis(new THREE.Vector3(0, 0, 1), angleRad);
    }

    rotateTopLayer(angleRad: number){
        /* Safe as three.js only add a child once.
           Here we need to be sure that the wanted children belongs to the good group.
        */
        this.addTopLayerToScene();
        this.topLayer.rotateOnAxis(new THREE.Vector3(0, 1, 0), angleRad);
    }

    rotateTopBottomBetweenLayer(angleRad: number){
        /* Safe as three.js only add a child once.
           Here we need to be sure that the wanted children belongs to the good group.
        */
        this.addTopBottomBetweenLayerToScene();
        this.topBottomBetweenLayer.rotateOnAxis(new THREE.Vector3(0, 1, 0), angleRad);
    }

    rotateBottomLayer(angleRad: number){
        /* Safe as three.js only add a child once.
           Here we need to be sure that the wanted children belongs to the good group.
        */
        this.addBottomLayerToScene();
        this.bottomLayer.rotateOnAxis(new THREE.Vector3(0, 1, 0), angleRad);
    }

    private scene: THREE.Scene;

    private buildLittleCube(position: Position, removedColors?: CubeRemovedColors){
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

    private rubik_cubes_bottom_back = [
        this.buildLittleCube({x: -1.07, y: -1.07, z: -1.07}, {blue : true, orange: true, white: true}),
        this.buildLittleCube({x: 0, y: -1.07, z: -1.07}, {blue : true, orange: true, white: true, green: true}),
        this.buildLittleCube({x: 1.07, y: -1.07, z: -1.07}, {orange: true, white: true, green: true})
    ];

    private rubik_cubes_bottom_middle = [
        this.buildLittleCube({x: -1.07, y: -1.07, z: 0}, {blue : true, orange: true, white: true, red: true}),
        this.buildLittleCube({x: 0, y: -1.07, z: 0}, {blue : true, orange: true, white: true, green: true, red: true}),
        this.buildLittleCube({x: 1.07, y: -1.07, z: 0}, {orange: true, white: true, green: true, red: true})
    ];

    private rubik_cubes_bottom_front = [
        this.buildLittleCube({x: -1.07, y: -1.07, z: 1.07}, {blue : true, white: true, red: true}),
        this.buildLittleCube({x: 0, y: -1.07, z: 1.07}, {blue : true, white: true, green: true, red: true}),
        this.buildLittleCube({x: 1.07, y: -1.07, z: 1.07}, {white: true, green: true, red: true})
    ];

    private rubik_cubes_middle_back = [
        this.buildLittleCube({x: -1.07, y: 0, z: -1.07}, {blue : true, orange: true, white: true, yellow: true}),
        this.buildLittleCube({x: 0, y: 0, z: -1.07}, {blue : true, orange: true, white: true, green: true, yellow: true}),
        this.buildLittleCube({x: 1.07, y: 0, z: -1.07}, {orange: true, white: true, green: true, yellow: true})
    ];

    private rubik_cubes_middle_middle = [
        this.buildLittleCube({x: -1.07, y: 0, z: 0}, {blue : true, orange: true, white: true, red: true, yellow: true}),
        this.buildLittleCube({x: 0, y: 0, z: 0}, {blue : true, orange: true, white: true, green: true, red: true, yellow: true}),
        this.buildLittleCube({x: 1.07, y: 0, z: 0}, {orange: true, white: true, green: true, red: true, yellow: true})
    ];

    private rubik_cubes_middle_front = [
        this.buildLittleCube({x: -1.07, y: 0, z: 1.07}, {blue : true, white: true, red: true, yellow: true}),
        this.buildLittleCube({x: 0, y: 0, z: 1.07}, {blue : true, white: true, green: true, red: true, yellow: true}),
        this.buildLittleCube({x: 1.07, y: 0, z: 1.07}, {white: true, green: true, red: true, yellow: true})
    ];

    private rubik_cubes_top_back = [
        this.buildLittleCube({x: -1.07, y: 1.07, z: -1.07}, {blue : true, orange: true, yellow: true}),
        this.buildLittleCube({x: 0, y: 1.07, z: -1.07}, {blue : true, orange: true, green: true, yellow: true}),
        this.buildLittleCube({x: 1.07, y: 1.07, z: -1.07}, {orange: true, green: true, yellow: true})
    ];

    private rubik_cubes_top_middle = [
        this.buildLittleCube({x: -1.07, y: 1.07, z: 0}, {blue : true, orange: true, red: true, yellow: true}),
        this.buildLittleCube({x: 0, y: 1.07, z: 0}, {blue : true, orange: true, green: true, red: true, yellow: true}),
        this.buildLittleCube({x: 1.07, y: 1.07, z: 0}, {orange: true, green: true, red: true, yellow: true})
    ];

    private rubik_cubes_top_front = [
        this.buildLittleCube({x: -1.07, y: 1.07, z: 1.07}, {blue : true, red: true, yellow: true}),
        this.buildLittleCube({x: 0, y: 1.07, z: 1.07}, {blue : true, green: true, red: true, yellow: true}),
        this.buildLittleCube({x: 1.07, y: 1.07, z: 1.07}, {green: true, red: true, yellow: true})
    ];

    private rubik_cubes_cubes = [
        [this.rubik_cubes_bottom_back, this.rubik_cubes_bottom_middle, this.rubik_cubes_bottom_front],
        [this.rubik_cubes_middle_back, this.rubik_cubes_middle_middle, this.rubik_cubes_middle_front],
        [this.rubik_cubes_top_back, this.rubik_cubes_top_middle, this.rubik_cubes_top_front]
    ];

    private wholeRubik = new THREE.Object3D();
    private leftLayer = new THREE.Object3D();
    private leftRightBetweenLayer = new THREE.Object3D();
    private rightLayer = new THREE.Object3D();
    private frontLayer = new THREE.Object3D();
    private frontBackBetweenLayer = new THREE.Object3D();
    private backLayer = new THREE.Object3D();
    private topLayer = new THREE.Object3D();
    private topBottomBetweenLayer = new THREE.Object3D();
    private bottomLayer = new THREE.Object3D();

    private addCubesToScene(){
        for (let layer of this.rubik_cubes_cubes){
            for (let stick of layer){
                for (let cube of stick){
                    this.scene.add(cube);
                }
            }
        }
    }

    private addWholeRubikGroupToScene(){
        for (let layer of this.rubik_cubes_cubes){
            for (let stick of layer){
                for (let cube of stick){
                    this.wholeRubik.add(cube);
                }
            }
        }
        this.scene.add(this.wholeRubik);
    }

    private addLeftLayerToScene(){
        for (let layer of this.rubik_cubes_cubes){
            this.leftLayer.add(layer[0][0]);
            this.leftLayer.add(layer[1][0]);
            this.leftLayer.add(layer[2][0]);
        }
        this.scene.add(this.leftLayer);
    }

    private addLeftRightBetweenLayerToScene(){
        for (let layer of this.rubik_cubes_cubes){
            this.leftRightBetweenLayer.add(layer[0][1]);
            this.leftRightBetweenLayer.add(layer[1][1]);
            this.leftRightBetweenLayer.add(layer[2][1]);
        }
        this.scene.add(this.leftRightBetweenLayer);
    }

    private addRightLayerToScene(){
        for (let layer of this.rubik_cubes_cubes){
            this.rightLayer.add(layer[0][2]);
            this.rightLayer.add(layer[1][2]);
            this.rightLayer.add(layer[2][2]);
        }
        this.scene.add(this.rightLayer);
    }

    private addFrontLayerToScene(){
        for (let layer of this.rubik_cubes_cubes){
            this.frontLayer.add(layer[2][0]);
            this.frontLayer.add(layer[2][1]);
            this.frontLayer.add(layer[2][2]);
        }
        this.scene.add(this.frontLayer);
    }

    private addFrontBackBetweenLayerToScene(){
        for (let layer of this.rubik_cubes_cubes){
            this.frontBackBetweenLayer.add(layer[1][0]);
            this.frontBackBetweenLayer.add(layer[1][1]);
            this.frontBackBetweenLayer.add(layer[1][2]);
        }
        this.scene.add(this.frontBackBetweenLayer);
    }

    private addBackLayerToScene(){
        for (let layer of this.rubik_cubes_cubes){
            this.backLayer.add(layer[0][0]);
            this.backLayer.add(layer[0][1]);
            this.backLayer.add(layer[0][2]);
        }
        this.scene.add(this.backLayer);
    }

    private addTopLayerToScene(){
        for (let row of [0, 1, 2]){
            for (let column of [0, 1, 2]){
                this.topLayer.add(this.rubik_cubes_cubes[2][row][column]);
            }
        }
        this.scene.add(this.topLayer);
    }

    private addTopBottomBetweenLayerToScene(){
        for (let row of [0, 1, 2]){
            for (let column of [0, 1, 2]){
                this.topBottomBetweenLayer.add(this.rubik_cubes_cubes[1][row][column]);
            }
        }
        this.scene.add(this.topBottomBetweenLayer);
    }

    private addBottomLayerToScene(){
        for (let row of [0, 1, 2]){
            for (let column of [0, 1, 2]){
                this.bottomLayer.add(this.rubik_cubes_cubes[0][row][column]);
            }
        }
        this.scene.add(this.bottomLayer);
    }

}
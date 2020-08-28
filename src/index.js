import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import {FlyControls} from 'three/examples/jsm/controls/FlyControls.js'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'

class Game {
    constructor() {
        this.renderer = new THREE.WebGLRenderer();
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        //new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); OrthographicCamera
        // this.camera.lookAt(new THREE.Vector3(-20, -20, -50));
        this.camera.position.setZ(50)
        this.camera.setSize(20, 20)
        this.controls = new FlyControls( this.camera, document.body );
        this.loader = new THREE.TextureLoader();
        this.light = new THREE.AmbientLight(0x404040);
        this.objLoader = new GLTFLoader();
        this.main()
    }

    main() {
        const bgTexture = this.loader.load('../textures/sky2.jpg');
        this.scene.background = bgTexture;
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
        this.scene.add(this.light);
        // this.camera.position.z = 5;


        const color = 0xFFFFFF;
        const intensity = 2;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-1, 2, 4);
        this.scene.add(light);

        this.objLoader.load('../models/scene.glb', (gltf) => {
            this.scene.add(gltf.scene);
        }, undefined, function (error) {
            console.error(error);
        });
    }


}

const game = new Game()

function animate() {
    game.controls.update(0.5);
    requestAnimationFrame(animate);
    game.renderer.render(game.scene, game.camera);
}

animate()

import * as THREE from 'three';

export default class CrazyScene {
  constructor() {
    this.cubes = [];
    this.switchLookAtEveryMilliseconds = 900;

    this.clock = new THREE.Clock(true);
    this.scene = new THREE.Scene();

    this.mainCamera = new AnimatedLookAtCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );

    this.setupRenderer();
    this.initializeAutomaticLookAt();

    this.startRender = this.startRender.bind(this);
  }

  setupRenderer() {
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( this.renderer.domElement );
  }

  initializeAutomaticLookAt() {
    this.lookAtID = 0;
    this.switchLookAtID(this.lookAtID, this.switchLookAtEveryMilliseconds);
  }

  switchLookAtID(lookAtID, timing) {
    if (this.cubes.length > 0) {
      this.lookAtID = lookAtID % this.cubes.length;
      this.mainCamera.setLookAt(this.cubes[this.lookAtID].getCubeMesh().position);
    }
    window.setTimeout(
      () => {
        this.switchLookAtID(++this.lookAtID, timing);
      },
      timing);
  }

  addCube(position, size) {
    const cube = new Cube(position, size);
    this.cubes.push(cube);
    this.scene.add( cube.getCubeMesh() );
  }

  animate() {
    this.cubes.map(cube => cube.animate());
    this.mainCamera.animate();

    const elapsedTime = this.clock.getElapsedTime();
  }

  startRender() {
  	requestAnimationFrame( this.startRender );
    this.animate();
  	this.renderer.render( this.scene, this.mainCamera.getCamera() );
  }
}

class AnimatedLookAtCamera {
  constructor( fov, aspect, near, far ) {
    this.camera =  new THREE.PerspectiveCamera( fov, aspect, near, far );

    // initialize to look forward
    this.targetLookAt = new THREE.Vector3(0, 0, 1);
    this.currentLookAt = new THREE.Vector3(0, 0, 1);

    this.clock = new THREE.Clock(true);
  }

  getCamera() {
    return this.camera;
  }

  setLookAt(position) {
    this.targetLookAt = position;
  }

  animate() {
    const delta = this.clock.getDelta();
    this.currentLookAt.lerp(this.targetLookAt, delta);
    this.camera.lookAt(this.currentLookAt);
  }
}

class Cube {
  constructor(position, size) {
    this.cube;
    this.velocity = Math.random() * 0.1;

    const _size = size ? size : 1;

    const geometry = new THREE.BoxGeometry( _size, _size, _size );
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    this.cube = new THREE.Mesh( geometry, material );
    if (position) {
      this.cube.position.copy(position);
    }
  }

  getCubeMesh() {
    return this.cube;
  }

  animate() {
    this.cube.rotation.x += this.velocity;
    this.cube.rotation.y += this.velocity;
  }
}

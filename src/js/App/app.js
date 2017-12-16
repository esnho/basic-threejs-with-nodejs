import * as THREE from 'three';

export default class App {
  constructor() {
    this.cubes = []
    this.frameCount = 0;
    this.cubeLookAtIndex = 0;
    this.animationFrequency = 120;

    this.scene = new THREE.Scene();
    this.mainCamera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 100 );
    this.mainCamera.position.z = 5;

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( this.renderer.domElement );

    this.startRender = this.startRender.bind(this);
  }

  addCube(position, size) {
    const cube = new Cube(position, size);
    this.cubes.push(cube);
    this.scene.add( cube.getCubeMesh() );
  }

  animate() {
    this.cubes.map(cube => cube.animate());
    const animationFrequency = this.animationFrequency;
    const animationRithm = (this.frameCount % animationFrequency);
    const alpha = animationRithm / animationFrequency;
    this.computeNewLookAt(alpha);

    if (animationRithm == animationFrequency - 1 ) {
      this.cubeLookAtIndex += 1;
      if (this.cubeLookAtIndex > this.cubes.length -2) {
        this.cubeLookAtIndex = 0;
      }
    }

    this.frameCount++;
  }

  computeNewLookAt(alpha) {
    const secondCube = this.cubes[this.cubeLookAtIndex + 1].getCubeMesh().position;
    // need to copy the vector otherwise it maintains the reference
    let firstCubePos = new THREE.Vector3(0, 0, 0);
    firstCubePos.copy(this.cubes[this.cubeLookAtIndex].getCubeMesh().position);
    const newLookAt = firstCubePos.lerp(secondCube, alpha);
    this.mainCamera.lookAt(newLookAt);
  }

  startRender() {
  	requestAnimationFrame( this.startRender );
    this.animate();
  	this.renderer.render( this.scene, this.mainCamera );
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

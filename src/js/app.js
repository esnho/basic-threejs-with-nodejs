import * as THREE from 'three';

export default class App {
  constructor() {
    this.scene = new THREE.Scene();
    this.mainCamera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 100 );
    this.mainCamera.position.z = 5;

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( this.renderer.domElement );

    this.startRender = this.startRender.bind(this);
  }

  addCube() {
    let geometry = new THREE.BoxGeometry( 1, 1, 1 );
    let material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    this.cube = new THREE.Mesh( geometry, material );
    this.scene.add( this.cube );
  }

  animateCube() {
    this.cube.rotation.x += 0.1;
    this.cube.rotation.y += 0.1;
  }

  startRender() {
  	requestAnimationFrame( this.startRender );
    this.animateCube();
  	this.renderer.render( this.scene, this.mainCamera );
  }
}

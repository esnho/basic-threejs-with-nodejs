import * as THREE from 'three';

function init() {
  var scene = new THREE.Scene();

  var box = getBox(1, 1, 1);
  var plane = getPlane(4);

  box.position.y = box.geometry.parameters.height*0.5;
  plane.rotation.x = Math.PI*0.5;
  console.log(box);

  scene.add(box);
  scene.add(plane);

  var camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth/window.innerHeight,
    1,
    1000
  );

  camera.position.x = -5;
  camera.position.y = 2;
  camera.position.z = 5;

  camera.lookAt(box.position);

  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild( renderer.domElement );
  renderer.render(scene, camera);

  return scene;
}


function getPlane(size) {
  var geometry = new THREE.PlaneGeometry(size, size);

  var color = new THREE.Color();
  color.setRGB(1, 0, 0);

  var material = new THREE.MeshBasicMaterial({
    color: color,//0x00ff00
    side: THREE.DoubleSide
  });

  var mesh = new THREE.Mesh(
    geometry,
    material
  );

  return mesh;
}

function getBox(w, h, d) {
  var geometry = new THREE.BoxGeometry(w, h, d);

  var color = new THREE.Color();
  color.setRGB(1, 1, 0);

  var material = new THREE.MeshBasicMaterial({
    color: color//0x00ff00
  });

  var mesh = new THREE.Mesh(
    geometry,
    material
  );

  return mesh;
}

window.scene = init();

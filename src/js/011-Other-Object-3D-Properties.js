import * as THREE from 'three';

function init() {
  var scene = new THREE.Scene();

  var box = getBox(1, 1, 1);
  var bordo1 = getBox(1, 0.1, 0.1, 0);
  bordo1.position.y = 0.5;
  bordo1.position.z = -0.5;
  box.add(bordo1);
  var plane = getPlane(4);

  plane.name = 'plane-1';

  box.position.y = box.geometry.parameters.height*0.5;
  plane.rotation.x = Math.PI*0.5;

  plane.add(box);

  plane.position.y = 1;
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
  update(renderer, scene, camera);

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

function getBox(w, h, d, r = 1, g = 1, b = 0) {
  var geometry = new THREE.BoxGeometry(w, h, d);

  var color = new THREE.Color();
  color.setRGB(r, g, b);

  var material = new THREE.MeshBasicMaterial({
    color: color//0x00ff00
  });

  var mesh = new THREE.Mesh(
    geometry,
    material
  );

  return mesh;
}

function update(renderer, scene, camera) {

  var plane = scene.getObjectByName('plane-1');
  plane.rotation.y += 0.001;
  plane.rotation.z += 0.001;

  scene.traverse(function(child) {
    child.scale.x += 0.0001;
  });

  renderer.render(scene, camera);
  requestAnimationFrame(function() {
    update(renderer, scene, camera);
  });
}

window.scene = init();

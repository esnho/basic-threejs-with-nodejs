import * as THREE from 'three';
import dat from 'dat.gui'; // added this import
// https://github.com/dataarts/dat.gui/blob/master/API.md

function init() {
  var scene = new THREE.Scene();
  var gui = new dat.GUI(); // initialize the GUI

  var fogColor = new THREE.Color();
  fogColor.setRGB(0.15, 0.15, 0.15);

  var enableFog = false;
  if (enableFog) {
    scene.fog = new THREE.FogExp2(fogColor, 0.1);
  }

  var box = getBox(1, 1, 1);
  var bordo1 = getBox(1, 0.1, 0.1, 0);
  var plane = getPlane(20);
  var pointLight = getPointLight(1);
  var sphere = getSphere(0.05);

  pointLight.name = 'pLight';

  gui.add(pointLight, 'intensity', 0, 10);
  var ctrlLightPosY = gui.add(pointLight.position, 'y', 0, 5);
  ctrlLightPosY.setValue(2);

  bordo1.position.y = 0.5;
  bordo1.position.z = -0.5;
  box.add(bordo1);

  pointLight.add(sphere);

  plane.name = 'plane-1';

  box.position.y = box.geometry.parameters.height*0.5;
  plane.rotation.x = Math.PI*0.5;


  pointLight.position.y = 2;

  scene.add(box);
  scene.add(plane);
  scene.add(pointLight);

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
  renderer.setClearColor(fogColor);
  document.body.appendChild( renderer.domElement );
  update(renderer, scene, camera);

  return scene;
}


function getPlane(size) {
  var geometry = new THREE.PlaneGeometry(size, size);

  var color = new THREE.Color();
  color.setRGB(0.75, 0.75, 0.75);

  var material = new THREE.MeshPhongMaterial({
    color: color,//0x00ff00
    side: THREE.DoubleSide
  });

  var mesh = new THREE.Mesh(
    geometry,
    material
  );

  return mesh;
}

function getPointLight(intensity) {

  var color = new THREE.Color();
  color.setRGB(1, 1, 1);
  var light = new THREE.PointLight(color, intensity);

  return light;
}

function getBox(w, h, d, r = 1, g = 1, b = 0) {
  var geometry = new THREE.BoxGeometry(w, h, d);

  var color = new THREE.Color();
  color.setRGB(r, g, b);

  var material = new THREE.MeshPhongMaterial({
    color: color//0x00ff00
  });

  var mesh = new THREE.Mesh(
    geometry,
    material
  );

  return mesh;
}

function getSphere(size, r = 1, g = 1, b = 1) {
  var geometry = new THREE.SphereGeometry(size, 24, 24);

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

  /*var plane = scene.getObjectByName('plane-1');
  plane.rotation.y += 0.001;
  plane.rotation.z += 0.001;

  scene.traverse(function(child) {
    child.scale.x += 0.0001;
  });*/

  renderer.render(scene, camera);
  requestAnimationFrame(function() {
    update(renderer, scene, camera);
  });
}

window.scene = init();

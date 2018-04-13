import * as THREE from 'three';
import dat from 'dat.gui';
var OrbitControls = require('three-orbit-controls')(THREE);

var velocity = {value:0};

function init() {
  var scene = new THREE.Scene();
  var gui = new dat.GUI();

  var fogColor = new THREE.Color();
  fogColor.setRGB(0.15, 0.15, 0.15);

  var enableFog = false;
  if (enableFog) {
    scene.fog = new THREE.FogExp2(fogColor, 0.1);
  }

  //var box = getBox(1, 1, 1);
//  var bordo1 = getBox(1, 0.1, 0.1, 0);
  var plane = getPlane(20);
  var directionalLight = getDirectionalLight(1);
  var sphere = getSphere(0.05);
  var boxGrid = getBoxGrid(10, 2);
  var helper = new THREE.CameraHelper(directionalLight.shadow.camera);

  boxGrid.name = "boxer";
  directionalLight.name = 'pLight';
  plane.name = 'plane-1';

  //bordo1.position.y = 0.5;
  //bordo1.position.z = -0.5;
  //box.add(bordo1);
  //box.name = "boxone";

  directionalLight.add(sphere);


  //box.position.y = box.geometry.parameters.height*0.5;
  plane.rotation.x = Math.PI*0.5;

  directionalLight.position.y = 4;


  //scene.add(box);
  scene.add(plane);
  scene.add(directionalLight);
  scene.add(boxGrid);
  //scene.add(helper);

  var camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth/window.innerHeight,
    1,
    500
  );

  camera.position.x = -5;
  camera.position.y = 2;
  camera.position.z = 5;

  camera.lookAt(plane.position);

  var clearColor = new THREE.Color();
  clearColor.setRGB(1, 0, 0.75);

  var renderer = new THREE.WebGLRenderer();
  renderer.shadowMap.enabled = true;
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(fogColor);
  document.body.appendChild( renderer.domElement );

  var controls = new OrbitControls(camera);

  update(renderer, scene, camera, controls);

  //gui.add(spotLight, 'intensity', 0, 10);
  gui.add(directionalLight.position, 'x', -20, 20);
  gui.add(directionalLight.position, 'y', 0, 20);
  gui.add(directionalLight.position, 'z', -20, 20);
  //gui.add(spotLight, 'penumbra', 0, 1);
  //gui.add(directionalLight.shadow, 'bias', 0, 0.01);
  //gui.add(velocity, 'value', -100, 100).listen();
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

  mesh.receiveShadow = true;

  return mesh;
}

function getBoxGrid(amount, separationMultiplier) {
	var group = new THREE.Group();

	for (var i=0; i<amount; i++) {
		var obj = getBox(1, 1, 1);
		obj.position.x = i * separationMultiplier;
		obj.position.y = obj.geometry.parameters.height/2;
		group.add(obj);
		for (var j=1; j<amount; j++) {
			var obj = getBox(1, 1, 1);
			obj.position.x = i * separationMultiplier;
			obj.position.y = obj.geometry.parameters.height/2;
			obj.position.z = j * separationMultiplier;
			group.add(obj);
		}
	}

	group.position.x = -(separationMultiplier * (amount-1))/2;
	group.position.z = -(separationMultiplier * (amount-1))/2;

	return group;
}

function getPointLight(intensity) {

  var color = new THREE.Color();
  color.setRGB(1, 1, 1);
  var light = new THREE.PointLight(color, intensity);
  light.castShadow = true;

  return light;
}

function getSpotLight(intensity) {

  var color = new THREE.Color();
  color.setRGB(1, 1, 1);
  var light = new THREE.SpotLight(color, intensity);
  light.castShadow = true;

  light.shadowBias = 0.0001;
  light.shadow.mapSize.width = 2048;
  light.shadow.mapSize.height = 2048;

  return light;
}

function getDirectionalLight(intensity) {

  var color = new THREE.Color();
  color.setRGB(1, 1, 1);
  var light = new THREE.DirectionalLight(color, intensity);
  light.castShadow = true;

  var lightSize = 15;
  light.shadow.camera.left = -lightSize;
  light.shadow.camera.right = lightSize;
  light.shadow.camera.top = lightSize;
  light.shadow.camera.bottom = -lightSize;

  var shadowMapSize = 4096;
  light.shadowBias = 0.00001;
  light.shadow.mapSize.width = shadowMapSize;
  light.shadow.mapSize.height = shadowMapSize;

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
  mesh.castShadow = true;
  mesh.receiveShadow = true;

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
  mesh.castShadow = true;

  return mesh;
}

function update(renderer, scene, camera, controls) {

  /*var plane = scene.getObjectByName('plane-1');
  plane.rotation.y = plane.rotation.y + 0.001 * velocity.value;
  plane.rotation.z = plane.rotation.z + 0.001 * velocity.value;*/
  var boxgrid = scene.getObjectByName('boxer');
  controls.update();
/*
  boxgrid.traverse(function(child) {
    child.rotation.y += 0.001 * velocity.value;
      child.rotation.z += 0.001 * velocity.value;
        child.scale.z += 0.001 * velocity.value;
        child.scale.z = Math.sin(child.scale.z)*3;
        child.scale.y = Math.sin(child.scale.z)*3;
  });*/

  renderer.render(scene, camera);
  requestAnimationFrame(function() {
    update(renderer, scene, camera, controls);
  });
}

window.scene = init();
window.velocity = velocity;

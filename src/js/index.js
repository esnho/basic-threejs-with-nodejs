import * as THREE from 'three';
import App from './app.js';
require('../css/style.css');

const app = new App();

app.addCube();
app.startRender();

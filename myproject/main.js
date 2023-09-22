import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


// Scene - Container
const scene = new THREE.Scene();

// Camera - view point
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Renderer - render the scene
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});


renderer.outputEncoding  = THREE.sRGBEncoding;

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

// renderer.render(Scene, camera);


// Objects - Geometry
const geometry = new THREE.TorusKnotGeometry(10, 3, 16, 100);
const material = new THREE.MeshLambertMaterial( { color: 0x00ff00 });
const torus = new THREE.Mesh(geometry, material);


scene.add(torus);

// Point light (directional)
const pointLight = new THREE.DirectionalLight(0xffffff, 1);
pointLight.position.set(-1,1,3);

// Point light (directional)
const fillLight = new THREE.DirectionalLight(0xffffff, 0.5);
fillLight.position.set(1,1,3);

// Point light (directional)
const backLight = new THREE.DirectionalLight(0xffffff, 0.5);
backLight.position.set(-1,3,-1);

// Ambient Light - everwhere
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(backLight, fillLight, pointLight, ambientLight);


// Light helpers show wireframes of lights
const lightHelper = new THREE.PointLightHelper(pointLight);
// Grid helpers show grid
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);


// Orbit controls to move
const controls = new OrbitControls(camera, renderer.domElement);



// Add random stars
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial( { color: 0xffffff } );
  const star = new THREE.Mesh( geometry, material );

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);


// const spaceTexture = new THREE.TextureLoader().load('space.jpg');
// scene.background = spaceTexture;




// "Game" loop
function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  controls.update();

  renderer.render(scene, camera);
}

animate();





// Avatar

const coleTexture = new THREE.TextureLoader().load('cole001.jpg');

const cole = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial( { map: coleTexture } )
);

scene.add(cole);
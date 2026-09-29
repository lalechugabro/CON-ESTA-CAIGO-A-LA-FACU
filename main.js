import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color('#000000');

scene.fog = new THREE.Fog(
    0x000000,
    8,
    15
);

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(-0.3, 3, 9);

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;
document.body.appendChild(renderer.domElement);




const loader = new GLTFLoader();
loader.load(
  './assets/ferrari2.glb' ,
(gltf) => {
  const modelo = gltf.scene;
  modelo.traverse(
    (child)=>{
      if(child.isMesh){
        child.castShadow = true;
        child.receiveShadow = false;
        console.log(child.name);
        if(child.name === 'body'){
          child.material.color.set('#0025B0');
          child.material.roughness = 0.2;
          child.material.metalness = 0.7;
        }
        if(child.name === 'leather'){
          child.material.color.set('#0E0014');
        }
        if(child.name === 'glass'){
          child.material.color.set('#ffffff');
          child.material.roughness = 0.2;
          child.material.metalness = 0.7;

        }
                if(child.name === 'tire'){
          child.material.color.set('#000000');
          child.material.roughness = 1;

        }
                        if(child.name === 'tire.001'){
          child.material.color.set('#000000');
          child.material.roughness = 1;

        }
                        if(child.name === 'tire.002'){
          child.material.color.set('#000000');
          child.material.roughness = 1;

        }
                        if(child.name === 'tire.003'){
          child.material.color.set('#000000');
          child.material.roughness = 1;

        }
        
      }
    }

  );

  scene.add(modelo);
});
const piso = new THREE.PlaneGeometry( 50, 50 );
const pisomat = new THREE.MeshStandardMaterial({
  color: 0xBDFFE7
});
const pisoo = new THREE.Mesh(piso, pisomat);
pisoo.rotation.x = -Math.PI /2;
scene.add(pisoo);
pisoo.receiveShadow = true;
pisoo.castShadow = true;

//  luces
const luzprincipal = new THREE.DirectionalLight( 0xFFFFFF, 3 );
luzprincipal.position.set(-5,8,3);
luzprincipal.castShadow = true;
luzprincipal.shadow.mapSize.set(2048, 2048);
luzprincipal.shadow.radius = 8;
scene.add( luzprincipal );

//const luzsuave = new THREE.HemisphereLight( 0xBDC7FF, 0x01001F, 1 );
//scene.add( luzsuave );




const controls = new OrbitControls(camera,renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.target.set(0,0.7, 0);
controls.minDistance = 5;
controls.maxDistance = 8;

controls.maxPolarAngle = Math.PI / 2;

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render( scene,  camera);
}
animate();
import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Scene, DirectionalLight, PerspectiveCamera, WebGLRenderer, Group, SphereGeometry, MeshStandardMaterial, MeshBasicMaterial, TextureLoader, Mesh } from 'three';

const scene = new Scene();
const canvasContainer = document.querySelector('canvas');
const light = new DirectionalLight(0xffffff, 1.6);
const camera = new PerspectiveCamera(45, canvasContainer.offsetWidth / canvasContainer.offsetHeight, 0.1, 1000);
const renderer = new WebGLRenderer({
    antialias: true,
    canvas: document.querySelector('canvas')
});

// const controls = new OrbitControls(camera, renderer.domElement);
const group = new Group();

light.position.set(150, 0, 80);
camera.position.z = 36;
group.position.set(-15, 2, -5);

const cameraMove = () => {
    const top = document.body.getBoundingClientRect().top;
    camera.position.x = top * +0.005;
    camera.position.y = top * -0.005;
    camera.position.z = 36 + top * 0.003;
}

document.body.onscroll = cameraMove;

renderer.setSize(canvasContainer.offsetWidth, canvasContainer.offsetHeight);
renderer.setPixelRatio(window.devicePixelRatio);

const earthTexture = new TextureLoader().load('./img/happy_earth.png');
const moonTexture = new TextureLoader().load('./img/moon.png');
const earth = new Mesh(
    new SphereGeometry(6, 64, 64),
    new MeshStandardMaterial({
        map: earthTexture,
        roughness: 0.6
    })
);
const moon = new Mesh(
    new SphereGeometry(3, 64, 64),
    new MeshStandardMaterial({
        map: moonTexture
    })
);

moon.position.set(30, 0, 0)
group.add(earth, moon);

const makeStar = () => {
    const starGeometry = new SphereGeometry(0.03, 24, 24);
    const starMaterial = new MeshBasicMaterial({ color: 0xffffff });
    const star = new Mesh(starGeometry, starMaterial);
    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
    star.position.set(x, y, z);
    group.add(star);
}

Array(200).fill().forEach(makeStar);

scene.add(group, light);

const animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    group.rotation.y += 0.0018
    earth.rotation.y += 0.0001;
}

animate();
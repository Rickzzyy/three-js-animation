import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js'
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js'
import { gsap } from 'https://cdn.skypack.dev/gsap'

const camera = new THREE.PerspectiveCamera(10, window.innerWidth / window.innerHeight, 0.1, 1000)

camera.position.z = 13

const scene = new THREE.Scene()
let bee
const loader = new GLTFLoader()
loader.load(
	'/bee_minecraft.glb',
	function (gltf) {
		bee = gltf.scene
		scene.add(bee)
	},
	function (xhf) {},
	function (err) {}
)

const renderer = new THREE.WebGLRenderer({ alpha: true })
renderer.setSize(window.innerWidth, window.innerHeight)
document.getElementById('container3D').appendChild(renderer.domElement)

const reRender3D = () => {
	requestAnimationFrame(reRender3D)
	renderer.render(scene, camera)
}
reRender3D()

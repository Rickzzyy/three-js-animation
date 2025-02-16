import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js'
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js'
import modelMove from './components/ModelMover.js'
import { bee1Position, bee2Position } from './components/Positions.js'
const camera = new THREE.PerspectiveCamera(10, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 13

const scene = new THREE.Scene()
let bee
let mixer

let bee2
let mixer2
const loader = new GLTFLoader()

loader.load(
	'/minecraft_bee.glb',
	function (gltf) {
		bee = gltf.scene
		scene.add(bee)
		mixer = new THREE.AnimationMixer(bee)
		mixer.clipAction(gltf.animations[0]).play()
		modelMove(bee1Position, bee)
	},
	function (xhr) {},
	function (error) {}
)

loader.load(
	'/minecraft_bee.glb',
	function (gltf) {
		bee2 = gltf.scene
		scene.add(bee2)
		mixer2 = new THREE.AnimationMixer(bee2)
		mixer2.clipAction(gltf.animations[0]).play()
		modelMove(bee2Position, bee2)
	},
	function (xhr) {},
	function (error) {}
)

const renderer = new THREE.WebGLRenderer({ alpha: true })
renderer.setSize(window.innerWidth, window.innerHeight)
document.getElementById('container3D').appendChild(renderer.domElement)

const ambientLight = new THREE.AmbientLight(0xffffff, 1.3)
scene.add(ambientLight)

const topLight = new THREE.DirectionalLight(0xffffff, 1)
topLight.position.set(500, 500, 500)
scene.add(topLight)

const reRender3D = () => {
	requestAnimationFrame(reRender3D)
	renderer.render(scene, camera)
	if (mixer) mixer.update(0.005)
	if (mixer2) mixer2.update(0.005)
}
reRender3D()

window.addEventListener('scroll', () => {
	if (bee && bee2) {
		modelMove(bee1Position, bee)
		modelMove(bee2Position, bee2)
	}
})
window.addEventListener('resize', () => {
	renderer.setSize(window.innerWidth, window.innerHeight)
	camera.aspect = window.innerWidth / window.innerHeight
	camera.updateProjectionMatrix()
})

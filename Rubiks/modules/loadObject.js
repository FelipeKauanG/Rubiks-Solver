import * as THREE from "three"

import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader"

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"


const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)
const groundGeometry = new THREE.PlaneGeometry(20, 20)
const groundMaterial = new THREE.MeshStandardMaterial({ color: 0xececec })

const ground = new THREE.Mesh(groundGeometry, groundMaterial)
const box1 = new THREE.BoxGeometry(1, 1, 1)

const controls = new OrbitControls(camera, renderer.domElement)


const materialbox1 = new THREE.MeshStandardMaterial({
    color: 0xe8eba2,
    envMap: scene.background,
    metalness: 1,
    roughness: 0.5
})
const cube1 = new THREE.Mesh(box1, materialbox1)

const textureLoader = new THREE.TextureLoader()
const skyTexture = textureLoader.load("textures/kloofendal_48d_partly_cloudy_puresky.png")


function animate() {
    requestAnimationFrame(animate)
    controls.update()
    renderer.render(scene, camera)
}
animate()

const loader = new FBXLoader()

loader.load(
    "/Models/Cubo mágico.fbx",
    (obj) => {
        obj.position.set(0, 2, 0)
        camera.lookAt(obj.position)
        scene.add(obj)
        function animar() {
            requestAnimationFrame(animar)
            obj.rotation.y += 0.01
        }
        animar()
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded")
    },
    (err) => {
        console.error("An error Happened", err)
    }
)




scene.background = skyTexture

ground.rotation.x = -Math.PI / 2
camera.position.set(7, 3, 5)
camera.lookAt(cube1.position)
const ambientLight1 = new THREE.DirectionalLight(0xffffff, 0.5)
const ambientLight2 = new THREE.DirectionalLight(0xffffff, 1.5)
ambientLight2.position.set(-20, 10, 2)
ambientLight2.castShadow = true

renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.BasicShadowMap

function animarCubo() {
    requestAnimationFrame(animarCubo)
    cube1.rotation.y += 0.01
}
cube1.position.set(0, 1, 0)
animarCubo()
ground.receiveShadow = true
cube1.castShadow = true
ambientLight1.position.set(20, 10, 5)
ambientLight1.castShadow = true
scene.add(ambientLight1, cube1, ambientLight2)

function render() {
    requestAnimationFrame(render)
    renderer.render(scene, camera)
}
render()


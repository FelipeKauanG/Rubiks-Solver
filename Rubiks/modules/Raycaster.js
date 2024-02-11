// Importar módulos
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// DOM
var canvas = document.getElementById("render")

// Aplicando o setup da cena 
const scene = new THREE.Scene()
const renderer = new THREE.WebGLRenderer({antialias: true})
renderer.setSize(canvas.offsetWidth, canvas.offsetHeight)
//document.body.appendChild(renderer.domElement)
console.log(canvas.offsetHeight, canvas.off)
canvas.appendChild(renderer.domElement)
renderer.setPixelRatio(window.devicePixelRatio)


// Cubo1
const box = new THREE.BoxGeometry(1,1,1)
const materialBox = new THREE.MeshStandardMaterial({color: 0x6806c4})
const cube = new THREE.Mesh(box, materialBox)
cube.castShadow = true
scene.add(cube)

// Cameras
const camera = new THREE.PerspectiveCamera(60, canvas.offsetWidth / canvas.offsetHeight, 0.1,1000)
camera.position.set(2,2,2)
camera.lookAt(cube.position)



// Chão
const ground = new THREE.PlaneGeometry(20, 20)
const groundMaterial = new THREE.MeshStandardMaterial({color: 0xcacaca, side: THREE.DoubleSide})
const plane = new THREE.Mesh(ground, groundMaterial)
plane.rotation.x = -Math.PI /2
plane.position.set(0,-0.5,0)
plane.receiveShadow = true
scene.add(plane)


// Luz direcional para sombras
const directionalLight = new THREE.DirectionalLight(0xffffff, 2)
directionalLight.position.set(5, 10, 7)
directionalLight.castShadow = true
scene.add(directionalLight)


// Configurar sombras na luz direcional
directionalLight.shadow.mapSize.width = 1024
directionalLight.shadow.mapSize.height = 1024

// Configurar sombras no renderizador
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap


// Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement)
controls.enablePan = false


// Raycaster
const raycaster = new THREE.Raycaster()
const pointer = new THREE.Vector2()

// Função chamada quando o mouse se move
function onPointerMove(event){
    pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1
    pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1

    // Atualiza o raio de seleção com a câmera e a posição do mouse
    raycaster.setFromCamera( pointer, camera )

    // Calcular objetos cruzando o raio de seleção
    const intersects = raycaster.intersectObjects([cube])
    if ( intersects.length > 0 ){
        cube.material.color.set(0xc22d4d)
    } else {
        cube.material.color.set(0x6806c4)
    }
}


// Renderizar a cena
function render(){
    requestAnimationFrame( render )
    controls.update()
    renderer.render( scene, camera )  
}

window.addEventListener("pointermove", onPointerMove)
render()

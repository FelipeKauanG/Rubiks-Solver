import WebGL from "three/examples/jsm/capabilities/WebGL"
import * as THREE from "three"

if (WebGL.isWebGLAvailable()){
    

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(60, window.innerWidth/ window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer()
renderer.setSize( window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const geometry = new THREE.BoxGeometry( 1, 1, 1 )
const material = new THREE.MeshBasicMaterial( {color: 0x4287f5})
const cube = new THREE.Mesh( geometry, material)
scene.add( cube )

camera.position.z = 5

function animate(){
  requestAnimationFrame ( animate )
  renderer.render( scene, camera)
  cube.rotation.x += 0.01
  cube.rotation.y += 0.01
}
animate()
}else {
    const warning = WebGL.getErrorMessage()
    document.getElementById("container").appendChild(warning)
}

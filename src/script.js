import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'

/**
 * Base
 */
// Debug
// const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

const fog = new THREE.Fog('#262837', 1, 15)
scene.fog = fog

const bushFunc = (bush2, str) => {

gui.add(bush2.position, 'x').min(-5).max(5).step(0.001).name(`${str} Position X`);
gui.add(bush2.position, 'y').min(0).max(5).step(0.001).name(`${str} Position Y`);
gui.add(bush2.position, 'z').min(-5).max(5).step(0.001).name(`${str} Position Z`);
gui.add(bush2.rotation, 'y').min(0).max(Math.PI * 2).step(0.001).name(`${str} Rotation Y`);
gui.add(bush2.scale, 'x').min(0.1).max(2).step(0.001).name(`${str} Scale X`);
gui.add(bush2.scale, 'y').min(0.1).max(2).step(0.001).name(`${str} Scale Y`);
gui.add(bush2.scale, 'z').min(0.1).max(2).step(0.001).name(`${str} Scale Z`);
}



/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()


const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')


const bricksColorTexture = textureLoader.load('/textures/bricks/color.jpg')
const bricksAmbientOcclusionTexture = textureLoader.load('/textures/bricks/ambientOcclusion.jpg')
const bricksNormalTexture = textureLoader.load('/textures/bricks/normal.jpg')
const bricksRoughnessTexture = textureLoader.load('/textures/bricks/roughness.jpg')

const grassColorTexture = textureLoader.load('/textures/grass/color.jpg')
const grassAmbientOcclusionTexture = textureLoader.load('/textures/grass/ambientOcclusion.jpg')
const grassNormalTexture = textureLoader.load('/textures/grass/normal.jpg')
const grassRoughnessTexture = textureLoader.load('/textures/grass/roughness.jpg')


/**
 * House
 */ 
const house = new THREE.Group()
scene.add(house)

const walls = new THREE.Mesh(
    new THREE.BoxGeometry(4, 2.5, 4),
    new THREE.MeshStandardMaterial({ color: '#4e3728'
        , map: bricksColorTexture,
        aoMap: bricksAmbientOcclusionTexture,
        normalMap: bricksNormalTexture,
        roughnessMap: bricksRoughnessTexture
     })
)
walls.position.y = 2.5/2
house.add(walls)



//ghost

const ghost1 = new THREE.PointLight('#ff00ff', 2, 3)
scene.add(ghost1)

const ghost2 = new THREE.PointLight('#00ff00', 2, 3)
scene.add(ghost2)

const ghost3 = new THREE.PointLight('#0000ff', 2, 3)
scene.add(ghost3)


// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({ color: '#a9c388' 
        , map: grassColorTexture,
        aoMap: grassAmbientOcclusionTexture,
        normalMap: grassNormalTexture,
        roughnessMap: grassRoughnessTexture
    })
)


floor.rotation.x = - Math.PI * 0.5
floor.position.y = 0
scene.add(floor)




//roof
const roof = new THREE.Mesh(
    new THREE.ConeGeometry(3, 1, 4),
    new THREE.MeshStandardMaterial({ color: '#ab5050' })
)

roof.position.y = 3
roof.rotation.y = Math.PI * 0.25


house.add(roof)


//door
const door = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1.5),
    new THREE.MeshStandardMaterial({
        color: '#3b1919',
        side: THREE.DoubleSide
        , map: doorColorTexture,
        aoMap: doorAmbientOcclusionTexture,
        transparent: true,
        alphaMap: doorAlphaTexture
        , normalMap: doorNormalTexture,
        displacementMap: doorHeightTexture,
        metalnessMap: doorMetalnessTexture,
        roughnessMap: doorRoughnessTexture

    })
)

door.position.set(0, 1.5/2, 2.001)


house.add(door)


//bush

const bushGeometry = new THREE.SphereGeometry(0.5, 16, 16)
const bushMaterial = new THREE.MeshStandardMaterial({ color: '#70d022' })

const Bush1 = new THREE.Mesh(bushGeometry, bushMaterial)

house.add(Bush1)

Bush1.position.x = 1.5
Bush1.position.y = 0.3
Bush1.position.z = 2.5



const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
house.add(bush2)

bush2.position.set(1.927,0,2.787)
bush2.scale.set(0.622, 0.902, 0.412)


const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
house.add(bush3)
bush3.position.set(-1.146,0.083,2.173)


const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
house.add(bush4)
bush4.position.set(-1.515,0,2.419)
bush4.scale.set(0.739,0.575,0.482)




//graves
const graves = new THREE.Group()

const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2)
const graveMaterial = new THREE.MeshStandardMaterial({ color: '#b2b2b2' })

for (let i = 0; i < 50; i++)
{
    const grave = new THREE.Mesh(graveGeometry, graveMaterial)
    const angle = Math.random() * Math.PI * 2
    const A = 3.5 + Math.random() * 6
    grave.position.x = A*Math.cos(angle) 
    grave.position.z = A*Math.sin(angle)
    grave.position.y = 0.3 + (Math.random() * 0.2)/2
    grave.rotation.y = (Math.random() - 0.5) * Math.PI * 0.1
    grave.rotation.x = (Math.random() - 0.5) * Math.PI * 0.1
    grave.rotation.z = (Math.random() - 0.5) * Math.PI * 0.1

    graves.add(grave)
}

//uv

door.geometry.setAttribute('uv2', new THREE.BufferAttribute(door.geometry.attributes.uv.array, 2))
walls.geometry.setAttribute('uv2', new THREE.BufferAttribute(walls.geometry.attributes.uv.array, 2))
floor.geometry.setAttribute('uv2', new THREE.BufferAttribute(floor.geometry.attributes.uv.array, 2))


scene.add(graves)

//grass

grassColorTexture.repeat.set(8,8)
grassAmbientOcclusionTexture.repeat.set(8,8)
grassNormalTexture.repeat.set(8,8)
grassRoughnessTexture.repeat.set(8,8)

grassColorTexture.wrapS = THREE.RepeatWrapping
grassColorTexture.wrapT = THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping
grassNormalTexture.wrapS = THREE.RepeatWrapping
grassNormalTexture.wrapT = THREE.RepeatWrapping
grassRoughnessTexture.wrapS = THREE.RepeatWrapping
grassRoughnessTexture.wrapT = THREE.RepeatWrapping

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#afcefd', 0.12)
// gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

// Directional light
const moonLight = new THREE.DirectionalLight('#afcefd', 0.12)
moonLight.position.set(4, 5, - 2)
// gui.add(moonLight, 'intensity').min(0).max(1).step(0.001)
// gui.add(moonLight.position, 'x').min(- 5).max(5).step(0.001)
// gui.add(moonLight.position, 'y').min(- 5).max(5).step(0.001)
// gui.add(moonLight.position, 'z').min(- 5).max(5).step(0.001)
scene.add(moonLight)
//doorlight
const doorLight = new THREE.PointLight('#ff8400', 3, 7)
doorLight.position.set(0, 2.2, 2.7)
house.add(doorLight)


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor('#262837')


/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()


    const ghost1angle = elapsedTime * 0.28
    ghost1.position.x = Math.cos(ghost1angle) * 4
    ghost1.position.z = Math.sin(ghost1angle) * 4 
    ghost1.position.y = Math.abs(Math.sin(elapsedTime * 3)) + 0.1

    const ghost2angle = -elapsedTime * 0.3
    ghost2.position.x = Math.cos(ghost2angle) * 9
    ghost2.position.y = Math.abs(Math.sin(ghost2angle)) + 0.2
    ghost2.position.z = Math.sin(ghost2angle) * 9

    const ghost3angle = elapsedTime * Math.sin(elapsedTime * 0.5) * 0.4
    ghost3.position.x = Math.cos(ghost3angle) * 4
    ghost3.position.y = Math.abs(Math.sin(ghost3angle)) + 0.3
    ghost3.position.z = Math.sin(ghost3angle) * 4

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
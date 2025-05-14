import * as THREE from 'three';

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xC0C0C0); // Silver background
document.body.appendChild(renderer.domElement); // Append directly to body for fullscreen

// Light Blue Cube
const geometry = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshStandardMaterial({ color: 0xADD8E6, metalness: 0.5, roughness: 0.5 }); // Light blue
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6); // Slightly increased ambient light
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 0.9); // Slightly increased point light
pointLight.position.set(5, 10, 7.5); // Adjusted light position
scene.add(pointLight);

// Raycaster for click interaction
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Variables for mouse rotation
let isDragging = false;
let previousMousePosition = {
    x: 0,
    y: 0
};

// Click interaction
function onMouseClick(event) {
    // Calculate mouse position in normalized device coordinates (-1 to +1) for both components
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0 && intersects[0].object === cube) {
        intersects[0].object.material.color.set(Math.random() * 0xffffff);
        console.log('Cube clicked!');
    }
}

// Mouse down event for rotation
function onMouseDown(event) {
    isDragging = true;
    // Store initial mouse position for smoother dragging
    previousMousePosition = {
        x: event.clientX,
        y: event.clientY
    };
}

// Mouse move event for rotation
function onMouseMove(event) {
    if (isDragging) {
        const deltaMove = {
            x: event.clientX - previousMousePosition.x,
            y: event.clientY - previousMousePosition.y
        };

        const deltaRotationQuaternion = new THREE.Quaternion()
            .setFromEuler(new THREE.Euler(
                toRadians(deltaMove.y * 0.5), // Adjusted rotation speed
                toRadians(deltaMove.x * 0.5), // Adjusted rotation speed
                0,
                'XYZ'
            ));

        cube.quaternion.multiplyQuaternions(deltaRotationQuaternion, cube.quaternion);

        previousMousePosition = {
            x: event.clientX,
            y: event.clientY
        };
    }
}

// Mouse up event for rotation
function onMouseUp(event) {
    isDragging = false;
}

// Helper function to convert degrees to radians
function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Add event listeners to the window for fullscreen interaction
window.addEventListener('click', onMouseClick, false);
window.addEventListener('mousedown', onMouseDown, false);
window.addEventListener('mousemove', onMouseMove, false);
window.addEventListener('mouseup', onMouseUp, false);

animate();

console.log('Three.js fullscreen scene initialized with interactions.');

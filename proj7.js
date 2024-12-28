/*
Zackary Bowling
CS435 
Project 7

This project is a solar system simulation. The sun is in the center and the planets orbit around it.
The planets are not to scale and the distances are not to scale. The planets are not to scale because
the sun would be too large to see the planets. The distances are not to scale because the planets would
be too close to the sun to see them. The planets are textured with images of the planets. The planets
orbit the sun at different speeds. The planets are created using a helper function that takes in the
size, texture path, and distance from the sun. The planets are stored in an array and then animated
using a loop that updates the position of the planets. The camera is set to a position that allows
the user to see the planets orbiting the sun. The camera is controlled using the OrbitControls class.
The camera is updated and the scene is rendered in the animate function. The animate function is called
recursively using requestAnimationFrame. The scene is rendered using a WebGLRenderer. 

Modeling: Demonstrates modeling by creating a solar system with the sun in the center and the planets
Viewing: Demonstrates viewing by setting the camera position to view the planets orbiting the sun
Lighting: Demonstrates lighting by adding a point light to the scene
Texture/Enviroment/Bump Mapping: Demonstrates texture mapping by adding textures to the planets
Blending: Demonstrates blending by using the emissive property of the sun material
Interaction: Demonstrates interaction by allowing the user to control the camera using OrbitControls

*/
// Initialize scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting for scene
const light = new THREE.PointLight(0xffffff, 2, 1000);
light.position.set(0, 0, 0);
scene.add(light);

// Sun object
const sunGeometry = new THREE.SphereGeometry(5, 32, 32);
const sunMaterial = new THREE.MeshStandardMaterial({ emissive: 0xffff00 });
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

// Helper function to create planets
function createPlanet(size, texturePath, distance) {
  const geometry = new THREE.SphereGeometry(size, 32, 32);
  const texture = new THREE.TextureLoader().load(texturePath);
  const material = new THREE.MeshStandardMaterial({ map: texture });
  const planet = new THREE.Mesh(geometry, material);
  planet.userData = { distance }; 
  scene.add(planet);
  return planet;
}

// Texture for each planet and their distance from the sun
const planetData = [
  { name: "Mercury", size: 0.5, texture: 'textures/mercury.jpg', distance: 8 },
  { name: "Venus", size: 0.7, texture: 'textures/venus.jpg', distance: 10 },
  { name: "Earth", size: 1, texture: 'textures/earth.jpg', distance: 12 },
  { name: "Mars", size: 0.9, texture: 'textures/mars.jpg', distance: 15 },
  { name: "Jupiter", size: 2, texture: 'textures/jupiter.jpg', distance: 20 },
  { name: "Saturn", size: 1.5, texture: 'textures/saturn.jpg', distance: 25 },
  { name: "Uranus", size: 1.2, texture: 'textures/uranus.jpg', distance: 30 },
  { name: "Neptune", size: 1.1, texture: 'textures/neptune.jpg', distance: 35 },
];

// Create planets and store them
const planets = planetData.map(data => createPlanet(data.size, data.texture, data.distance));

// Orbit Controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Animate planets
  planets.forEach((planet, index) => {
    const speed = 0.001 + index * 0.0005; 
    const time = Date.now() * speed;
    const distance = planet.userData.distance;
    // Move planet along orbit according to online formula
    planet.position.x = distance * Math.cos(time);
    planet.position.z = distance * Math.sin(time);
  });

  controls.update();
  renderer.render(scene, camera);
}

// Adjust camera position and start animation
camera.position.set(0, 20, 50);
animate();

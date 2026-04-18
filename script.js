const ringTexts = [
    "Happy Birthday Riri",
    "Makasih ya Ri, udah jadi kamu versi yang paling aku hebat bukan karena sempurna tapi karena kamu jadi dirimu sendiri",
    "Ke depannya masih panjang, tapi kamu nggak perlu khawatir. Aku akan selalu menemanimu ditiap langkahnya",
    "Happy birthday 18th Riri Love U So Much"
];

let scene, camera, renderer, particles, planet, textMesh;
const canvas = document.getElementById('canvas');

function init() {
    // Scene setup
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000);
    camera.position.z = 5;

    // Create particles (stars)
    createParticles();
    
    // Create planet
    createPlanet();
    
    // Music button
    document.getElementById('musicButton').addEventListener('click', playMusic);
    
    // Handle resize
    window.addEventListener('resize', onWindowResize);
    
    animate();
}

function createParticles() {
    const geometry = new THREE.BufferGeometry();
    const particleCount = 1000;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 100;
        positions[i + 1] = (Math.random() - 0.5) * 100;
        positions[i + 2] = (Math.random() - 0.5) * 100;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({ color: 0x00ffff, size: 0.1 });
    particles = new THREE.Points(geometry, material);
    scene.add(particles);
}

function createPlanet() {
    const geometry = new THREE.IcosahedronGeometry(1.5, 32);
    const material = new THREE.MeshPhongMaterial({ color: 0xff1493 });
    planet = new THREE.Mesh(geometry, material);
    scene.add(planet);

    // Add lighting
    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(5, 5, 5);
    scene.add(light);
}

function playMusic() {
    const audio = document.getElementById('backgroundMusic');
    if (audio.paused) {
        audio.play();
        document.getElementById('musicButton').textContent = '⏸️ Musik Diputar';
    } else {
        audio.pause();
        document.getElementById('musicButton').textContent = 'Mainkan Musik 🎵';
    }
}

function animate() {
    requestAnimationFrame(animate);
    
    if (particles) particles.rotation.x += 0.0002;
    if (planet) planet.rotation.y += 0.005;
    
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Initialize
init();

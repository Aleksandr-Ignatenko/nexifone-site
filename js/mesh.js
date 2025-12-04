// ===== BASE SETUP =====
const canvas = document.getElementById("mesh");
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
renderer.setClearColor(0x000000, 0);

// Scene & Camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  55,
  canvas.clientWidth / canvas.clientHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 28);

// ===== GEOMETRY (glowing curve mesh) =====
const points = [];
for (let i = 0; i < 180; i++) {
  const angle = i * 0.12;
  points.push(
    new THREE.Vector3(
      Math.sin(angle) * 10,
      Math.cos(angle * 1.3) * 4,
      Math.sin(angle * 0.7) * 3
    )
  );
}

const curve = new THREE.CatmullRomCurve3(points);
const geometry = new THREE.TubeGeometry(curve, 500, 0.12, 16, false);

// Glow gradient (cyan → magenta)
const material = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  transparent: true,
  opacity: 0.85
});

// Mesh object
const tube = new THREE.Mesh(geometry, material);
scene.add(tube);

// ===== BLOOM EFFECT (like Voximplant) =====
const composer = new THREE.EffectComposer(renderer);
composer.addPass(new THREE.RenderPass(scene, camera));

const bloomPass = new THREE.UnrealBloomPass(
  new THREE.Vector2(canvas.clientWidth, canvas.clientHeight),
  1.4,    // intensity
  0.4,    // bloom radius
  0.0
);

bloomPass.threshold = 0.0;
bloomPass.strength = 1.8;  // glow
bloomPass.radius = 0.45;

composer.addPass(bloomPass);

// ===== ANIMATION =====
function animate() {
  requestAnimationFrame(animate);

  tube.rotation.y += 0.0016;
  tube.rotation.x += 0.0010;

  composer.render();
}
animate();

// ===== RESIZE FIX =====
function resize() {
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;

  renderer.setSize(w, h, false);
  composer.setSize(w, h);

  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}

window.addEventListener("resize", resize);
resize();

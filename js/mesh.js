// ===== BASE SETUP =====
const canvas = document.getElementById("mesh");

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x000000, 0);

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 1000);
camera.position.set(0, 0, 28);

// ===== GEOMETRY =====
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
const geometry = new THREE.TubeGeometry(curve, 500, 0.12, 16, true);

const material = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  transparent: true,
  opacity: 0.85
});

const tube = new THREE.Mesh(geometry, material);
scene.add(tube);

// ===== BLOOM =====
const composer = new THREE.EffectComposer(renderer);
composer.addPass(new THREE.RenderPass(scene, camera));

const bloomPass = new THREE.UnrealBloomPass(
  new THREE.Vector2(1, 1),
  1.8,
  0.45,
  0
);
composer.addPass(bloomPass);

// ===== RESIZE =====
function resize() {
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;

  renderer.setSize(w, h, false);
  composer.setSize(w, h);

  camera.aspect = w / h;
  camera.updateProjectionMatrix();

  bloomPass.resolution.set(w, h);
}

window.addEventListener("resize", resize);
resize();

// ===== ANIMATION =====
function animate() {
  requestAnimationFrame(animate);

  tube.rotation.y += 0.0016;
  tube.rotation.x += 0.0010;

  composer.render();
}
animate();

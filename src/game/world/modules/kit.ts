import * as THREE from 'three';

const wallMat = new THREE.MeshLambertMaterial({ color: 0x7d8594 });
const floorMat = new THREE.MeshLambertMaterial({ color: 0x2f3344 });
const accentMat = new THREE.MeshLambertMaterial({ color: 0x9fa8b8 });

export function makeFloorTile(size = 4) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(size, 0.2, size), floorMat);
  mesh.receiveShadow = false;
  return mesh;
}

export function makeWallSegment(length = 4, height = 3.2, depth = 0.25) {
  return new THREE.Mesh(new THREE.BoxGeometry(length, height, depth), wallMat);
}

export function makeColumn(height = 6) {
  return new THREE.Mesh(new THREE.BoxGeometry(0.6, height, 0.6), accentMat);
}

export function makeStorefront(width = 4, height = 3.4) {
  const g = new THREE.Group();
  const frame = new THREE.Mesh(new THREE.BoxGeometry(width, height, 0.3), accentMat);
  frame.position.y = height / 2;
  const shutter = new THREE.Mesh(new THREE.BoxGeometry(width - 0.4, height - 1.2, 0.15), new THREE.MeshLambertMaterial({ color: 0x4d5672 }));
  shutter.position.set(0, height * 0.5, 0.2);
  const sign = new THREE.Mesh(new THREE.BoxGeometry(width - 0.3, 0.5, 0.2), new THREE.MeshLambertMaterial({ color: 0x6f84ac }));
  sign.position.set(0, height - 0.5, 0.25);
  g.add(frame, shutter, sign);
  return g;
}

export function makeRailing(length = 4) {
  const g = new THREE.Group();
  const top = new THREE.Mesh(new THREE.BoxGeometry(length, 0.12, 0.12), accentMat);
  top.position.y = 1;
  g.add(top);
  for (let i = 0; i < Math.floor(length); i++) {
    const post = new THREE.Mesh(new THREE.BoxGeometry(0.1, 1, 0.1), accentMat);
    post.position.set(-length / 2 + 0.5 + i, 0.5, 0);
    g.add(post);
  }
  return g;
}

export function makeLightFixture() {
  const g = new THREE.Group();
  const tube = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.12, 0.25), new THREE.MeshBasicMaterial({ color: 0xf2f3ff }));
  g.add(tube);
  return g;
}

export function makeBench() {
  const g = new THREE.Group();
  const seat = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.2, 0.8), wallMat);
  seat.position.y = 0.5;
  const base = new THREE.Mesh(new THREE.BoxGeometry(2, 0.45, 0.3), accentMat);
  base.position.y = 0.22;
  g.add(seat, base);
  return g;
}

export function makePlanter() {
  const g = new THREE.Group();
  const box = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.8, 1.1), wallMat);
  box.position.y = 0.4;
  const plant = new THREE.Mesh(new THREE.ConeGeometry(0.45, 1.2, 4), new THREE.MeshLambertMaterial({ color: 0x3e6b4f }));
  plant.position.y = 1.2;
  g.add(box, plant);
  return g;
}

export function makeEscalator(length = 8, rise = 3.5) {
  const g = new THREE.Group();
  const ramp = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.3, length), new THREE.MeshLambertMaterial({ color: 0x585f70 }));
  ramp.rotation.x = -Math.atan2(rise, length);
  ramp.position.y = rise * 0.5;
  g.add(ramp);
  return g;
}

import * as THREE from 'three';
import { CollisionWorld } from '../player/collision';
import {
  makeBench,
  makeColumn,
  makeEscalator,
  makeFloorTile,
  makeLightFixture,
  makePlanter,
  makeRailing,
  makeStorefront,
  makeWallSegment
} from './modules/kit';

export type FlickerLight = { light: THREE.PointLight; seed: number };

export function buildMallSlice(scene: THREE.Scene) {
  const collision = new CollisionWorld();
  const lights: FlickerLight[] = [];

  const hemi = new THREE.HemisphereLight(0x8ea0cc, 0x13141d, 0.7);
  scene.add(hemi);

  const ambient = new THREE.AmbientLight(0x7c8ab5, 0.35);
  scene.add(ambient);

  const root = new THREE.Group();
  scene.add(root);

  for (let x = -6; x <= 6; x++) {
    for (let z = -8; z <= 9; z++) {
      const tile = makeFloorTile();
      tile.position.set(x * 4, -0.1, z * 4);
      root.add(tile);
    }
  }

  const mainWalls = [
    { p: new THREE.Vector3(-8, 1.6, 22), r: 0, l: 48 },
    { p: new THREE.Vector3(8, 1.6, 22), r: 0, l: 48 },
    { p: new THREE.Vector3(0, 1.6, 46), r: Math.PI / 2, l: 16 },
    { p: new THREE.Vector3(0, 1.6, -2), r: Math.PI / 2, l: 16 }
  ];

  for (const wall of mainWalls) {
    const seg = makeWallSegment(wall.l, 3.2);
    seg.position.copy(wall.p);
    seg.rotation.y = wall.r;
    root.add(seg);
  }

  collision.addBox(new THREE.Vector3(-8.4, 0, -2.3), new THREE.Vector3(-7.6, 4, 46.3));
  collision.addBox(new THREE.Vector3(7.6, 0, -2.3), new THREE.Vector3(8.4, 4, 46.3));
  collision.addBox(new THREE.Vector3(-8.3, 0, -2.3), new THREE.Vector3(8.3, 4, -1.7));
  collision.addBox(new THREE.Vector3(-8.3, 0, 45.7), new THREE.Vector3(8.3, 4, 46.3));

  // Atrium reveal + second floor balcony
  const atriumVoid = new THREE.Mesh(new THREE.BoxGeometry(11, 0.2, 12), new THREE.MeshLambertMaterial({ color: 0x171a26 }));
  atriumVoid.position.set(0, 3.3, 24);
  root.add(atriumVoid);

  for (const x of [-4.8, 4.8]) {
    const rail = makeRailing(10);
    rail.position.set(x, 3.4, 24);
    rail.rotation.y = Math.PI / 2;
    root.add(rail);
  }

  for (const z of [18.5, 29.5]) {
    const rail = makeRailing(9.5);
    rail.position.set(0, 3.4, z);
    root.add(rail);
  }

  for (const x of [-5.4, 5.4]) {
    for (const z of [18.5, 29.5]) {
      const col = makeColumn();
      col.position.set(x, 3, z);
      root.add(col);
    }
  }

  const escalator = makeEscalator();
  escalator.position.set(-2.5, 0, 19.3);
  root.add(escalator);

  const escalator2 = makeEscalator();
  escalator2.position.set(2.5, 0, 28.8);
  escalator2.rotation.y = Math.PI;
  root.add(escalator2);

  // Wings + storefront facades
  const storefrontPositions: Array<[number, number, number]> = [];
  for (let i = 0; i < 5; i++) {
    storefrontPositions.push([-13, 0, 14 + i * 4]);
    storefrontPositions.push([13, 0, 14 + i * 4]);
  }

  for (const [x, y, z] of storefrontPositions) {
    const store = makeStorefront(3.6, 3.2);
    store.position.set(x, y, z);
    store.rotation.y = x > 0 ? Math.PI / 2 : -Math.PI / 2;
    root.add(store);
  }

  collision.addBox(new THREE.Vector3(-14.7, 0, 12), new THREE.Vector3(-11.8, 4, 34));
  collision.addBox(new THREE.Vector3(11.8, 0, 12), new THREE.Vector3(14.7, 4, 34));
  collision.addBox(new THREE.Vector3(-11.8, 0, 12), new THREE.Vector3(-8.2, 4, 13));
  collision.addBox(new THREE.Vector3(8.2, 0, 12), new THREE.Vector3(11.8, 4, 13));

  // Props (reusable)
  for (const p of [
    new THREE.Vector3(-3, 0, 16),
    new THREE.Vector3(3, 0, 16),
    new THREE.Vector3(-3, 0, 31),
    new THREE.Vector3(3, 0, 31)
  ]) {
    const bench = makeBench();
    bench.position.copy(p);
    root.add(bench);

    const planter = makePlanter();
    planter.position.copy(p.clone().add(new THREE.Vector3(0, 0, 2.1)));
    root.add(planter);
  }

  // Fluorescent lights + flicker handles
  for (let i = 0; i < 12; i++) {
    const z = 4 + i * 3.3;
    for (const x of [-4.2, 0, 4.2]) {
      const fixture = makeLightFixture();
      fixture.position.set(x, 3.05, z);
      root.add(fixture);

      const l = new THREE.PointLight(0xe6edff, 0.55, 11, 2);
      l.position.set(x, 2.95, z);
      root.add(l);
      lights.push({ light: l, seed: Math.random() * 100 });
    }
  }

  return { collision, flickerLights: lights };
}

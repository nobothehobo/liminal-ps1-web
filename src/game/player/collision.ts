import * as THREE from 'three';

export type AABB = { min: THREE.Vector3; max: THREE.Vector3 };

export class CollisionWorld {
  bounds: AABB[] = [];

  addBox(min: THREE.Vector3, max: THREE.Vector3) {
    this.bounds.push({ min, max });
  }

  resolve(position: THREE.Vector3, radius: number) {
    for (const box of this.bounds) {
      const clamped = new THREE.Vector3(
        THREE.MathUtils.clamp(position.x, box.min.x, box.max.x),
        THREE.MathUtils.clamp(position.y, box.min.y, box.max.y),
        THREE.MathUtils.clamp(position.z, box.min.z, box.max.z)
      );
      const delta = position.clone().sub(clamped);
      const dist = delta.length();
      if (dist < radius && dist > 0.0001) {
        position.add(delta.normalize().multiplyScalar(radius - dist));
      }
    }
    position.y = 1.6;
  }
}

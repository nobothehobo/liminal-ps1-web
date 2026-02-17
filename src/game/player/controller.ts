import * as THREE from 'three';
import { TouchControls } from '../input/touchControls';
import { CollisionWorld } from './collision';

export class PlayerController {
  yaw = 0;
  pitch = 0;
  speed = 4;
  position = new THREE.Vector3(0, 1.6, 10);
  private look = new THREE.Vector2();

  update(delta: number, controls: TouchControls, collision: CollisionWorld, camera: THREE.PerspectiveCamera) {
    controls.consumeLookDelta(this.look);
    this.yaw += this.look.x;
    this.pitch = THREE.MathUtils.clamp(this.pitch + this.look.y, -1.2, 1.2);

    const inputX = controls.movement.x;
    const inputZ = controls.movement.y;

    const forward = new THREE.Vector3(Math.sin(this.yaw), 0, Math.cos(this.yaw));
    const right = new THREE.Vector3(forward.z, 0, -forward.x);
    const move = new THREE.Vector3().addScaledVector(forward, -inputZ).addScaledVector(right, inputX);
    if (move.lengthSq() > 0) move.normalize().multiplyScalar(this.speed * delta);

    this.position.add(move);
    collision.resolve(this.position, 0.45);

    camera.position.copy(this.position);
    camera.rotation.order = 'YXZ';
    camera.rotation.y = this.yaw;
    camera.rotation.x = this.pitch;
  }
}

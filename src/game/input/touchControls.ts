import * as THREE from 'three';

export class TouchControls {
  movement = new THREE.Vector2();
  lookDelta = new THREE.Vector2();
  sensitivity = 0.0025;

  private joystick: HTMLDivElement;
  private thumb: HTMLDivElement;
  private activeJoyId: number | null = null;
  private activeLookId: number | null = null;
  private joyOrigin = new THREE.Vector2();
  private lastLook = new THREE.Vector2();

  constructor(overlay: HTMLElement) {
    this.joystick = document.createElement('div');
    this.joystick.className = 'joystick';
    this.thumb = document.createElement('div');
    this.thumb.className = 'joystick__thumb';
    this.joystick.appendChild(this.thumb);
    overlay.appendChild(this.joystick);

    this.joystick.addEventListener('touchstart', (e) => this.onJoyStart(e), { passive: false });
    this.joystick.addEventListener('touchmove', (e) => this.onJoyMove(e), { passive: false });
    this.joystick.addEventListener('touchend', () => this.resetJoy());
    this.joystick.addEventListener('touchcancel', () => this.resetJoy());

    overlay.addEventListener('touchstart', (e) => this.onLookStart(e), { passive: false });
    overlay.addEventListener('touchmove', (e) => this.onLookMove(e), { passive: false });
    overlay.addEventListener('touchend', (e) => this.onLookEnd(e));
  }

  private onJoyStart(e: TouchEvent) {
    e.preventDefault();
    const t = e.changedTouches[0];
    this.activeJoyId = t.identifier;
    this.joyOrigin.set(t.clientX, t.clientY);
  }

  private onJoyMove(e: TouchEvent) {
    e.preventDefault();
    const touch = [...e.changedTouches].find((t) => t.identifier === this.activeJoyId);
    if (!touch) return;
    const delta = new THREE.Vector2(touch.clientX - this.joyOrigin.x, touch.clientY - this.joyOrigin.y);
    const radius = 34;
    if (delta.length() > radius) delta.setLength(radius);
    this.thumb.style.transform = `translate(${delta.x}px, ${delta.y}px)`;
    this.movement.set(delta.x / radius, delta.y / radius);
  }

  private resetJoy() {
    this.activeJoyId = null;
    this.movement.set(0, 0);
    this.thumb.style.transform = 'translate(0px, 0px)';
  }

  private onLookStart(e: TouchEvent) {
    for (const touch of [...e.changedTouches]) {
      if (touch.clientX > window.innerWidth * 0.4 && this.activeLookId === null) {
        this.activeLookId = touch.identifier;
        this.lastLook.set(touch.clientX, touch.clientY);
        return;
      }
    }
  }

  private onLookMove(e: TouchEvent) {
    const touch = [...e.changedTouches].find((t) => t.identifier === this.activeLookId);
    if (!touch) return;
    e.preventDefault();
    const movementX = touch.clientX - this.lastLook.x;
    const movementY = touch.clientY - this.lastLook.y;
    this.lastLook.set(touch.clientX, touch.clientY);
    this.lookDelta.x -= movementX * this.sensitivity;
    this.lookDelta.y -= movementY * this.sensitivity;
  }

  private onLookEnd(e: TouchEvent) {
    const touch = [...e.changedTouches].find((t) => t.identifier === this.activeLookId);
    if (touch) this.activeLookId = null;
  }

  consumeLookDelta(target: THREE.Vector2) {
    target.copy(this.lookDelta);
    this.lookDelta.set(0, 0);
  }
}

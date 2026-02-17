import * as THREE from 'three';

export const RESOLUTION_PRESETS = {
  low: { w: 320, h: 180 },
  ps1: { w: 426, h: 240 },
  med: { w: 640, h: 360 }
} as const;

export type ResolutionPreset = keyof typeof RESOLUTION_PRESETS;

export class GameRenderer {
  renderer: THREE.WebGLRenderer;
  camera: THREE.PerspectiveCamera;
  scene: THREE.Scene;
  jitterEnabled = false;
  private activePreset: ResolutionPreset = 'ps1';

  constructor(container: HTMLElement) {
    this.renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: 'high-performance' });
    this.renderer.setPixelRatio(1);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.setClearColor(0x242744);
    this.renderer.domElement.style.imageRendering = 'pixelated';

    this.camera = new THREE.PerspectiveCamera(72, 1, 0.1, 70);
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog(0x242744, 6, 34);

    container.appendChild(this.renderer.domElement);
    this.setResolution(this.activePreset);
    this.onResize();
    window.addEventListener('resize', () => this.onResize());
  }

  setResolution(preset: ResolutionPreset) {
    this.activePreset = preset;
    const { w, h } = RESOLUTION_PRESETS[preset];
    this.renderer.setSize(w, h, false);
  }

  onResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    const canvas = this.renderer.domElement;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
  }

  render(elapsed: number) {
    if (this.jitterEnabled) {
      const jitter = Math.sin(elapsed * 21) * 0.0008;
      this.camera.setViewOffset(426, 240, jitter, -jitter, 426, 240);
    } else {
      this.camera.clearViewOffset();
    }
    this.renderer.render(this.scene, this.camera);
  }
}

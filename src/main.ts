import './style.css';
import { Loop } from './game/engine/loop';
import { GameRenderer } from './game/engine/renderer';
import { TouchControls } from './game/input/touchControls';
import { PlayerController } from './game/player/controller';
import { buildMallSlice } from './game/world/level';
import { SettingsMenu } from './ui/settings';
import { StartScreen } from './ui/startScreen';

const app = document.querySelector<HTMLDivElement>('#app');
if (!app) throw new Error('Missing #app container');

const renderer = new GameRenderer(app);
const overlay = document.createElement('div');
overlay.className = 'overlay';
app.appendChild(overlay);

const controls = new TouchControls(overlay);
const player = new PlayerController();
const { collision, flickerLights } = buildMallSlice(renderer.scene);

new SettingsMenu(
  overlay,
  { sensitivity: controls.sensitivity, quality: 'ps1', soundOn: false, wobble: false },
  ({ sensitivity, quality, wobble }) => {
    controls.sensitivity = sensitivity;
    renderer.setResolution(quality);
    renderer.jitterEnabled = wobble;
  }
);

let started = false;
new StartScreen(overlay, () => {
  started = true;
});

const loop = new Loop();
loop.start((delta, elapsed) => {
  if (!started) return renderer.render(elapsed);

  player.update(delta, controls, collision, renderer.camera);

  for (const f of flickerLights) {
    const pulse = Math.sin(elapsed * 2 + f.seed) * 0.08;
    const crackle = Math.sin(elapsed * 34 + f.seed * 2) > 0.98 ? -0.2 : 0;
    f.light.intensity = 0.5 + pulse + crackle;
  }

  renderer.render(elapsed);
});

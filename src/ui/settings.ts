import { ResolutionPreset } from '../game/engine/renderer';

export type SettingsState = {
  sensitivity: number;
  quality: ResolutionPreset;
  soundOn: boolean;
  wobble: boolean;
};

export class SettingsMenu {
  private panel: HTMLDivElement;
  private visible = false;

  constructor(overlay: HTMLElement, initial: SettingsState, onChange: (state: SettingsState) => void) {
    const button = document.createElement('button');
    button.className = 'hud-button';
    button.textContent = 'Settings';
    overlay.appendChild(button);

    this.panel = document.createElement('div');
    this.panel.className = 'settings';
    this.panel.style.display = 'none';
    this.panel.innerHTML = `
      <label>Sensitivity <input id="sensitivity" type="range" min="0.0015" max="0.006" step="0.0005" value="${initial.sensitivity}"></label>
      <label>Graphics
        <select id="quality">
          <option value="low">Low</option>
          <option value="ps1" selected>PS1</option>
          <option value="med">Medium</option>
        </select>
      </label>
      <label><input id="sound" type="checkbox" ${initial.soundOn ? 'checked' : ''}> Sound On</label>
      <label><input id="wobble" type="checkbox" ${initial.wobble ? 'checked' : ''}> Wobble/Jitter</label>
    `;

    const sensitivity = this.panel.querySelector('#sensitivity') as HTMLInputElement;
    const quality = this.panel.querySelector('#quality') as HTMLSelectElement;
    const sound = this.panel.querySelector('#sound') as HTMLInputElement;
    const wobble = this.panel.querySelector('#wobble') as HTMLInputElement;
    quality.value = initial.quality;

    const emit = () =>
      onChange({
        sensitivity: Number(sensitivity.value),
        quality: quality.value as ResolutionPreset,
        soundOn: sound.checked,
        wobble: wobble.checked
      });

    sensitivity.oninput = emit;
    quality.onchange = emit;
    sound.onchange = emit;
    wobble.onchange = emit;

    button.onclick = () => {
      this.visible = !this.visible;
      this.panel.style.display = this.visible ? 'block' : 'none';
    };

    overlay.appendChild(this.panel);
  }
}

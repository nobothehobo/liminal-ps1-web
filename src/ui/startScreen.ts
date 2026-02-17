export class StartScreen {
  element: HTMLDivElement;

  constructor(overlay: HTMLElement, onEnter: () => void) {
    this.element = document.createElement('div');
    this.element.className = 'start-screen';
    this.element.innerHTML = `
      <h2>LIMINAL MALL 1987</h2>
      <p>Touch left joystick to move. Drag right side to look.</p>
      <button>Tap to Enter</button>
    `;
    const button = this.element.querySelector('button') as HTMLButtonElement;
    button.onclick = () => {
      this.hide();
      onEnter();
    };
    overlay.appendChild(this.element);
  }

  hide() {
    this.element.style.display = 'none';
  }
}

import { Time } from './time';

export class Loop {
  private frame = 0;
  private time = new Time();

  start(update: (delta: number, elapsed: number) => void) {
    const tick = () => {
      this.time.tick();
      update(this.time.delta, this.time.elapsed);
      this.frame = requestAnimationFrame(tick);
    };
    tick();
  }

  stop() {
    cancelAnimationFrame(this.frame);
  }
}

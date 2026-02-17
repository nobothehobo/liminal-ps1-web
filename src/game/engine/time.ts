export class Time {
  private last = performance.now();
  delta = 0;
  elapsed = 0;

  tick() {
    const now = performance.now();
    this.delta = Math.min((now - this.last) / 1000, 1 / 20);
    this.elapsed += this.delta;
    this.last = now;
  }
}

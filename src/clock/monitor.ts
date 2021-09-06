export interface Performance {
  fps: number;
  frames: number;
  delta: number;
  time: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Listener = (...args: any[]) => void;
export type PerformanceListener = (data: Performance) => void;

const isDataListener = (
  listener: [fn: Listener, event: string],
): listener is [fn: PerformanceListener, event: 'data'] =>
  listener[1] === 'data';

export interface PerformanceMonitor {
  push(time: number): void;
  addEventListener(event: 'data', listener: PerformanceListener): void;
  removeAllListeners(): void;
}

class DefaultPerformanceMonitor implements PerformanceMonitor {
  private frames = 0;
  private prev = 0;
  private next = 1000;
  private listeners: [fn: Listener, event: string][] = [];

  public push(time: number): void {
    this.frames++;
    if (time < this.next) return;

    const delta = time - this.prev;
    const fps = (this.frames * 1000) / delta;
    const frames = this.frames;
    this.frames = 0;
    this.prev = time;
    this.next = Math.floor(time / 1000) * 1000 + 1000;
    this.listeners
      .filter(isDataListener)
      .forEach(([fn]) => fn({ fps, frames, delta, time }));
  }

  public addEventListener(event: string, listener: Listener): void {
    this.listeners.push([listener, event]);
  }

  public removeAllListeners(): void {
    this.listeners = [];
  }
}

export const createMonitor = (): PerformanceMonitor =>
  new DefaultPerformanceMonitor();

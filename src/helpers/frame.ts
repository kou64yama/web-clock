export class AbortError extends Error {}

export interface Options {
  signal?: AbortSignal;
}

export const nextFrame = async (options: Options = {}): Promise<number> =>
  new Promise<number>((resolve, reject) => {
    const { signal } = options;
    const abort = () => {
      cancelAnimationFrame(handle);
      reject(
        new AbortError(
          'Failed to wait next animation frame: The user aborted a request',
        ),
      );
    };
    const handle = requestAnimationFrame((time) => {
      resolve(time);
      signal?.removeEventListener('abort', abort);
    });
    signal?.addEventListener('abort', abort);
  });

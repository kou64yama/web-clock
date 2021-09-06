const ABORT_ERROR_NAME = 'AbortError';

const error = () => {
  const error = new Error(
    'Failed to wait next animation frame: The user aborted a animation frame',
  );
  error.name = ABORT_ERROR_NAME;
  return error;
};

export interface FrameOptions {
  signal?: AbortSignal;
}

export const nextFrame = async (options: FrameOptions = {}): Promise<number> =>
  new Promise<number>((resolve, reject) => {
    const { signal } = options;
    if (signal?.aborted) return reject(error());

    const onAnimationFrame = (time: number) => {
      signal?.removeEventListener('abort', onAbort);
      resolve(time);
    };
    const onAbort = () => {
      signal?.removeEventListener('abort', onAbort);
      cancelAnimationFrame(handle);
      reject(error());
    };
    const handle = requestAnimationFrame(onAnimationFrame);
    signal?.addEventListener('abort', onAbort);
  });

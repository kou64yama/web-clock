import { nextFrame } from './frame';

let requestAnimationFrame: jest.Mock<
  ReturnType<Window['requestAnimationFrame']>,
  Parameters<Window['requestAnimationFrame']>
>;
let cancelAnimationFrame: jest.Mock<
  ReturnType<Window['cancelAnimationFrame']>,
  Parameters<Window['cancelAnimationFrame']>
>;

beforeEach(() => {
  requestAnimationFrame = jest.fn();
  cancelAnimationFrame = jest.fn();
  window.requestAnimationFrame = requestAnimationFrame;
  window.cancelAnimationFrame = cancelAnimationFrame;
});

test('wait animation frame', async () => {
  const handler = 1;
  requestAnimationFrame.mockReturnValueOnce(handler);
  const time = 17;
  const result = nextFrame();
  requestAnimationFrame.mock.calls.forEach(([fn]) => fn(time));
  await expect(result).resolves.toBe(time);
});

test('be able to abort', async () => {
  const handler = 1;
  requestAnimationFrame.mockReturnValueOnce(handler);
  const ab = new AbortController();
  const { signal } = ab;
  const result = nextFrame({ signal });
  ab.abort();
  await expect(result).rejects.toThrow();
  const error = await result.catch((err) => err);
  expect(error.name).toBe('AbortError');
  expect(cancelAnimationFrame).toHaveBeenCalledWith(handler);
});

test('aborted signal', async () => {
  const ab = new AbortController();
  const { signal } = ab;
  ab.abort();
  const result = nextFrame({ signal });
  await expect(result).rejects.toThrow();
  const error = await result.catch((err) => err);
  expect(error.name).toBe('AbortError');
  expect(requestAnimationFrame).not.toHaveBeenCalled();
  expect(cancelAnimationFrame).not.toHaveBeenCalled();
});

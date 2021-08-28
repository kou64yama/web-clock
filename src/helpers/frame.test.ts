import { AbortError, nextFrame } from './frame';

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
  const result = nextFrame();
  requestAnimationFrame.mock.calls.forEach(([fn]) => fn(17));
  await expect(result).resolves.toBe(17);
  expect(requestAnimationFrame).toBeCalled();
  expect(cancelAnimationFrame).not.toBeCalled();
});

test('be able to abort', async () => {
  const ab = new AbortController();
  const { signal } = ab;
  const result = nextFrame({ signal });
  ab.abort();
  await expect(result).rejects.toThrow(AbortError);
  expect(requestAnimationFrame).toBeCalled();
  expect(cancelAnimationFrame).toBeCalled();
});

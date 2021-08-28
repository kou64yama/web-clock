import { onBeforeUnmount, onMounted, watch } from 'vue';
import { nextFrame } from '../../helpers/frame';
import { useClock } from './clock';

jest.mock('vue', () => ({
  ...jest.requireActual('vue'),
  onMounted: jest.fn(),
  onBeforeUnmount: jest.fn(),
}));
jest.mock('../../helpers/frame');

const mockedOnMounted = onMounted as jest.Mock<
  ReturnType<typeof onMounted>,
  Parameters<typeof onMounted>
>;
const mockedOnBeforeUnmount = onBeforeUnmount as jest.Mock<
  ReturnType<typeof onBeforeUnmount>,
  Parameters<typeof onBeforeUnmount>
>;
const mockedNextFrame = nextFrame as jest.Mock<
  ReturnType<typeof nextFrame>,
  Parameters<typeof nextFrame>
>;
let mockedNow: jest.SpyInstance<number, []>;

beforeEach(() => {
  mockedNow = jest.spyOn(Date, 'now');
});

test('default value is zero', () => {
  const { quartz } = useClock();
  expect(quartz.value).toBe(0);
  expect(mockedOnMounted).toBeCalled();
  expect(mockedOnBeforeUnmount).toBeCalled();
});

test('set epoch time on mounted', () => {
  mockedNextFrame.mockResolvedValue(0);
  mockedNow.mockReturnValueOnce(17);
  const { quartz } = useClock();
  mockedOnMounted.mock.calls.forEach(([fn]) => fn());
  mockedOnBeforeUnmount.mock.calls.forEach(([fn]) => fn());
  expect(quartz.value).toBe(17);
});

test('set epoch time on animation frame', async () => {
  mockedNextFrame.mockResolvedValueOnce(0).mockImplementationOnce(() => {
    mockedOnBeforeUnmount.mock.calls.forEach(([fn]) => fn());
    return Promise.resolve(0);
  });
  mockedNow.mockReturnValueOnce(1).mockReturnValueOnce(2);
  const { quartz } = useClock();
  await mockedOnMounted.mock.calls
    .map(([fn]) => fn())
    .reduce<Promise<void>>(async (acc, value) => {
      await acc;
      await value;
    }, Promise.resolve());
  expect(quartz.value).toBe(2);
});

test('ignore same value', async () => {
  mockedNextFrame
    .mockResolvedValueOnce(0)
    .mockResolvedValueOnce(0)
    .mockImplementationOnce(() => {
      mockedOnBeforeUnmount.mock.calls.forEach(([fn]) => fn());
      return Promise.resolve(0);
    });
  mockedNow.mockReturnValue(1);
  const watcher = jest.fn();
  const { quartz } = useClock();
  watch(quartz, watcher);
  await mockedOnMounted.mock.calls
    .map(([fn]) => fn())
    .reduce<Promise<void>>(async (acc, value) => {
      await acc;
      await value;
    }, Promise.resolve());
  expect(watcher).toBeCalledTimes(1);
});

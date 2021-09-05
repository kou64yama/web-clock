/* eslint-disable no-undef */

import { nextTick, onBeforeUnmount, ref } from 'vue';
import { onResize } from './resize';

let MockedResizeObserver: jest.Mock<
  ResizeObserver,
  [callback: ResizeObserverCallback]
>;
const mockedOnBeforeUnmount = onBeforeUnmount as jest.Mock<
  ReturnType<typeof onBeforeUnmount>,
  Parameters<typeof onBeforeUnmount>
>;
let mockedObserve: jest.Mock<
  void,
  [target: Element, options?: ResizeObserverOptions]
>;
let mockedUnobserve: jest.Mock<void, [target: Element]>;
let mockedDisconnect: jest.Mock<void, []>;

beforeEach(() => {
  mockedObserve = jest.fn();
  mockedUnobserve = jest.fn();
  mockedDisconnect = jest.fn();
  MockedResizeObserver = jest.fn();
  window.ResizeObserver = MockedResizeObserver;
});

test('called hook on resize', async () => {
  const hook = jest.fn();
  MockedResizeObserver.mockReturnValueOnce({
    observe: mockedObserve,
    unobserve: mockedUnobserve,
    disconnect: mockedDisconnect,
  });
  const target = ref(document.createElement('div'));
  onResize(target, hook);
  MockedResizeObserver.mock.calls.forEach(([fn], i) =>
    fn([], MockedResizeObserver.mock.results[i].value),
  );
  expect(hook).toBeCalled();
});

test('observe element on target set', async () => {
  MockedResizeObserver.mockReturnValueOnce({
    observe: mockedObserve,
    unobserve: mockedUnobserve,
    disconnect: mockedDisconnect,
  });
  const target = ref<HTMLElement>();
  onResize(target, () => null);
  const el = document.createElement('div');
  target.value = el;
  await nextTick();
  expect(mockedObserve).toBeCalledWith(el);
});

test('unobserve element on target set', async () => {
  MockedResizeObserver.mockReturnValueOnce({
    observe: mockedObserve,
    unobserve: mockedUnobserve,
    disconnect: mockedDisconnect,
  });
  const target = ref<HTMLElement>();
  onResize(target, () => null);
  const oldEl = document.createElement('div');
  target.value = oldEl;
  await nextTick();
  target.value = undefined;
  await nextTick();
  expect(mockedUnobserve).toBeCalledWith(oldEl);
});

test('disconnect on before unmount', async () => {
  MockedResizeObserver.mockReturnValueOnce({
    observe: mockedObserve,
    unobserve: mockedUnobserve,
    disconnect: mockedDisconnect,
  });
  const target = ref<HTMLElement>();
  onResize(target, () => null);
  mockedOnBeforeUnmount.mock.calls.forEach(([hook]) => hook());
  expect(mockedDisconnect).toBeCalled();
});

test('unsubscribe', () => {
  MockedResizeObserver.mockReturnValueOnce({
    observe: mockedObserve,
    unobserve: mockedUnobserve,
    disconnect: mockedDisconnect,
  });
  const target = ref<HTMLElement>();
  const unsub = onResize(target, () => null);
  unsub();
  expect(mockedDisconnect).toBeCalled();
});

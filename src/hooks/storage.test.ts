import { onBeforeUnmount, onMounted } from 'vue';
import { onStorage } from './storage';

let mockedAddEventListener: jest.Mock<
  ReturnType<Window['addEventListener']>,
  Parameters<Window['addEventListener']>
>;
let mockedRemoveEventListener: jest.Mock<
  ReturnType<Window['removeEventListener']>,
  Parameters<Window['removeEventListener']>
>;
const mockedOnMounted = onMounted as jest.Mock<
  ReturnType<typeof onMounted>,
  Parameters<typeof onMounted>
>;
const mockedOnBeforeUnmount = onBeforeUnmount as jest.Mock<
  ReturnType<typeof onBeforeUnmount>,
  Parameters<typeof onBeforeUnmount>
>;

beforeEach(() => {
  mockedAddEventListener = jest.fn();
  mockedRemoveEventListener = jest.fn();
  window.addEventListener = mockedAddEventListener;
  window.removeEventListener = mockedRemoveEventListener;
});

test('lifecycle', () => {
  onStorage(() => null);

  expect(mockedAddEventListener).not.toHaveBeenCalled();
  mockedOnMounted.mock.calls.forEach(([hook]) => hook());
  expect(mockedAddEventListener).toHaveBeenCalledWith('storage', expect.anything());

  expect(mockedRemoveEventListener).not.toHaveBeenCalled();
  mockedOnBeforeUnmount.mock.calls.forEach(([hook]) => hook());
  expect(mockedRemoveEventListener).toHaveBeenCalledWith(
    ...mockedAddEventListener.mock.calls[0],
  );
});

test('unsubscribe', () => {
  const unsub = onStorage(() => null);

  expect(mockedAddEventListener).not.toHaveBeenCalled();
  mockedOnMounted.mock.calls.forEach(([hook]) => hook());
  expect(mockedAddEventListener).toHaveBeenCalledWith('storage', expect.anything());

  expect(mockedRemoveEventListener).not.toHaveBeenCalled();
  unsub();
  expect(mockedRemoveEventListener).toHaveBeenCalledWith(
    ...mockedAddEventListener.mock.calls[0],
  );
});

import { onBeforeUnmount, onMounted } from 'vue';
import { useLocalStorage } from './local-storage';

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

test('initial value', () => {
  const [message] = useLocalStorage('message');
  expect(message.value).toBeNull();
});

test('set value on mounted', () => {
  const storage = new FakeStorage();
  storage.setItem('message', 'hello');
  const [message] = useLocalStorage('message', { storage });
  mockedOnMounted.mock.calls.forEach(([hook]) => hook());
  expect(message.value).toBe('hello');
});

test('set non-null value', () => {
  const storage = new FakeStorage();
  const [message, setMessage] = useLocalStorage('message', { storage });
  setMessage('hello');
  expect(message.value).toBe('hello');
  expect(storage.getItem('message')).toBe('hello');
});

test('set null value', () => {
  const storage = new FakeStorage();
  storage.setItem('message', 'hello');
  const [message, setMessage] = useLocalStorage('message', { storage });
  setMessage(null);
  expect(message.value).toBe(null);
  expect(storage.getMap().has('message')).toBeFalsy();
});

test('listen storage event', () => {
  useLocalStorage('message');

  expect(mockedAddEventListener).not.toBeCalled();
  mockedOnMounted.mock.calls.forEach(([hook]) => hook());
  expect(mockedAddEventListener).toBeCalledWith('storage', expect.anything());

  const listener = mockedAddEventListener.mock.calls[0][1];

  expect(mockedRemoveEventListener).not.toBeCalled();
  mockedOnBeforeUnmount.mock.calls.forEach(([hook]) => hook());
  expect(mockedRemoveEventListener).toBeCalledWith('storage', listener);
});

test('receive the value on storage event', () => {
  const storage = new FakeStorage();
  const [message] = useLocalStorage('message', { storage });
  mockedOnMounted.mock.calls.forEach(([hook]) => hook());
  mockedAddEventListener.mock.calls.forEach(([, listener]) => {
    const event = {
      storageArea: storage,
      key: 'message',
      newValue: 'hello',
    } as unknown as Event;
    if (typeof listener === 'function') listener(event);
    else listener.handleEvent(event);
  });
  expect(message.value).toBe('hello');
});

test('ignore other storageArea event', () => {
  const storage = new FakeStorage();
  const [message] = useLocalStorage('message', { storage });
  mockedOnMounted.mock.calls.forEach(([hook]) => hook());
  mockedAddEventListener.mock.calls.forEach(([, listener]) => {
    const event = {
      storageArea: new FakeStorage(),
      key: 'message',
      newValue: 'hello',
    } as unknown as Event;
    if (typeof listener === 'function') listener(event);
    else listener.handleEvent(event);
  });
  expect(message.value).toBeNull();
});

test('ignore other key event', () => {
  const storage = new FakeStorage();
  const [message] = useLocalStorage('message', { storage });
  mockedOnMounted.mock.calls.forEach(([hook]) => hook());
  mockedAddEventListener.mock.calls.forEach(([, listener]) => {
    const event = {
      storageArea: storage,
      key: 'other',
      newValue: 'hello',
    } as unknown as Event;
    if (typeof listener === 'function') listener(event);
    else listener.handleEvent(event);
  });
  expect(message.value).toBeNull();
});

class FakeStorage implements Storage {
  private readonly map = new Map<string, string>();

  public get length(): number {
    return this.map.size;
  }

  public clear(): void {
    this.map.clear();
  }

  public getItem(key: string): string | null {
    return this.map.get(key) ?? null;
  }

  public key(index: number): string | null {
    return [...this.map.keys()][index] ?? null;
  }

  public removeItem(key: string): void {
    this.map.delete(key);
  }

  public setItem(key: string, value: string): void {
    this.map.set(key, value);
  }

  public getMap(): Map<string, string> {
    return this.map;
  }
}

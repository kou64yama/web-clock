import { onMounted } from 'vue';
import { onStorage } from '../../hooks/storage';
import { storageRef } from './storageRef';

const mockedOnMounted = onMounted as jest.Mock<
  ReturnType<typeof onMounted>,
  Parameters<typeof onMounted>
>;
const mockedOnStorage = onStorage as jest.Mock<
  ReturnType<typeof onStorage>,
  Parameters<typeof onStorage>
>;

jest.mock('../../hooks/storage');

test('initial value', () => {
  const storage = new FakeStorage();
  const message = storageRef('message', { storage });
  expect(message.value).toBeNull();
});

test('set value on mounted', () => {
  const storage = new FakeStorage();
  storage.setItem('message', 'hello');
  const message = storageRef('message', { storage });
  mockedOnMounted.mock.calls.forEach(([hook]) => hook());
  expect(message.value).toBe('hello');
});

test('set non-null value', () => {
  const storage = new FakeStorage();
  const message = storageRef('message', { storage });
  message.value = 'hello';
  expect(message.value).toBe('hello');
  expect(storage.getItem('message')).toBe('hello');
});

test('set null value', () => {
  const storage = new FakeStorage();
  storage.setItem('message', 'hello');
  const message = storageRef('message', { storage });
  message.value = null;
  expect(message.value).toBe(null);
  expect(storage.getMap().has('message')).toBeFalsy();
});

test('receive the value on storage event', () => {
  const storage = new FakeStorage();
  const message = storageRef('message', { storage });
  mockedOnStorage.mock.calls.forEach(([hook]) => {
    const event = {
      storageArea: storage,
      key: 'message',
      newValue: 'hello',
    } as unknown as StorageEvent;
    hook(event);
  });
  expect(message.value).toBe('hello');
});

test('ignore other storageArea event', () => {
  const storage = new FakeStorage();
  const message = storageRef('message', { storage });
  mockedOnStorage.mock.calls.forEach(([hook]) => {
    const event = {
      storageArea: new FakeStorage(),
      key: 'message',
      newValue: 'hello',
    } as unknown as StorageEvent;
    hook(event);
  });
  expect(message.value).toBeNull();
});

test('ignore other key event', () => {
  const storage = new FakeStorage();
  const message = storageRef('message', { storage });
  mockedOnStorage.mock.calls.forEach(([hook]) => {
    const event = {
      storageArea: storage,
      key: 'other',
      newValue: 'hello',
    } as unknown as StorageEvent;
    hook(event);
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

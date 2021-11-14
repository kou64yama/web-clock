import { computed, ref } from 'vue';
import { localStorageRef } from '../refs/storage';
import { DURATION, STARTED, useChronograph } from './chronograph';

jest.mock('../refs/storage');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type MockOf<T extends (...args: any[]) => any> = jest.Mock<
  ReturnType<T>,
  Parameters<T>
>;

const mockedLocalStorageRef = localStorageRef as MockOf<typeof localStorageRef>;

const storage = <T>(initialValue: T) => {
  const refValue = ref<T>(initialValue);
  return computed({
    get: () => refValue.value,
    set: (value) => (refValue.value = value),
  });
};

test('initial value', () => {
  const started = storage<number | null>(null);
  const stored = storage<number>(0);
  mockedLocalStorageRef.mockImplementation((key) => {
    if (key === STARTED) return started;
    if (key === DURATION) return stored;
    return storage(null);
  });

  const quartz = ref(0);
  const { duration, paused } = useChronograph(quartz);
  expect(duration.value).toBe(0);
  expect(paused.value).toBeTruthy();
});

test('started', () => {
  const started = storage<number | null>(0);
  const stored = storage<number>(0);
  mockedLocalStorageRef.mockImplementation((key) => {
    if (key === STARTED) return started;
    if (key === DURATION) return stored;
    return storage(null);
  });

  const quartz = ref(10);
  const { duration, paused } = useChronograph(quartz);
  expect(duration.value).toBe(10);
  expect(paused.value).toBeFalsy();
});

test('stored', () => {
  const started = storage<number | null>(20);
  const stored = storage<number>(10);
  mockedLocalStorageRef.mockImplementation((key) => {
    if (key === STARTED) return started;
    if (key === DURATION) return stored;
    return storage(null);
  });

  const quartz = ref(30);
  const { duration, paused } = useChronograph(quartz);
  expect(duration.value).toBe(20);
  expect(paused.value).toBeFalsy();
});

test('start', () => {
  const started = storage<number | null>(null);
  const stored = storage<number>(0);
  mockedLocalStorageRef.mockImplementation((key) => {
    if (key === STARTED) return started;
    if (key === DURATION) return stored;
    return storage(null);
  });

  const quartz = ref(0);
  const { duration, paused, startOrStop } = useChronograph(quartz);
  startOrStop();
  quartz.value = 10;
  expect(duration.value).toBe(10);
  expect(paused.value).toBeFalsy();
});

test('stop', () => {
  const started = storage<number | null>(0);
  const stored = storage<number>(0);
  mockedLocalStorageRef.mockImplementation((key) => {
    if (key === STARTED) return started;
    if (key === DURATION) return stored;
    return storage(null);
  });

  const quartz = ref(10);
  const { duration, paused, startOrStop } = useChronograph(quartz);
  startOrStop();
  expect(duration.value).toBe(10);
  expect(paused.value).toBeTruthy();
});

test('reset', () => {
  const started = storage<number | null>(0);
  const stored = storage<number>(10);
  mockedLocalStorageRef.mockImplementation((key) => {
    if (key === STARTED) return started;
    if (key === DURATION) return stored;
    return storage(null);
  });

  const quartz = ref(100);
  const { duration, paused, reset } = useChronograph(quartz);
  reset();
  expect(duration.value).toBe(0);
  expect(paused.value).toBeTruthy();
});

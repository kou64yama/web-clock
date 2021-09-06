import { computed, ref } from 'vue';
import { useLocalStorage } from '../compositions/storage';
import { DURATION, STARTED, useChronograph } from './chronograph';

jest.mock('../compositions/storage');

const mockedUseLocalStorage = useLocalStorage as jest.Mock<
  ReturnType<typeof useLocalStorage>,
  Parameters<typeof useLocalStorage>
>;

const storage = (initialValue: string | null) => {
  const refValue = ref<string | null>(initialValue);
  return computed({
    get: () => refValue.value,
    set: (value) => (refValue.value = value),
  });
};

test('initial value', () => {
  const rawStarted = storage(null);
  const rawStored = storage(null);
  mockedUseLocalStorage.mockImplementation((key) => {
    if (key === STARTED) return rawStarted;
    if (key === DURATION) return rawStored;
    return storage(null);
  });

  const quartz = ref(0);
  const { duration, paused } = useChronograph(quartz);
  expect(duration.value).toBe(0);
  expect(paused.value).toBeTruthy();
});

test('started', () => {
  const rawStarted = storage('0');
  const rawStored = storage(null);
  mockedUseLocalStorage.mockImplementation((key) => {
    if (key === STARTED) return rawStarted;
    if (key === DURATION) return rawStored;
    return storage(null);
  });

  const quartz = ref(10);
  const { duration, paused } = useChronograph(quartz);
  expect(duration.value).toBe(10);
  expect(paused.value).toBeFalsy();
});

test('stored', () => {
  const rawStarted = storage('20');
  const rawStored = storage('10');
  mockedUseLocalStorage.mockImplementation((key) => {
    if (key === STARTED) return rawStarted;
    if (key === DURATION) return rawStored;
    return storage(null);
  });

  const quartz = ref(30);
  const { duration, paused } = useChronograph(quartz);
  expect(duration.value).toBe(20);
  expect(paused.value).toBeFalsy();
});

test('start', () => {
  const rawStarted = storage(null);
  const rawStored = storage(null);
  mockedUseLocalStorage.mockImplementation((key) => {
    if (key === STARTED) return rawStarted;
    if (key === DURATION) return rawStored;
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
  const rawStarted = storage('0');
  const rawStored = storage(null);
  mockedUseLocalStorage.mockImplementation((key) => {
    if (key === STARTED) return rawStarted;
    if (key === DURATION) return rawStored;
    return storage(null);
  });

  const quartz = ref(10);
  const { duration, paused, startOrStop } = useChronograph(quartz);
  startOrStop();
  expect(duration.value).toBe(10);
  expect(paused.value).toBeTruthy();
});

test('reset', () => {
  const rawStarted = storage('0');
  const rawStored = storage('10');
  mockedUseLocalStorage.mockImplementation((key) => {
    if (key === STARTED) return rawStarted;
    if (key === DURATION) return rawStored;
    return storage(null);
  });

  const quartz = ref(100);
  const { duration, paused, reset } = useChronograph(quartz);
  reset();
  expect(duration.value).toBe(0);
  expect(paused.value).toBeTruthy();
});

test('invalid started value stored', () => {
  const rawStarted = storage('invalid');
  const rawStored = storage(null);
  mockedUseLocalStorage.mockImplementation((key) => {
    if (key === STARTED) return rawStarted;
    if (key === DURATION) return rawStored;
    return storage(null);
  });

  const quartz = ref(0);
  const { duration, paused } = useChronograph(quartz);
  expect(duration.value).toBe(0);
  expect(paused.value).toBeTruthy();
});

test('invalid duration value stored', () => {
  const rawStarted = storage(null);
  const rawStored = storage('invalid');
  mockedUseLocalStorage.mockImplementation((key) => {
    if (key === STARTED) return rawStarted;
    if (key === DURATION) return rawStored;
    return storage(null);
  });

  const quartz = ref(0);
  const { duration, paused } = useChronograph(quartz);
  expect(duration.value).toBe(0);
  expect(paused.value).toBeTruthy();
});

import { localStorageRef, storageRef } from '.';

jest.mock('./storageRef');

test('storage is localStorage', () => {
  localStorageRef('message');
  expect(storageRef).toBeCalledWith('message', {
    storage: window.localStorage,
  });
});

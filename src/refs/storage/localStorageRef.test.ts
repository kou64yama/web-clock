import { localStorageRef, storageRef } from '.';

jest.mock('./storageRef');

test('storage is localStorage', () => {
  localStorageRef('message');
  expect(storageRef).toHaveBeenCalledWith('message', {
    storage: window.localStorage,
  });
});

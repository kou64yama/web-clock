import { gear } from './utils';

describe('gear', () => {
  test('gear ratio 10:1', () => {
    expect(gear(10, 1)(0)).toBe(0);
    expect(gear(10, 1)(900)).toBe(90);
    expect(gear(10, 1)(1800)).toBe(180);
    expect(gear(10, 1)(2700)).toBe(270);
    expect(gear(10, 1)(3600)).toBe(0);
  });
});

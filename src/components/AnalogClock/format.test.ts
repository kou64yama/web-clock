import { chronograph } from './format';
import { HOUR, MILLISECOND, MINUTE, SECOND } from './utils';

describe('chronograph', () => {
  test.each([
    [0, `00°00'00.000"`],
    [1 * MILLISECOND, `00°00'00.001"`],
    [999 * MILLISECOND, `00°00'00.999"`],
    [1 * SECOND, `00°00'01.000"`],
    [59 * SECOND, `00°00'59.000"`],
    [1 * MINUTE, `00°01'00.000"`],
    [59 * MINUTE, `00°59'00.000"`],
    [1 * HOUR, `01°00'00.000"`],
    [
      99 * HOUR + 59 * MINUTE + 59 * SECOND + 999 * MILLISECOND,
      `99°59'59.999"`,
    ],
  ])('format duration %d to %s', (duration, expected) => {
    const formatted = chronograph(duration);
    expect(formatted).toBe(expected);
  });
});

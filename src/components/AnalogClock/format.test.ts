import { chronograph, date, time } from './format';
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

describe('date', () => {
  test.each([
    [0, 'UTC', '1970-01-01'],
    [86400000 - 1, 'UTC', '1970-01-01'],
    [0 - 32400000, 'Asia/Tokyo', '1970-01-01'],
    [86400000 - 32400000 - 1, 'Asia/Tokyo', '1970-01-01'],
  ])('format epoch=%d timeZone=%s', (epoch, timeZone, expected) => {
    expect(date(epoch, timeZone)).toBe(expected);
  });
});

describe('time', () => {
  test.each([
    [0, 'UTC', '00:00:00'],
    [86400000 - 1, 'UTC', '23:59:59'],
    [0 - 32400000, 'Asia/Tokyo', '00:00:00'],
    [86400000 - 32400000 - 1, 'Asia/Tokyo', '23:59:59'],
  ])('format epoch=%d timeZone=%s', (epoch, timeZone, expected) => {
    expect(time(epoch, timeZone)).toBe(expected);
  });
});

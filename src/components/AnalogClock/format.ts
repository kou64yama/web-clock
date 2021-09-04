import { HOUR, MILLISECOND, MINUTE, SECOND } from './utils';

const hours = (duration: number): string =>
  Math.floor(duration / HOUR)
    .toString()
    .padStart(2, '0');
const minutes = (duration: number): string =>
  (Math.floor(duration / MINUTE) % (HOUR / MINUTE)).toString().padStart(2, '0');
const seconds = (duration: number): string =>
  (Math.floor(duration / SECOND) % (MINUTE / SECOND))
    .toString()
    .padStart(2, '0');
const millis = (duration: number): string =>
  (Math.floor(duration / MILLISECOND) % (SECOND / MILLISECOND))
    .toString()
    .padStart(3, '0');

export const chronograph = (duration: number): string =>
  `${hours(duration)}°${minutes(duration)}'${seconds(duration)}.${millis(
    duration,
  )}"`;

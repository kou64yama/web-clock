import { HOUR, MINUTE, SECOND } from './utils';

const hours = (duration: number): string =>
  Math.floor(duration / HOUR)
    .toString()
    .padStart(2, '0');
const minutes = (duration: number): string =>
  (Math.floor(duration / MINUTE) % 60).toString().padStart(2, '0');
const seconds = (duration: number): string =>
  (Math.floor(duration / SECOND) % 60).toString().padStart(2, '0');
const millis = (duration: number): string =>
  (Math.floor(duration) % 1000).toString().padEnd(3, '0');

export const chronograph = (duration: number): string =>
  `${hours(duration)}°${minutes(duration)}'${seconds(duration)}.${millis(
    duration,
  )}"`;

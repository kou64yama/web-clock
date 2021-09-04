export const MILLISECOND = 1;
export const SECOND = 1000 * MILLISECOND;
export const MINUTE = 60 * SECOND;
export const HOUR = 60 * MINUTE;

type Gear = (x: number) => number;

/**
 * Returns the gear-like function that converts the time to an angle.
 *
 * For example, if the gear ratio is set to 60000:360, the returned
 * function will behave as a 360-degree rotation in 60 seconds.
 *
 * @param a The parameter a of the gear ratio
 * @param b The parameter b of the gear ratio
 */
export const gear = (a: number, b: number): Gear => {
  const r = b / a;
  return (x) => (r * x) % 360;
};

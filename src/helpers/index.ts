export const undefinedOrNull = <T>(
  variable: T | null | undefined
): variable is null | undefined => {
  return typeof variable === 'undefined' || variable === null;
};

export function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

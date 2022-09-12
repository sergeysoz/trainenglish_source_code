/**
 * Two set operations in mathematical meaning
 *
 */

export function subtract(arr, element) {
  return arr.filter((item) => item !== element);
}

export function subset(arr, element) {
  return arr.filter((item) => item === element);
}

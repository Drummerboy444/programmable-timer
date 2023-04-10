import * as O from 'fp-ts/Option';
import { stringToNumberOption } from '../utils';

describe('stringToNumberOption', () => {
  it('should return none for an empty string', () => {
    expect(stringToNumberOption('')).toBe(O.none);
  });

  it('should return none for a string with no numeric characters', () => {
    expect(stringToNumberOption('abcd')).toBe(O.none);
  });

  it('should return a number for a string with only numeric characters', () => {
    expect(stringToNumberOption('1234')).toEqual(O.some(1234));
  });

  it('should return a number for a string with some numeric and some non-numeric characters', () => {
    expect(stringToNumberOption('a1b2c3d4')).toEqual(O.some(1234));
  });
});

import { flow } from 'fp-ts/lib/function';
import * as ROA from 'fp-ts/ReadonlyArray';
import * as S from 'fp-ts/string';
import * as fc from 'fast-check';
import { getUuid, isUuid } from '../uuid';

const LETTER_OR_DASH = /[a-z]|-/;

const isLetterOrDash = (character: string) => LETTER_OR_DASH.test(character);

const isLettersOrDashes = flow(S.split(''), ROA.every(isLetterOrDash));

describe('getUuid', () => {
  it('should return a string of fixed length', () => {
    const uuid = getUuid();
    expect(uuid).toHaveLength(29);
  });

  it('should return a string interspersed with 5 dashes at fixed intervals', () => {
    const uuid = getUuid();
    const uuidWithoutDashes = uuid.replaceAll('-', '');

    expect(uuid[4]).toBe('-');
    expect(uuid[9]).toBe('-');
    expect(uuid[14]).toBe('-');
    expect(uuid[19]).toBe('-');
    expect(uuid[24]).toBe('-');
    expect(uuidWithoutDashes).toHaveLength(24);
  });

  it('should return a string of only letters and dashes', () => {
    const uuid = getUuid();
    expect(isLettersOrDashes(uuid)).toBe(true);
  });

  it('should return different strings on subsequent calls', () => {
    const uuid1 = getUuid();
    const uuid2 = getUuid();

    expect(uuid1).not.toBe(uuid2);
  });
});

describe('isUuid', () => {
  it('should return true for a valid Uuid', () => {
    expect(isUuid(getUuid())).toBe(true);
  });

  it('should return false for a non-string', () => {
    fc.assert(
      fc.property(
        fc.anything().filter(anything => typeof anything !== 'string'),
        anything => {
          expect(isUuid(anything)).toBe(false);
        },
      ),
    );
  });

  it('should return false for a string of the wrong length', () => {
    expect(
      isUuid(
        Array.from({ length: 20 })
          .map(() => 'a')
          .join(''),
      ),
    ).toBe(false);
  });

  it('should return false for a string with the wrong number of chunks', () => {
    expect(isUuid('aaaa-aaaa-aaaa-aaaa-aaaa-aaaa-aaaa')).toBe(false);
  });

  it('should return false for a string with the wrong chunk sizes', () => {
    expect(isUuid('aaa-aaaaa-aaaa-aaaa-aaaa-aaaa')).toBe(false);
  });

  it('should return false for a string with invalid characters', () => {
    expect(isUuid('1111-1111-1111-1111-1111-1111')).toBe(false);
  });
});

import { flow } from 'fp-ts/lib/function';
import * as ROA from 'fp-ts/ReadonlyArray';
import * as S from 'fp-ts/string';
import { getUuid } from '../uuid';

const LETTER_OR_DASH = /[a-z]|-/;

const isLetterOrDash = (character: string) => LETTER_OR_DASH.test(character);

const isLettersOrDashes = flow(S.split(''), ROA.every(isLetterOrDash));

describe('getUuid', () => {
  it('should return a string of fixed length', () => {
    const uuid = getUuid();
    expect(uuid).toHaveLength(29);
  });

  it('should return a string interspersed with 3 dashes at fixed intervals', () => {
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

import { flow, constant } from 'fp-ts/lib/function';
import * as A from 'fp-ts/Array';
import * as S from 'fp-ts/string';
import { Brand } from '../types/brand';

export type Uuid = Brand<string, 'Uuid'>;

const LENGTH = 24;
const CHUNK_SIZE = 4;
const SEPARATOR = '-';
const MIN_CHARACTER_CODE = 97;
const MAX_CHARACTER_CODE = 122;

const getRandomCharacterCode = () =>
  MIN_CHARACTER_CODE +
  Math.floor(Math.random() * (MAX_CHARACTER_CODE - MIN_CHARACTER_CODE + 1));

const toCharacter = (characterCode: number) =>
  String.fromCharCode(characterCode);

const EMPTY_UUID = A.replicate(LENGTH, undefined);

export const getUuid: () => Uuid = flow(
  constant(EMPTY_UUID),
  A.map(getRandomCharacterCode),
  A.map(toCharacter),
  A.chunksOf(CHUNK_SIZE),
  A.intersperse([SEPARATOR]),
  A.flatten,
  A.reduce(S.empty, S.Monoid.concat),
  s => s as Uuid,
);

export const isUuid = (x: unknown): x is Uuid => {
  if (typeof x !== 'string') return false;
  if (x.length !== 29) return false;

  const splitOnSeparator = x.split(SEPARATOR);

  if (splitOnSeparator.length !== LENGTH / CHUNK_SIZE) return false;
  if (!splitOnSeparator.every(chunk => chunk.length === CHUNK_SIZE))
    return false;
  if (
    !splitOnSeparator.every(chunk =>
      chunk
        .split('')
        .every(
          character =>
            character.charCodeAt(0) >= MIN_CHARACTER_CODE &&
            character.charCodeAt(0) <= MAX_CHARACTER_CODE,
        ),
    )
  )
    return false;

  return true;
};

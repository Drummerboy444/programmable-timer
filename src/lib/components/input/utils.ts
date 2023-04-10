import * as O from 'fp-ts/Option';
import * as P from 'fp-ts/Predicate';
import { flow } from 'fp-ts/lib/function';
import * as S from 'fp-ts/string';

const NUMBER_REGEX = /[^0-9]/g;

const removeNonNumerics = (s: string) => s.replaceAll(NUMBER_REGEX, '');

export const stringToNumberOption = flow(
  removeNonNumerics,
  O.fromPredicate(P.not(S.isEmpty)),
  O.map(s => Number(s)),
  O.filter(P.not(Number.isNaN)),
);

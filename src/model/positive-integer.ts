import { flow } from 'fp-ts/lib/function';
import * as t from 'io-ts';
import * as E from 'fp-ts/Either';

interface PositiveBrand {
  readonly Positive: unique symbol;
}

const isPositive = (n: number): n is t.Branded<number, PositiveBrand> => n > 0;

const Positive = t.brand(t.number, isPositive, 'Positive');

type Positive = t.TypeOf<typeof Positive>;

const PositiveInteger = t.intersection([Positive, t.Int]);

export type PositiveInteger = t.TypeOf<typeof PositiveInteger>;

export const parseToPositiveInteger = flow(
  PositiveInteger.decode,
  E.mapLeft(() => 'NOT_A_POSITIVE_INTEGER' as const),
);

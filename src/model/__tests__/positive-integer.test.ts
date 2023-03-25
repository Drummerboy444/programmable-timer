import * as fc from 'fast-check';
import * as E from 'fp-ts/Either';
import { flow } from 'fp-ts/lib/function';
import { parseToPositiveInteger } from '../positive-integer';

describe('parseToPositiveInteger', () => {
  it('should always return an error for a non-positive integer', () => {
    fc.assert(
      fc.property(
        fc.integer({ max: 0 }),
        flow(parseToPositiveInteger, E.isLeft),
      ),
    );
  });

  it('should always return an error for a non-integer', () => {
    fc.assert(
      fc.property(
        fc.float().filter(float => float !== Math.floor(float)),
        flow(parseToPositiveInteger, E.isLeft),
      ),
    );
  });

  it('should always succeed for a positive integer', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1 }),
        flow(parseToPositiveInteger, E.isRight),
      ),
    );
  });
});

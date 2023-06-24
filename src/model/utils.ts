import * as A from 'fp-ts/Array';
import * as O from 'fp-ts/Option';
import * as P from 'fp-ts/Predicate';
import { flow, identity, pipe } from 'fp-ts/lib/function';
import * as S from 'fp-ts/string';
import { isUuid } from '../lib/utils/uuid';
import { Timer, TimingUnit } from './types';

const TIMERS_SEPARATOR = '~%~%~%~';
const TIMER_SEPARATOR = '~%~';
const TIMING_UNITS_SEPARATOR = '~#~#~#~';
const TIMING_UNIT_SEPARATOR = '~#~';

const serialiseArray = <T>(serialise: (t: T) => string, separator: string) =>
  flow(
    A.map(serialise),
    A.intersperse(separator),
    A.reduce(S.empty, S.Monoid.concat),
  );

const serialiseTimingUnit = (timingUnit: TimingUnit) =>
  timingUnit.type === 'automatic'
    ? `${timingUnit.id}${TIMING_UNIT_SEPARATOR}${timingUnit.name}${TIMING_UNIT_SEPARATOR}${timingUnit.length}`
    : `${timingUnit.id}${TIMING_UNIT_SEPARATOR}${timingUnit.name}`;

const serialiseTimingUnits = serialiseArray(
  serialiseTimingUnit,
  TIMING_UNITS_SEPARATOR,
);

const serialiseTimer = ({ id, name, timingUnits }: Timer) =>
  `${id}${TIMER_SEPARATOR}${name}${TIMER_SEPARATOR}[${serialiseTimingUnits(
    timingUnits,
  )}]`;

export const serialiseTimers = serialiseArray(serialiseTimer, TIMERS_SEPARATOR);

const isLength2Tuple = (s: string[]): s is [string, string] => s.length === 2;

const isLength3Tuple = (s: string[]): s is [string, string, string] =>
  s.length === 3;

const deserialiseTimingUnit = (
  serialisedTimingUnit: string,
): O.Option<TimingUnit> => {
  if (serialisedTimingUnit === '') return O.none;

  const splitSerialisedTimingUnit = serialisedTimingUnit.split(
    TIMING_UNIT_SEPARATOR,
  );

  if (
    !isLength2Tuple(splitSerialisedTimingUnit) &&
    !isLength3Tuple(splitSerialisedTimingUnit)
  )
    return O.none;

  if (isLength2Tuple(splitSerialisedTimingUnit)) {
    const [id, name] = splitSerialisedTimingUnit;

    if (!isUuid(id)) return O.none;

    return O.of({ id, type: 'manual', name });
  }

  const [id, name, length] = splitSerialisedTimingUnit;

  if (!isUuid(id)) return O.none;

  const numberLength = Number(length);

  if (Number.isNaN(numberLength)) return O.none;

  return O.of({ id, type: 'automatic', name, length: numberLength });
};

const deserialiseTimingUnits = (
  serialisedTimingUnits: string,
): O.Option<TimingUnit[]> => {
  if (serialisedTimingUnits.length < 2) return O.none;
  if (serialisedTimingUnits[0] !== '[') return O.none;
  if (serialisedTimingUnits[serialisedTimingUnits.length - 1] !== ']')
    return O.none;

  const withoutParens = serialisedTimingUnits.substring(
    1,
    serialisedTimingUnits.length - 1,
  );

  if (withoutParens.length === 0) return O.of([]);

  const splitSerialisedTimingUnits = withoutParens.split(
    TIMING_UNITS_SEPARATOR,
  );

  return pipe(
    splitSerialisedTimingUnits.map(deserialiseTimingUnit),
    O.sequenceArray,
    O.map(as => [...as]),
  );
};

const deserialiseTimer = (serialisedTimer: string): O.Option<Timer> => {
  const splitSerialisedTimer = serialisedTimer.split(TIMER_SEPARATOR);

  if (!isLength3Tuple(splitSerialisedTimer)) return O.none;

  const [id, name, serialisedTimingUnits] = splitSerialisedTimer;

  if (!isUuid(id)) return O.none;

  const deserialisedTimingUnits = deserialiseTimingUnits(serialisedTimingUnits);

  return O.of({
    id,
    name,
    timingUnits: pipe(
      deserialisedTimingUnits,
      O.getOrElse<TimingUnit[]>(() => []),
    ),
  });
};

export const deserialiseTimers = flow(
  O.fromPredicate(P.not(S.isEmpty)),
  O.map(flow(S.split(TIMERS_SEPARATOR), as => [...as])),
  O.match(() => [], identity),
  A.map(deserialiseTimer),
  O.sequenceArray,
  O.match(() => [], identity),
);

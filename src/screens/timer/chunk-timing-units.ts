import * as NEA from 'fp-ts/NonEmptyArray';
import {
  AutomaticTimingUnit,
  ManualTimingUnit,
  TimingUnit,
} from '../../model/types';

export const chunkTimingUnits = (timingUnits: TimingUnit[]) => {
  const timingUnitChunks: (
    | ManualTimingUnit
    | NEA.NonEmptyArray<AutomaticTimingUnit>
  )[] = [];

  timingUnits.forEach(timingUnit => {
    if (timingUnit.type === 'manual') {
      timingUnitChunks.push(timingUnit);
      return;
    }

    const previous = timingUnitChunks[timingUnitChunks.length - 1];

    if (Array.isArray(previous)) {
      previous.push(timingUnit);
      return;
    }

    timingUnitChunks.push([timingUnit]);
  });

  return timingUnitChunks;
};

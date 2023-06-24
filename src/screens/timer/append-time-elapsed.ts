import { AutomaticTimingUnit } from '../../model/types';

export const appendTimeElapsed =
  (totalTimeElapsed: number) => (timingUnits: AutomaticTimingUnit[]) => {
    let remainingTimeElapsed = totalTimeElapsed;
    const timingUnitsWithTimesElapsed: (AutomaticTimingUnit & {
      timeElapsed: number;
    })[] = [];

    timingUnits.forEach(timingUnit => {
      if (remainingTimeElapsed === 0) {
        timingUnitsWithTimesElapsed.push({
          ...timingUnit,
          timeElapsed: 0,
        });
      } else if (remainingTimeElapsed >= timingUnit.length) {
        remainingTimeElapsed -= timingUnit.length;
        timingUnitsWithTimesElapsed.push({
          ...timingUnit,
          timeElapsed: timingUnit.length,
        });
      } else {
        timingUnitsWithTimesElapsed.push({
          ...timingUnit,
          timeElapsed: remainingTimeElapsed,
        });
        remainingTimeElapsed = 0;
      }
    });

    return timingUnitsWithTimesElapsed;
  };

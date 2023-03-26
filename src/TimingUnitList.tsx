import React, { View } from 'react-native';
import * as O from 'fp-ts/Option';
import * as A from 'fp-ts/Array';
import * as N from 'fp-ts/number';
import { pipe } from 'fp-ts/lib/function';
import { TimingUnit } from './model/timing-unit';
import { useSizes } from './sizing/use-sizes';
import { TimingUnitListItem } from './TimingUnitListItem';

export const TimingUnitList = ({
  timingUnits,
  timeElapsed,
}: {
  timingUnits: TimingUnit[];
  timeElapsed: O.Option<number>;
}) => {
  const { medium } = useSizes();

  const timingUnitsWithTimeRemaining = pipe(
    timingUnits,
    A.reduce<TimingUnit, (TimingUnit & { timeRemaining: number })[]>(
      [],
      (timingUnitsWithTimeRemainingAcc, timingUnit) => {
        const nextTimeRemaining = O.isSome(timeElapsed)
          ? Math.min(
              timeElapsed.value -
                pipe(
                  timingUnitsWithTimeRemainingAcc,
                  A.map(({ timeRemaining }) => timeRemaining),
                  A.reduce(N.MonoidSum.empty, N.MonoidSum.concat),
                ),
              timingUnit.length,
            )
          : 0;

        return [
          ...timingUnitsWithTimeRemainingAcc,
          {
            ...timingUnit,
            timeRemaining: nextTimeRemaining,
          },
        ];
      },
    ),
  );

  return (
    <>
      {timingUnitsWithTimeRemaining.map(({ timeRemaining, ...timingUnit }) => (
        <View
          style={{
            paddingBottom: medium,
          }}
          key={timingUnit.id}
        >
          <TimingUnitListItem
            timingUnit={timingUnit}
            timeRemaining={timeRemaining}
          />
        </View>
      ))}
    </>
  );
};

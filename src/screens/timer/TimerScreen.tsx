import * as A from 'fp-ts/Array';
import { pipe } from 'fp-ts/lib/function';
import React, { View } from 'react-native';
import { useEffect } from 'react';
import { useTimer } from '../../lib/hooks/use-timer';
import { Timer } from '../../model/types';
import { useSizes } from '../../theming/use-sizes';
import { Screen } from '../Screen';
import { PlayButton } from './PlayButton';
import { TimingUnitListItem } from './TimingUnitListItem';
import { appendTimeElapsed } from './append-time-elapsed';
import { Button } from '../../lib/components/buttons/Button';
import { Text } from '../../lib/components/Text';

export const TimerScreen = ({ timer }: { timer: Timer }) => {
  const { small } = useSizes();
  const {
    playing,
    timeElapsed: totalTimeElapsed,
    togglePlaying,
    reset,
  } = useTimer();

  // The empty dependency is to act as componentDidMount.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => togglePlaying(), []);

  const isDone = pipe(
    timer.timingUnits,
    A.map(({ length }) => length),
    A.reduce(0, (a, b) => a + b),
    totalLength => totalTimeElapsed >= totalLength,
  );

  return (
    <Screen>
      <View style={{ gap: small }}>
        {pipe(
          timer.timingUnits,
          appendTimeElapsed(totalTimeElapsed),
          A.map(({ timeElapsed, ...timingUnit }) => (
            <TimingUnitListItem
              key={timingUnit.id}
              timingUnit={timingUnit}
              timeElapsed={timeElapsed}
            />
          )),
        )}
        <View
          style={{ flexDirection: 'row', gap: small, alignItems: 'center' }}
        >
          <Button title="Reset" onPress={reset} />
          <PlayButton playing={playing} togglePlaying={togglePlaying} />
          {isDone && <Text>Done!</Text>}
        </View>
      </View>
    </Screen>
  );
};

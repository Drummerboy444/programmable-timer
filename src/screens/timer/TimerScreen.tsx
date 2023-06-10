import * as A from 'fp-ts/Array';
import { pipe } from 'fp-ts/lib/function';
import React, { View } from 'react-native';
import { useTimer } from '../../lib/hooks/useTimer';
import { Timer } from '../../model/types';
import { useSizes } from '../../theming/use-sizes';
import { Screen } from '../Screen';
import { PlayButton } from './PlayButton';
import { TimingUnitListItem } from './TimingUnitListItem';
import { appendTimeElapsed } from './appendTimeElapsed';
import { Button } from '../../lib/components/buttons/Button';

export const TimerScreen = ({ timer }: { timer: Timer }) => {
  const { small } = useSizes();
  const {
    playing,
    timeElapsed: totalTimeElapsed,
    togglePlaying,
    reset,
  } = useTimer();

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
        <View style={{ flexDirection: 'row', gap: small }}>
          <Button title="Reset" onPress={reset} />
          <PlayButton playing={playing} togglePlaying={togglePlaying} />
        </View>
      </View>
    </Screen>
  );
};

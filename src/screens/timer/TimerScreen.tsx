import { useContext } from 'react';
import React, { View } from 'react-native';
import { GlobalContext } from '../../global-context/GlobalContext';
import { Button } from '../../lib/components/buttons/Button';
import { Timer, TimingUnit } from '../../model/types';
import { useSizes } from '../../theming/use-sizes';
import { Screen } from '../Screen';
import { NewTimingUnitForm } from './NewTimingUnitForm';
import { PlayButton } from './PlayButton';
import { TimingUnitListItem } from './TimingUnitListItem';
import { useTimer } from './useTimer';
import { appendTimeElapsed } from './appendTimeElapsed';

export const TimerScreen = ({
  timer,
  setTimer,
}: {
  timer: Timer;
  setTimer: (timer: Timer) => void;
}) => {
  const { small } = useSizes();

  const { setDrawerState } = useContext(GlobalContext);

  const addNewTimingUnit = (timingUnit: TimingUnit) => {
    setTimer({ ...timer, timingUnits: [...timer.timingUnits, timingUnit] });
    setDrawerState({ open: false });
  };

  const openDrawer = () => {
    setDrawerState({
      open: true,
      content: <NewTimingUnitForm onSubmit={addNewTimingUnit} />,
    });
  };

  const { playing, timeElapsed, togglePlaying, reset } = useTimer();

  return (
    <Screen style={{ justifyContent: 'space-between' }}>
      <View style={{ gap: small }}>
        {appendTimeElapsed(timer.timingUnits, timeElapsed).map(
          timingUnitWithTimeElapsed => (
            <TimingUnitListItem
              key={timingUnitWithTimeElapsed.id}
              timingUnitWithTimeElapsed={timingUnitWithTimeElapsed}
            />
          ),
        )}
        <Button title="New +" onPress={openDrawer} />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: small }}>
        <Button title="Reset" onPress={reset} />
        <PlayButton playing={playing} togglePlaying={togglePlaying} />
      </View>
    </Screen>
  );
};

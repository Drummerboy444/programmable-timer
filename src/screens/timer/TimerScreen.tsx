import { useContext } from 'react';
import React, { View } from 'react-native';
import { GlobalContext } from '../../global-context/GlobalContext';
import { Button } from '../../lib/components/buttons/Button';
import { Timer, TimingUnit } from '../../model/types';
import { useSizes } from '../../theming/use-sizes';
import { Screen } from '../Screen';
import { NewTimingUnitForm } from './NewTimingUnitForm';
import { TimingUnitListItem } from './TimingUnitListItem';

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

  return (
    <Screen>
      <View style={{ gap: small }}>
        {timer.timingUnits.map(timingUnit => (
          <TimingUnitListItem key={timingUnit.id} timingUnit={timingUnit} />
        ))}
        <Button title="New +" onPress={openDrawer} />
      </View>
    </Screen>
  );
};

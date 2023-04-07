import React, { View } from 'react-native';
import { useContext } from 'react';
import { Timer } from '../../model/types';
import { TimerListItem } from './TimerListItem';
import { useSizes } from '../../theming/use-sizes';
import { Screen } from '../Screen';
import { Button } from '../../lib/components/buttons/Button';
import { GlobalContext } from '../../global-context/GlobalContext';
import { getUuid } from '../../lib/utils/uuid';

export const TimerListScreen = ({
  timers,
  setTimers,
  onTimerSelected,
}: {
  timers: Timer[];
  setTimers: (timers: Timer[]) => void;
  onTimerSelected: (timer: Timer) => void;
}) => {
  const { large } = useSizes();

  const { setDrawerState } = useContext(GlobalContext);

  const renderTimer = (timer: Timer) => (
    <TimerListItem
      key={timer.id}
      timer={timer}
      onTimerSelected={() => onTimerSelected(timer)}
    />
  );

  const closeDrawer = () => {
    setDrawerState({ open: false });
  };

  const addNewTimer = () => {
    setTimers([
      ...timers,
      { id: getUuid(), name: 'Example Timer', timingUnits: [] },
    ]);
    closeDrawer();
  };

  const openDrawer = () => {
    setDrawerState({
      open: true,
      content: <Button title="Create new timer" onPress={addNewTimer} />,
    });
  };

  return (
    <Screen>
      <View
        style={{
          gap: large,
        }}
      >
        {timers.map(renderTimer)}
        <Button title="New +" onPress={openDrawer} />
      </View>
    </Screen>
  );
};

import React, { View } from 'react-native';
import { useContext } from 'react';
import { Timer } from '../../model/types';
import { TimerListItem } from './TimerListItem';
import { useSizes } from '../../theming/use-sizes';
import { Screen } from '../Screen';
import { Button } from '../../lib/components/buttons/Button';
import { GlobalContext } from '../../global-context/GlobalContext';
import { NewTimerForm } from './NewTimerForm';

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

  const deleteTimer = ({ id: idToDelete }: Timer) => {
    setTimers(timers.filter(({ id }) => id !== idToDelete));
  };

  const renderTimer = (timer: Timer) => (
    <TimerListItem
      key={timer.id}
      timer={timer}
      onTimerSelected={() => onTimerSelected(timer)}
      onDeletePressed={() => deleteTimer(timer)}
    />
  );

  const addNewTimer = (timer: Timer) => {
    setTimers([...timers, timer]);
    setDrawerState({ open: false });
  };

  const openDrawer = () => {
    setDrawerState({
      open: true,
      content: <NewTimerForm onSubmit={addNewTimer} />,
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

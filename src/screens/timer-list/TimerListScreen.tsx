import React, { View } from 'react-native';
import { useContext } from 'react';
import { Timer } from '../../model/types';
import { TimerListItem } from './TimerListItem';
import { useSizes } from '../../theming/use-sizes';
import { Screen } from '../Screen';
import { Text } from '../../lib/components/Text';
import { Button } from '../../lib/components/buttons/Button';
import { GlobalContext } from '../../global-context/GlobalContext';
import { getUuid } from '../../lib/utils/uuid';

const PLACEHOLDER_UUIDS = Array.from({ length: 50 }).map(() => getUuid());

export const TimerListScreen = ({
  timers,
  onTimerSelected,
}: {
  timers: Timer[];
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

  const onNewTimerPressed = () => {
    setDrawerState({
      open: true,
      content: (
        <>
          {PLACEHOLDER_UUIDS.map(id => (
            <Text key={id}>Placeholder timer form</Text>
          ))}
        </>
      ),
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
        <Button title="New +" onPress={onNewTimerPressed} />
      </View>
    </Screen>
  );
};

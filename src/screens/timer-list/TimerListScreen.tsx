import React, { View } from 'react-native';
import { Timer } from '../../model/types';
import { TimerListItem } from './TimerListItem';
import { useSizes } from '../../theming/use-sizes';
import { Screen } from '../Screen';

export const TimerListScreen = ({
  timers,
  onTimerSelected,
}: {
  timers: Timer[];
  onTimerSelected: (timer: Timer) => void;
}) => {
  const { large } = useSizes();

  const renderTimer = (timer: Timer) => (
    <TimerListItem
      key={timer.id}
      timer={timer}
      onTimerSelected={() => onTimerSelected(timer)}
    />
  );

  return (
    <Screen>
      <View
        style={{
          gap: large,
        }}
      >
        {timers.map(renderTimer)}
      </View>
    </Screen>
  );
};

import React, { View } from 'react-native';
import { Text } from '../../lib/components/Text';
import { Screen } from '../Screen';
import { Timer, TimingUnit } from '../../model/types';
import { Card } from '../../lib/components/Card';

export const TimerScreen = ({
  timer: { name, timingUnits },
}: {
  timer: Timer;
}) => {
  const renderTimingUnit = ({ id, name: timingUnitName }: TimingUnit) => (
    <Card key={id}>
      <Text>{timingUnitName}</Text>
    </Card>
  );

  return (
    <Screen>
      <Text>This is the timer screen for: {name}</Text>
      <View>{timingUnits.map(renderTimingUnit)}</View>
    </Screen>
  );
};

import React from 'react-native';
import { Card } from './lib/components/Card';
import { Text } from './lib/components/Text';
import { TimingUnit } from './model/timing-unit';
import { useSizes } from './sizing/use-sizes';
import { useTheme } from './theming/use-theme';

export const TimingUnitListItem = ({
  timingUnit: { name, length },
  timeRemaining,
}: {
  timingUnit: TimingUnit;
  timeRemaining: number;
}) => {
  const { primaryColor } = useTheme();
  const { small, large } = useSizes();

  const isDone = timeRemaining === length;

  return (
    <Card
      style={{
        paddingLeft: large,
        paddingRight: large,
        paddingTop: small,
        paddingBottom: small,
        ...(isDone ? { backgroundColor: primaryColor } : {}),
      }}
    >
      <Text>Name: {name}</Text>
      <Text>Length: {length}</Text>
      <Text>Time elapsed: {timeRemaining}</Text>
    </Card>
  );
};

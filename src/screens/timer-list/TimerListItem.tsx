import React, { View } from 'react-native';
import { Text } from '../../lib/components/Text';
import { Timer } from '../../model/types';
import { Card } from '../../lib/components/Card';
import { Button } from '../../lib/components/buttons/Button';
import { useSizes } from '../../theming/use-sizes';

export const TimerListItem = ({
  timer: { name },
  onTimerSelected,
  onDeletePressed,
}: {
  timer: Timer;
  onTimerSelected: () => void;
  onDeletePressed: () => void;
}) => {
  const { small } = useSizes();

  return (
    <Card
      style={{
        padding: small,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Text>{name}</Text>
      <View style={{ flexDirection: 'row', gap: small }}>
        <Button title="Delete" onPress={onDeletePressed} />
        <Button title="Go" onPress={onTimerSelected} />
      </View>
    </Card>
  );
};

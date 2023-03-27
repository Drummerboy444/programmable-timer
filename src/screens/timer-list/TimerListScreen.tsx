import React from 'react-native';
import { Button } from '../../lib/components/buttons/Button';
import { Text } from '../../lib/components/Text';

export const TimerListScreen = ({
  onTimerPressed,
}: {
  onTimerPressed: () => void;
}) => (
  <>
    <Text>This is the timer list screen</Text>
    <Button title="Go to a timer" onPress={onTimerPressed} />
  </>
);

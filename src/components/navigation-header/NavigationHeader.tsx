import React from 'react-native';
import { Text } from '../../lib/components/Text';
import { Button } from '../../lib/components/buttons/Button';
import { Card } from '../../lib/components/Card';
import { useSizes } from '../../sizing/use-sizes';
import { Screen } from '../../screens/types';

const TITLE_LOOKUP: Record<Screen, string> = {
  'timer-list': 'Programmable Timer',
  timer: 'Timer',
  settings: 'Settings',
};

export const NavigationHeader = ({
  currentScreen,
  goToTimerListScreen,
  goToSettingsScreen,
}: {
  currentScreen: Screen;
  goToTimerListScreen: () => void;
  goToSettingsScreen: () => void;
}) => {
  const { medium } = useSizes();

  const shouldDisplayBackButton = currentScreen !== 'timer-list';
  const shouldDisplaySettingsButton = currentScreen === 'timer-list';

  return (
    <Card
      style={{
        padding: medium,
        flexDirection: 'row',
        alignItems: 'center',
        gap: medium,
      }}
    >
      {shouldDisplayBackButton ? (
        <Button title="Go back" onPress={goToTimerListScreen} />
      ) : undefined}

      <Text>{TITLE_LOOKUP[currentScreen]}</Text>

      {shouldDisplaySettingsButton ? (
        <Button title="Go to settings" onPress={goToSettingsScreen} />
      ) : undefined}
    </Card>
  );
};

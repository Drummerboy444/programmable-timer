import React from 'react-native';
import { useCallback } from 'react';
import { Text } from '../../lib/components/Text';
import { Button } from '../../lib/components/buttons/Button';
import { Card } from '../../lib/components/Card';
import { useSizes } from '../../sizing/use-sizes';
import { Screen } from '../../screens/types';

const TITLE_LOOKUP: Record<Screen, string> = {
  'timer-list': 'Programmable Timer',
  timer: 'This is the timer header',
  settings: 'Settings',
};

export const NavigationHeader = ({
  currentScreen,
  setCurrentScreen,
}: {
  currentScreen: Screen;
  setCurrentScreen: (screen: Screen) => void;
}) => {
  const { medium } = useSizes();

  const shouldDisplayBackButton = currentScreen !== 'timer-list';
  const onBackPressed = useCallback(() => {
    setCurrentScreen('timer-list');
  }, [setCurrentScreen]);

  const shouldDisplaySettingsButton = currentScreen === 'timer-list';
  const onSettingsPressed = useCallback(() => {
    setCurrentScreen('settings');
  }, [setCurrentScreen]);

  return (
    <Card
      style={{
        padding: medium,
        flexDirection: 'row',
      }}
    >
      {shouldDisplayBackButton ? (
        <Button title="Go back" onPress={onBackPressed} />
      ) : undefined}

      <Text>{TITLE_LOOKUP[currentScreen]}</Text>

      {shouldDisplaySettingsButton ? (
        <Button title="Go to settings" onPress={onSettingsPressed} />
      ) : undefined}
    </Card>
  );
};

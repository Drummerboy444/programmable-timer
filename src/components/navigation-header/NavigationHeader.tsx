import React from 'react-native';
import { Text } from '../../lib/components/Text';
import { Button } from '../../lib/components/buttons/Button';
import { Card } from '../../lib/components/Card';
import { useSizes } from '../../theming/use-sizes';
import { Screen } from '../../screens/types';
import { NavigationState } from './use-navigation';

const TITLE_LOOKUP: Record<Exclude<Screen, 'timer'>, string> = {
  'timer-list': 'Programmable Timer',
  settings: 'Settings',
};

const getTitle = (navigationState: NavigationState) => {
  if (navigationState.screen === 'timer') return navigationState.timer.name;
  return TITLE_LOOKUP[navigationState.screen];
};

export const NavigationHeader = ({
  navigationState,
  goToTimerListScreen,
  goToSettingsScreen,
}: {
  navigationState: NavigationState;
  goToTimerListScreen: () => void;
  goToSettingsScreen: () => void;
}) => {
  const { screen: currentScreen } = navigationState;

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

      <Text>{getTitle(navigationState)}</Text>

      {shouldDisplaySettingsButton ? (
        <Button title="Go to settings" onPress={goToSettingsScreen} />
      ) : undefined}
    </Card>
  );
};

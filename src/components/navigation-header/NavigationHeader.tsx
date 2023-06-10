import React from 'react-native';
import { useContext } from 'react';
import { Text } from '../../lib/components/Text';
import { Button } from '../../lib/components/buttons/Button';
import { Card } from '../../lib/components/Card';
import { useSizes } from '../../theming/use-sizes';
import { NavigationState, Screen } from '../../global-context/types';
import { GlobalContext } from '../../global-context/GlobalContext';

const TITLE_LOOKUP: Record<Exclude<Screen, 'timer-form' | 'timer'>, string> = {
  'timer-list': 'Programmable Timer',
  settings: 'Settings',
};

const getTitle = (navigationState: NavigationState) => {
  if (
    navigationState.screen === 'timer-form' ||
    navigationState.screen === 'timer'
  )
    return navigationState.timer.name;
  return TITLE_LOOKUP[navigationState.screen];
};

export const NavigationHeader = ({
  navigationState,
}: {
  navigationState: NavigationState;
}) => {
  const { setNavigationState } = useContext(GlobalContext);

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
        <Button
          title="Go back"
          onPress={() =>
            setNavigationState(
              currentScreen === 'timer'
                ? { screen: 'timer-form', timer: navigationState.timer }
                : { screen: 'timer-list' },
            )
          }
        />
      ) : undefined}

      <Text>{getTitle(navigationState)}</Text>

      {shouldDisplaySettingsButton ? (
        <Button
          title="Go to settings"
          onPress={() => setNavigationState({ screen: 'settings' })}
        />
      ) : undefined}
    </Card>
  );
};

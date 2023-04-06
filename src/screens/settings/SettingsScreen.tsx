import React from 'react-native';
import { useContext } from 'react';
import { Button } from '../../lib/components/buttons/Button';
import { Text } from '../../lib/components/Text';
import { Screen } from '../Screen';
import { GlobalContext } from '../../global-context/GlobalContext';

export const SettingsScreen = () => {
  const { themeType, setThemeType } = useContext(GlobalContext);

  const setLightTheme = () => {
    setThemeType('light');
  };

  const setDarkTheme = () => {
    setThemeType('dark');
  };

  return (
    <Screen>
      <Text>This is the settings screen</Text>
      <Text>The current theme type is {themeType}</Text>
      <Button title="Set light theme" onPress={setLightTheme} />
      <Button title="Set dark theme" onPress={setDarkTheme} />
    </Screen>
  );
};

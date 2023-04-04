import React from 'react-native';
import { Button } from '../../lib/components/buttons/Button';
import { Text } from '../../lib/components/Text';
import { useThemeType } from '../../theming/use-theme-type';

export const SettingsScreen = () => {
  const { themeType, setThemeType } = useThemeType();

  const setLightTheme = () => {
    setThemeType('light');
  };

  const setDarkTheme = () => {
    setThemeType('dark');
  };

  return (
    <>
      <Text>This is the settings screen</Text>
      <Text>The current theme type is {themeType}</Text>
      <Button title="Set light theme" onPress={setLightTheme} />
      <Button title="Set dark theme" onPress={setDarkTheme} />
    </>
  );
};

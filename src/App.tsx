import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { useCallback } from 'react';
import React, { Platform, SafeAreaView, StatusBar } from 'react-native';
import { NavigationHeader } from './components/navigation-header/NavigationHeader';
import { useNavigationHeader } from './components/navigation-header/use-navigation-header';
import { SettingsScreen } from './screens/settings/SettingsScreen';
import { TimerListScreen } from './screens/timer-list/TimerListScreen';
import { TimerScreen } from './screens/timer/TimerScreen';
import { Screen } from './screens/types';
import { useTheme } from './theming/use-theme';
import { useThemeType } from './theming/use-theme-type';

const DEFAULT_SCREEN = 'timer-list';

export const App = () => {
  const { backgroundColor } = useTheme();
  const { themeType } = useThemeType();

  const { currentScreen, setCurrentScreen } = useNavigationHeader({
    defaultScreen: DEFAULT_SCREEN,
  });

  const onTimerPressed = useCallback(() => {
    setCurrentScreen('timer');
  }, [setCurrentScreen]);

  const renderTimerListScreen = () => (
    <TimerListScreen onTimerPressed={onTimerPressed} />
  );

  const renderTimerScreen = () => <TimerScreen />;

  const renderSettingsScreen = () => <SettingsScreen />;

  const renderScreenLookup: Record<Screen, () => JSX.Element> = {
    'timer-list': renderTimerListScreen,
    timer: renderTimerScreen,
    settings: renderSettingsScreen,
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      }}
    >
      <ExpoStatusBar style={themeType === 'dark' ? 'light' : 'dark'} />
      <NavigationHeader
        currentScreen={currentScreen}
        setCurrentScreen={setCurrentScreen}
      />
      {renderScreenLookup[currentScreen]()}
    </SafeAreaView>
  );
};

import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import React, { Platform, SafeAreaView, StatusBar } from 'react-native';
import { NavigationHeader } from './components/navigation-header/NavigationHeader';
import { getUuid } from './lib/utils/uuid';
import { PositiveInteger } from './model/positive-integer';
import { Timer } from './model/types';
import { SettingsScreen } from './screens/settings/SettingsScreen';
import { TimerListScreen } from './screens/timer-list/TimerListScreen';
import { TimerScreen } from './screens/timer/TimerScreen';
import { useTheme } from './theming/use-theme';
import { useThemeType } from './theming/use-theme-type';
import { useNavigation } from './components/navigation-header/use-navigation';

const MOCK_TIMERS: Timer[] = [
  {
    id: getUuid(),
    name: 'Example timer',
    timingUnits: [
      {
        id: getUuid(),
        name: 'Timing unit 1',
        length: 3000 as PositiveInteger,
      },
      {
        id: getUuid(),
        name: 'Timing unit 2',
        length: 3000 as PositiveInteger,
      },
      {
        id: getUuid(),
        name: 'Timing unit 3',
        length: 3000 as PositiveInteger,
      },
    ],
  },
  {
    id: getUuid(),
    name: 'Another example timer',
    timingUnits: [],
  },
];

export const App = () => {
  const { backgroundColor } = useTheme();
  const { themeType } = useThemeType();

  const { navigationState, setNavigationState } = useNavigation();

  const onTimerPressed = (timer: Timer) => {
    setNavigationState({
      screen: 'timer',
      timer,
    });
  };

  const renderScreen = () => {
    if (navigationState.screen === 'timer-list') {
      return (
        <TimerListScreen
          timers={MOCK_TIMERS}
          onTimerSelected={onTimerPressed}
        />
      );
    }

    if (navigationState.screen === 'timer') {
      return <TimerScreen timer={navigationState.timer} />;
    }

    return <SettingsScreen />;
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
        currentScreen={navigationState.screen}
        goToTimerListScreen={() => setNavigationState({ screen: 'timer-list' })}
        goToSettingsScreen={() => setNavigationState({ screen: 'settings' })}
      />
      {renderScreen()}
    </SafeAreaView>
  );
};

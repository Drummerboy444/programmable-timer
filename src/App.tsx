import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { useCallback, useState } from 'react';
import React, { Platform, SafeAreaView, StatusBar } from 'react-native';
import { NavigationHeader } from './components/navigation-header/NavigationHeader';
import { useNavigationHeader } from './components/navigation-header/use-navigation-header';
import { SettingsScreen } from './screens/settings/SettingsScreen';
import { TimerListScreen } from './screens/timer-list/TimerListScreen';
import { TimerScreen } from './screens/timer/TimerScreen';
import { Screen } from './screens/types';
import { useTheme } from './theming/use-theme';
import { useThemeType } from './theming/use-theme-type';
import { getUuid } from './lib/utils/uuid';
import { PositiveInteger } from './model/positive-integer';
import { Timer } from './model/types';

const FIRST_MOCK_TIMER: Timer = {
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
};

const MOCK_TIMERS: Timer[] = [
  FIRST_MOCK_TIMER,
  {
    id: getUuid(),
    name: 'Another example timer',
    timingUnits: [],
  },
];

const DEFAULT_SCREEN = 'timer-list';

export const App = () => {
  const { backgroundColor } = useTheme();
  const { themeType } = useThemeType();

  const { currentScreen, setCurrentScreen } = useNavigationHeader({
    defaultScreen: DEFAULT_SCREEN,
  });

  const [currentTimer, setCurrentTimer] = useState(FIRST_MOCK_TIMER);

  const onTimerPressed = useCallback(
    (timer: Timer) => {
      setCurrentTimer(timer);
      setCurrentScreen('timer');
    },
    [setCurrentScreen],
  );

  const renderTimerListScreen = () => (
    <TimerListScreen timers={MOCK_TIMERS} onTimerSelected={onTimerPressed} />
  );

  const renderTimerScreen = () => <TimerScreen timer={currentTimer} />;

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

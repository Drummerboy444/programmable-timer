import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { useContext } from 'react';
import React, { Platform, SafeAreaView, StatusBar } from 'react-native';
import { absurd } from 'fp-ts/lib/function';
import { Drawer } from './components/drawer/Drawer';
import { NavigationHeader } from './components/navigation-header/NavigationHeader';
import { useNavigation } from './components/navigation-header/use-navigation';
import { GlobalContext } from './global-context/GlobalContext';
import { Timer } from './model/types';
import { SettingsScreen } from './screens/settings/SettingsScreen';
import { TimerListScreen } from './screens/timer-list/TimerListScreen';
import { TimerScreen } from './screens/timer/TimerScreen';
import { useTheme } from './theming/use-theme';
import { useTimers } from './model/use-timers';

export const App = () => {
  const { backgroundColor } = useTheme();
  const { themeType } = useContext(GlobalContext);

  const { navigationState, setNavigationState } = useNavigation();
  const { timers, setTimers } = useTimers();

  const onTimerPressed = (timer: Timer) => {
    setNavigationState({
      screen: 'timer',
      timer,
    });
  };

  const setTimer = (timerToSet: Timer) => {
    setTimers(
      timers.map(timer => (timer.id === timerToSet.id ? timerToSet : timer)),
    );
    setNavigationState({ screen: 'timer', timer: timerToSet });
  };

  const renderScreen = () => {
    const { screen } = navigationState;
    switch (screen) {
      case 'timer-list':
        return (
          <TimerListScreen
            timers={timers}
            setTimers={setTimers}
            onTimerSelected={onTimerPressed}
          />
        );
      case 'timer':
        return (
          <TimerScreen timer={navigationState.timer} setTimer={setTimer} />
        );
      case 'settings':
        return <SettingsScreen />;
      default:
        return absurd<never>(screen);
    }
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
        navigationState={navigationState}
        goToTimerListScreen={() => setNavigationState({ screen: 'timer-list' })}
        goToSettingsScreen={() => setNavigationState({ screen: 'settings' })}
      />
      {renderScreen()}
      <Drawer />
    </SafeAreaView>
  );
};

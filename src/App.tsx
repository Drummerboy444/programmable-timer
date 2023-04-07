import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { useContext } from 'react';
import React, { Platform, SafeAreaView, StatusBar } from 'react-native';
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

  const renderScreen = () => {
    if (navigationState.screen === 'timer-list') {
      return (
        <TimerListScreen
          timers={timers}
          setTimers={setTimers}
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
        navigationState={navigationState}
        goToTimerListScreen={() => setNavigationState({ screen: 'timer-list' })}
        goToSettingsScreen={() => setNavigationState({ screen: 'settings' })}
      />
      {renderScreen()}
      <Drawer />
    </SafeAreaView>
  );
};

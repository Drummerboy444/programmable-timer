import { createContext } from 'react';
import { noop } from '../lib/utils/noop';
import { ThemeType } from '../theming/types';
import { DrawerState, NavigationState } from './types';

export type GlobalContext = {
  themeType: ThemeType;
  setThemeType: (themeType: ThemeType) => void;
  drawerState: DrawerState;
  setDrawerState: (drawerState: DrawerState) => void;
  navigationState: NavigationState;
  setNavigationState: (navigationState: NavigationState) => void;
};

export const DEFAULT_GLOBAL_CONTEXT: GlobalContext = {
  themeType: 'light',
  setThemeType: noop,
  drawerState: { open: false },
  setDrawerState: noop,
  navigationState: { screen: 'timer-list' },
  setNavigationState: noop,
};

export const GlobalContext = createContext<GlobalContext>(
  DEFAULT_GLOBAL_CONTEXT,
);

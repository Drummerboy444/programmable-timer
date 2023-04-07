import React, { createContext } from 'react';
import { noop } from '../lib/utils/noop';
import { ThemeType } from '../theming/types';

type DrawerState = { open: false } | { open: true; content: React.ReactNode };

export type GlobalContext = {
  themeType: ThemeType;
  setThemeType: (themeType: ThemeType) => void;
  drawerState: DrawerState;
  setDrawerState: (drawerState: DrawerState) => void;
};

export const DEFAULT_GLOBAL_CONTEXT: GlobalContext = {
  themeType: 'light',
  setThemeType: noop,
  drawerState: { open: false },
  setDrawerState: noop,
};

export const GlobalContext = createContext<GlobalContext>(
  DEFAULT_GLOBAL_CONTEXT,
);

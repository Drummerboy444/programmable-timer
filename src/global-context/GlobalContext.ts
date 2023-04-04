import { createContext } from 'react';
import { noop } from '../lib/utils/noop';
import { ThemeType } from '../theming/types';

export type GlobalContext = {
  themeType: ThemeType;
  setThemeType: (themeType: ThemeType) => void;
};

export const DEFAULT_GLOBAL_CONTEXT: GlobalContext = {
  themeType: 'light',
  setThemeType: noop,
};

export const GlobalContext = createContext<GlobalContext>(
  DEFAULT_GLOBAL_CONTEXT,
);

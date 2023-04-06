import { useContext } from 'react';
import { darkTheme } from './themes/dark-theme';
import { lightTheme } from './themes/light-theme';
import { Theme, ThemeType } from './types';
import { GlobalContext } from '../global-context/GlobalContext';

export const THEME_LOOKUP: Record<ThemeType, Theme> = {
  light: lightTheme,
  dark: darkTheme,
};

export const useTheme = () => {
  const { themeType } = useContext(GlobalContext);
  return THEME_LOOKUP[themeType];
};

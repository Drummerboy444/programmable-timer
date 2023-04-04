import { darkTheme } from './themes/dark-theme';
import { lightTheme } from './themes/light-theme';
import { Theme, ThemeType } from './types';
import { useThemeType } from './use-theme-type';

export const THEME_LOOKUP: Record<ThemeType, Theme> = {
  light: lightTheme,
  dark: darkTheme,
};

export const useTheme = () => {
  const { themeType } = useThemeType();
  return THEME_LOOKUP[themeType];
};

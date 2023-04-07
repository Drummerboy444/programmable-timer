import { useState } from 'react';
import { DEFAULT_GLOBAL_CONTEXT, GlobalContext } from './GlobalContext';
import { getAsyncStorageHook } from '../lib/hooks/use-async-storage';
import { ThemeType, isThemeType } from '../theming/types';

const THEME_TYPE_KEY = 'theme-type';

const useAsyncThemeTypeStorage = getAsyncStorageHook<ThemeType>({
  serialise: themeType => themeType,
  deserialise: s => (isThemeType(s) ? s : null),
});

export const useGlobalContext = (): GlobalContext => {
  const { value: themeType, setValue: setThemeType } = useAsyncThemeTypeStorage(
    {
      key: THEME_TYPE_KEY,
      defaultValue: DEFAULT_GLOBAL_CONTEXT.themeType,
    },
  );

  const [drawerState, setDrawerState] = useState(
    DEFAULT_GLOBAL_CONTEXT.drawerState,
  );

  return {
    themeType,
    setThemeType,
    drawerState,
    setDrawerState,
  };
};

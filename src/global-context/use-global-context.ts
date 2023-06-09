import * as O from 'fp-ts/Option';
import { useState } from 'react';
import { getAsyncStorageHook } from '../lib/hooks/use-async-storage';
import { ThemeType, isThemeType } from '../theming/types';
import { DEFAULT_GLOBAL_CONTEXT, GlobalContext } from './GlobalContext';

const THEME_TYPE_KEY = 'theme-type';

const useAsyncThemeTypeStorage = getAsyncStorageHook<ThemeType>({
  serialise: themeType => themeType,
  deserialise: O.fromPredicate(isThemeType),
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

  const [navigationState, setNavigationState] = useState(
    DEFAULT_GLOBAL_CONTEXT.navigationState,
  );

  return {
    themeType,
    setThemeType,
    drawerState,
    setDrawerState,
    navigationState,
    setNavigationState,
  };
};

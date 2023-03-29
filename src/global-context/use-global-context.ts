import { useState } from 'react';
import { DEFAULT_GLOBAL_CONTEXT } from './GlobalContext';

export const useGlobalContext = () => {
  const [themeType, setThemeType] = useState(DEFAULT_GLOBAL_CONTEXT.themeType);
  return { themeType, setThemeType };
};

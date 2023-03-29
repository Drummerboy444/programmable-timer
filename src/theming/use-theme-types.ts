import { useContext } from 'react';
import { GlobalContext } from '../global-context/GlobalContext';

export const useThemeType = () => {
  const { themeType, setThemeType } = useContext(GlobalContext);
  return { themeType, setThemeType };
};

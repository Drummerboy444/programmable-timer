import { useState } from 'react';
import { Screen } from '../../screens/types';

export const useNavigationHeader = ({
  defaultScreen,
}: {
  defaultScreen: Screen;
}) => {
  const [currentScreen, setCurrentScreen] = useState(defaultScreen);

  return { currentScreen, setCurrentScreen };
};

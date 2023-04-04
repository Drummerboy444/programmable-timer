import { useState } from 'react';
import { Timer } from '../../model/types';

type NavigationState =
  | {
      screen: 'timer-list';
    }
  | {
      screen: 'timer';
      timer: Timer;
    }
  | {
      screen: 'settings';
    };

const DEFAULT_SCREEN = 'timer-list';

export const useNavigation = () => {
  const [navigationState, setNavigationState] = useState<NavigationState>({
    screen: DEFAULT_SCREEN,
  });

  return { navigationState, setNavigationState };
};

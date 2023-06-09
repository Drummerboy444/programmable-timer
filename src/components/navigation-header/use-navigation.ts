import { useState } from 'react';
import { Timer } from '../../model/types';

export type NavigationState =
  | {
      screen: 'timer-list';
    }
  | {
      screen: 'timer-form';
      timer: Timer;
    }
  | {
      screen: 'settings';
    };

export type Screen = NavigationState['screen'];

const DEFAULT_SCREEN = 'timer-list';

export const useNavigation = () => {
  const [navigationState, setNavigationState] = useState<NavigationState>({
    screen: DEFAULT_SCREEN,
  });

  return { navigationState, setNavigationState };
};

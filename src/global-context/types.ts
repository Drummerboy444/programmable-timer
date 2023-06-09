import React from 'react';
import { Timer } from '../model/types';

export type DrawerState =
  | { open: false }
  | { open: true; content: React.ReactNode };

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

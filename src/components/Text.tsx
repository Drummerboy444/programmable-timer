import { PropsWithChildren } from 'react';
import React, { Text as TEXT } from 'react-native';
import { useTheme } from '../theming/use-theme';

export function Text({
  style,
  children,
}: PropsWithChildren<{ style?: React.TextStyle }>) {
  const { textColor: color } = useTheme();

  return (
    <TEXT
      style={{
        color,
        ...style,
      }}
    >
      {children}
    </TEXT>
  );
}

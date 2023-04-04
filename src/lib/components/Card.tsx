import { PropsWithChildren } from 'react';
import React, { View } from 'react-native';
import { useTheme } from '../../theming/use-theme';

export const Card = ({
  style,
  children,
}: PropsWithChildren<{ style?: React.ViewStyle }>) => {
  const { backgroundColor, borderColor } = useTheme();

  return (
    <View
      style={{
        backgroundColor,
        borderColor,
        borderWidth: 1,
        borderStyle: 'solid',
        ...style,
      }}
    >
      {children}
    </View>
  );
};

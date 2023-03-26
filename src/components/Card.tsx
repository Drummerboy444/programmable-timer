import { PropsWithChildren } from 'react';
import React, { View } from 'react-native';
import { useSizes } from '../sizing/use-sizes';
import { useTheme } from '../theming/use-theme';

export function Card({
  style,
  children,
}: PropsWithChildren<{ style?: React.ViewStyle }>) {
  const { backgroundColor, shadowColor, shadowOpacity } = useTheme();
  const { small } = useSizes();

  return (
    <View
      style={{
        backgroundColor,
        shadowColor,
        shadowOpacity,
        shadowOffset: {
          width: small,
          height: small,
        },
        ...style,
      }}
    >
      {children}
    </View>
  );
}

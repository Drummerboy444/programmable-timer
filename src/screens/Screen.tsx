import { PropsWithChildren } from 'react';
import React, { View } from 'react-native';
import { useSizes } from '../theming/use-sizes';

export const Screen = ({
  style,
  children,
}: PropsWithChildren<{ style?: React.ViewStyle }>) => {
  const { extraLarge } = useSizes();
  return (
    <View style={{ flex: 1, padding: extraLarge, ...style }}>{children}</View>
  );
};

import { PropsWithChildren } from 'react';
import React, { ScrollView, View } from 'react-native';
import { useSizes } from '../theming/use-sizes';

export const Screen = ({
  style,
  children,
}: PropsWithChildren<{ style?: React.ViewStyle }>) => {
  const { extraLarge } = useSizes();
  return (
    <ScrollView>
      <View style={{ flex: 1, padding: extraLarge, ...style }}>{children}</View>
    </ScrollView>
  );
};

import { PropsWithChildren } from 'react';
import React, { Pressable } from 'react-native';

export const BaseButton = ({
  onPress,
  style,
  children,
}: PropsWithChildren<{
  onPress?: () => void;
  style?: React.ViewStyle;
}>) => (
  <Pressable
    style={{
      ...style,
    }}
    onPress={onPress}
  >
    {children}
  </Pressable>
);

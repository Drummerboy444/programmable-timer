import { PropsWithChildren } from 'react';
import React, { Pressable } from 'react-native';

export const BaseButton = ({
  onPress,
  style,
  onPressStyle,
  children,
}: PropsWithChildren<{
  onPress?: () => void;
  style?: React.ViewStyle;
  onPressStyle?: React.ViewStyle;
}>) => (
  <Pressable
    style={({ pressed }) => ({
      ...(pressed && onPressStyle !== undefined ? onPressStyle : style),
    })}
    onPress={onPress}
  >
    {children}
  </Pressable>
);

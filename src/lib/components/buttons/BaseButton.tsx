import { PropsWithChildren } from 'react';
import React, { Pressable } from 'react-native';

export const BaseButton = ({
  onPress,
  disabled,
  style,
  onPressStyle,
  children,
}: PropsWithChildren<{
  onPress?: () => void;
  disabled?: boolean;
  style?: React.ViewStyle;
  onPressStyle?: React.ViewStyle;
}>) => (
  <Pressable
    style={({ pressed }) => ({
      ...(pressed && onPressStyle !== undefined ? onPressStyle : style),
    })}
    onPress={onPress}
    disabled={disabled}
  >
    {children}
  </Pressable>
);

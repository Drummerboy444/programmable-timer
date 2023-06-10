import { PropsWithChildren } from 'react';
import React, { Pressable } from 'react-native';

export const BaseButton = ({
  onPress,
  disabled,
  style,
  onPressStyle,
  disabledStyle,
  children,
}: PropsWithChildren<{
  onPress?: () => void;
  disabled?: boolean;
  style?: React.ViewStyle;
  onPressStyle?: React.ViewStyle;
  disabledStyle?: React.ViewStyle;
}>) => (
  <Pressable
    style={({ pressed }) => ({
      ...style,
      ...(pressed ? onPressStyle : {}),
      ...(disabled ? disabledStyle : {}),
    })}
    onPress={onPress}
    disabled={disabled}
  >
    {children}
  </Pressable>
);

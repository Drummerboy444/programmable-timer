import React from 'react-native';
import { useTheme } from '../../../theming/use-theme';
import { Text } from '../Text';
import { BaseButton } from './BaseButton';
import { useSizes } from '../../../theming/use-sizes';

export const Button = ({
  title,
  onPress,
  disabled,
  style,
}: {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  style?: React.ViewStyle;
}) => {
  const { primaryColor, secondaryColor, disabledColor } = useTheme();
  const { medium } = useSizes();

  const baseStyle: React.ViewStyle = {
    backgroundColor: primaryColor,
    alignSelf: 'flex-start',
    padding: medium,
  };

  return (
    <BaseButton
      {...(onPress === undefined ? {} : { onPress })}
      {...(disabled === undefined ? {} : { disabled })}
      style={{
        ...baseStyle,
        ...(disabled !== undefined && disabled
          ? { backgroundColor: disabledColor }
          : {}),
        ...style,
      }}
      onPressStyle={{
        ...baseStyle,
        backgroundColor: secondaryColor,
        ...style,
      }}
    >
      <Text>{title}</Text>
    </BaseButton>
  );
};

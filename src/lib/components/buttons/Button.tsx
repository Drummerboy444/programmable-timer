import React from 'react-native';
import { useTheme } from '../../../theming/use-theme';
import { Text } from '../Text';
import { BaseButton } from './BaseButton';
import { useSizes } from '../../../theming/use-sizes';

export const Button = ({
  title,
  onPress,
  style,
  onPressStyle,
}: {
  title: string;
  onPress?: () => void;
  style?: React.ViewStyle;
  onPressStyle?: React.ViewStyle;
}) => {
  const { primaryColor, secondaryColor } = useTheme();
  const { medium } = useSizes();

  const baseStyle: React.ViewStyle = {
    backgroundColor: primaryColor,
    alignSelf: 'flex-start',
    padding: medium,
  };

  return (
    <BaseButton
      {...(onPress === undefined ? {} : { onPress })}
      style={{ ...baseStyle, ...style }}
      onPressStyle={{
        ...baseStyle,
        backgroundColor: secondaryColor,
        ...style,
        ...onPressStyle,
      }}
    >
      <Text>{title}</Text>
    </BaseButton>
  );
};

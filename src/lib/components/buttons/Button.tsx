import React from 'react-native';
import { useTheme } from '../../../theming/use-theme';
import { Text } from '../Text';
import { BaseButton } from './BaseButton';
import { useSizes } from '../../../theming/use-sizes';

export const Button = ({
  title,
  onPress,
}: {
  title: string;
  onPress?: () => void;
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
      style={baseStyle}
      onPressStyle={{
        ...baseStyle,
        backgroundColor: secondaryColor,
      }}
    >
      <Text>{title}</Text>
    </BaseButton>
  );
};

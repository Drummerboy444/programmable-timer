import React from 'react-native';
import { useTheme } from '../../../theming/use-theme';
import { Text } from '../Text';
import { BaseButton } from './BaseButton';
import { useSizes } from '../../../theming/use-sizes';
import { noop } from '../../utils/noop';

export const Button = ({
  title,
  onPress = noop,
  disabled = false,
}: {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
}) => {
  const { primaryColor, pressedColor, disabledColor } = useTheme();
  const { medium } = useSizes();

  return (
    <BaseButton
      onPress={onPress}
      disabled={disabled}
      style={{
        backgroundColor: primaryColor,
        alignSelf: 'flex-start',
        padding: medium,
      }}
      onPressStyle={{
        backgroundColor: pressedColor,
      }}
      disabledStyle={{
        backgroundColor: disabledColor,
      }}
    >
      <Text>{title}</Text>
    </BaseButton>
  );
};

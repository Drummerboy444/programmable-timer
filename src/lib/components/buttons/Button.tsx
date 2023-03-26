import React from 'react-native';
import { useTheme } from '../../../theming/use-theme';
import { Text } from '../Text';
import { BaseButton } from './BaseButton';

export const Button = ({
  title,
  onPress,
}: {
  title: string;
  onPress?: () => void;
}) => {
  const { primaryColor: backgroundColor } = useTheme();
  const onPressProp = onPress === undefined ? {} : { onPress };

  return (
    <BaseButton
      {...onPressProp}
      style={{
        backgroundColor,
      }}
    >
      <Text>{title}</Text>
    </BaseButton>
  );
};

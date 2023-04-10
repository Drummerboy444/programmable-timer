import React, { TextInput as TEXT_INPUT, View } from 'react-native';
import { useTheme } from '../../../theming/use-theme';
import { useSizes } from '../../../theming/use-sizes';
import { Text } from '../Text';

export const BaseTextInput = ({
  value,
  setValue,
  label,
  style,
  props,
}: {
  value: string;
  setValue: (value: string) => void;
  label?: string;
  style?: React.TextStyle;
  props?: TEXT_INPUT['props'];
}) => {
  const { textColor, borderColor } = useTheme();
  const { medium } = useSizes();

  return (
    <View>
      {label !== undefined ? <Text>{label}:</Text> : undefined}
      <TEXT_INPUT
        style={{
          padding: medium,
          color: textColor,
          borderColor,
          borderWidth: 1,
          borderStyle: 'solid',
          ...style,
        }}
        value={value}
        onChangeText={setValue}
        {...props}
      />
    </View>
  );
};

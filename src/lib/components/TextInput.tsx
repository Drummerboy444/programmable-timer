import React, { TextInput as TEXT_INPUT } from 'react-native';
import { useTheme } from '../../theming/use-theme';
import { useSizes } from '../../theming/use-sizes';

export const TextInput = ({
  value,
  setValue,
  style,
}: {
  value: string;
  setValue: (text: string) => void;
  style?: React.TextStyle;
}) => {
  const { textColor, borderColor } = useTheme();
  const { medium } = useSizes();

  return (
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
    />
  );
};

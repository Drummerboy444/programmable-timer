import React from 'react-native';
import { BaseTextInput } from './BaseTextInput';

export const TextInput = ({
  value,
  setValue,
  label,
  style,
}: {
  value: string;
  setValue: (value: string) => void;
  label?: string;
  style?: React.TextStyle;
}) => (
  <BaseTextInput
    value={value}
    setValue={setValue}
    {...(label === undefined ? {} : { label })}
    style={{ ...style }}
  />
);

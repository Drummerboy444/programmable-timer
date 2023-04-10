import * as O from 'fp-ts/Option';
import { constant, pipe } from 'fp-ts/lib/function';
import React from 'react-native';
import { BaseTextInput } from './BaseTextInput';
import { stringToNumberOption } from './utils';

const numberToString = (n: number) => `${n}`;

export const NumericInput = ({
  value,
  setValue,
  label,
  style,
}: {
  value: O.Option<number>;
  setValue: (value: O.Option<number>) => void;
  label?: string;
  style?: React.TextStyle;
}) => {
  const baseValue = pipe(value, O.match(constant(''), numberToString));

  const setBaseValue = (newBaseValue: string) => {
    setValue(stringToNumberOption(newBaseValue));
  };

  return (
    <BaseTextInput
      value={baseValue}
      setValue={setBaseValue}
      {...(label === undefined ? {} : { label })}
      style={{ ...style }}
      props={{ inputMode: 'numeric' }}
    />
  );
};

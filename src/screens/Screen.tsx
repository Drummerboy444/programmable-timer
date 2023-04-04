import { PropsWithChildren } from 'react';
import React, { View } from 'react-native';
import { useSizes } from '../sizing/use-sizes';

export const Screen = ({ children }: PropsWithChildren) => {
  const { extraLarge } = useSizes();
  return <View style={{ padding: extraLarge }}>{children}</View>;
};

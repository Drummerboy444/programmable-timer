import React from 'react-native';
import { Button } from './Button';

type Icon = 'BIN' | 'UP' | 'DOWN';

const ICON_LOOKUP: Record<Icon, string> = {
  BIN: '🗑',
  UP: '⬆',
  DOWN: '⬇',
};

export const IconButton = ({
  icon,
  onPress,
}: {
  icon: Icon;
  onPress?: () => void;
}) => (
  <Button
    title={ICON_LOOKUP[icon]}
    {...(onPress === undefined ? {} : { onPress })}
    style={{
      backgroundColor: undefined,
      padding: 0,
    }}
  />
);

import React from 'react-native';
import { noop } from '../../utils/noop';
import { BaseButton } from './BaseButton';
import { Text } from '../Text';

type Icon = 'BIN' | 'UP' | 'DOWN' | 'EDIT';

const ICON_LOOKUP: Record<Icon, string> = {
  BIN: '🗑',
  UP: '☝️',
  DOWN: '👇',
  EDIT: '✏️',
};

export const IconButton = ({
  icon,
  onPress = noop,
  disabled = false,
}: {
  icon: Icon;
  onPress?: () => void;
  disabled?: boolean;
}) => (
  <BaseButton
    onPress={onPress}
    disabled={disabled}
    style={{
      alignSelf: 'flex-start',
    }}
  >
    <Text>{ICON_LOOKUP[icon]}</Text>
  </BaseButton>
);

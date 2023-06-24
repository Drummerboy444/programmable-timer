import React, { Pressable } from 'react-native';
import { Card } from '../../lib/components/Card';
import { Text } from '../../lib/components/Text';
import { ManualTimingUnit } from '../../model/types';
import { useSizes } from '../../theming/use-sizes';
import { useTheme } from '../../theming/use-theme';

export const ManualTimingUnitChunk = ({
  timingUnit: { id, name },
  isCurrentChunk,
  onFinished,
}: {
  timingUnit: ManualTimingUnit;
  isCurrentChunk: boolean;
  onFinished: () => void;
}) => {
  const { primaryColor } = useTheme();
  const { small } = useSizes();

  return (
    <Pressable
      onPress={() => {
        onFinished();
      }}
      disabled={!isCurrentChunk}
    >
      <Card
        key={id}
        style={{
          padding: small,
          backgroundColor: isCurrentChunk ? primaryColor : undefined,
        }}
      >
        <Text>{name}</Text>
      </Card>
    </Pressable>
  );
};

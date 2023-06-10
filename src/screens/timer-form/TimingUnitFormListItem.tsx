import React from 'react-native';
import { Card } from '../../lib/components/Card';
import { TimingUnit } from '../../model/types';
import { Text } from '../../lib/components/Text';
import { useSizes } from '../../theming/use-sizes';
import { toSeconds } from '../../lib/utils/time-display';
import { IconButton } from '../../lib/components/buttons/IconButton';

export const TimingUnitFormListItem = ({
  timingUnit: { id, length, name },
  onEdit,
  onMoveUp,
  onMoveDown,
  onDelete,
}: {
  timingUnit: TimingUnit;
  onEdit: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onDelete: () => void;
}) => {
  const { small } = useSizes();

  return (
    <Card
      key={id}
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: small,
      }}
    >
      <Text>{name}</Text>
      <IconButton icon="EDIT" onPress={onEdit} />
      <IconButton icon="UP" onPress={onMoveUp} />
      <IconButton icon="DOWN" onPress={onMoveDown} />
      <IconButton icon="BIN" onPress={onDelete} />
      <Text>{toSeconds(length)}</Text>
    </Card>
  );
};

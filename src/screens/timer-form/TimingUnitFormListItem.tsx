import React from 'react-native';
import { Card } from '../../lib/components/Card';
import { TimingUnit } from '../../model/types';
import { Text } from '../../lib/components/Text';
import { useSizes } from '../../theming/use-sizes';
import { toSeconds } from '../../lib/utils/time-display';
import { IconButton } from '../../lib/components/buttons/IconButton';

export const TimingUnitFormListItem = ({
  timingUnit,
  canMoveUp,
  canMoveDown,
  onEdit,
  onMoveUp,
  onMoveDown,
  onDelete,
}: {
  timingUnit: TimingUnit;
  canMoveUp: boolean;
  canMoveDown: boolean;
  onEdit: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onDelete: () => void;
}) => {
  const { small } = useSizes();

  return (
    <Card
      key={timingUnit.id}
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: small,
      }}
    >
      <Text>{timingUnit.name}</Text>
      <IconButton icon="EDIT" onPress={onEdit} />
      {canMoveUp && <IconButton icon="UP" onPress={onMoveUp} />}
      {canMoveDown && <IconButton icon="DOWN" onPress={onMoveDown} />}
      <IconButton icon="BIN" onPress={onDelete} />
      {timingUnit.type === 'automatic' && (
        <Text>{toSeconds(timingUnit.length)}</Text>
      )}
    </Card>
  );
};

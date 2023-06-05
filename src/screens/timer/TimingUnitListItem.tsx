import React from 'react-native';
import { Card } from '../../lib/components/Card';
import { TimingUnit } from '../../model/types';
import { Text } from '../../lib/components/Text';
import { useSizes } from '../../theming/use-sizes';
import { toSeconds } from '../../lib/utils/time-display';
import { IconButton } from '../../lib/components/buttons/IconButton';

export const TimingUnitListItem = ({
  timingUnitWithTimeElapsed: { id, name, length, timeElapsed },
  onDelete,
}: {
  timingUnitWithTimeElapsed: TimingUnit & { timeElapsed: number };
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
      <IconButton icon="BIN" onPress={onDelete} />
      <Text>
        {toSeconds(timeElapsed)}/{toSeconds(length)}
      </Text>
    </Card>
  );
};

import React from 'react-native';
import { Card } from '../../lib/components/Card';
import { TimingUnit } from '../../model/types';
import { Text } from '../../lib/components/Text';
import { useSizes } from '../../theming/use-sizes';
import { toSeconds } from '../../lib/utils/time-display';

export const TimingUnitListItem = ({
  timingUnit: { id, name, length },
}: {
  timingUnit: TimingUnit;
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
      <Text>{toSeconds(length)}</Text>
    </Card>
  );
};

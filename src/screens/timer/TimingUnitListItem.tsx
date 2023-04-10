import React from 'react-native';
import { Card } from '../../lib/components/Card';
import { TimingUnit } from '../../model/types';
import { Text } from '../../lib/components/Text';
import { useSizes } from '../../theming/use-sizes';

const renderLength = (length: number) => `${Math.floor(length / 1000)}s`;

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
      <Text>{renderLength(length)}</Text>
    </Card>
  );
};

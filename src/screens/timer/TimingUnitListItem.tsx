import React from 'react-native';
import { Card } from '../../lib/components/Card';
import { toSeconds } from '../../lib/utils/time-display';
import { TimingUnit } from '../../model/types';
import { useSizes } from '../../theming/use-sizes';
import { Text } from '../../lib/components/Text';
import { useTheme } from '../../theming/use-theme';

export const TimingUnitListItem = ({
  timingUnit: { id, name, length },
  timeElapsed,
}: {
  timingUnit: TimingUnit;
  timeElapsed: number;
}) => {
  const { secondaryColor } = useTheme();
  const { small } = useSizes();

  const isActiveTimer = timeElapsed > 0 && timeElapsed < length;

  return (
    <Card
      key={id}
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: small,
        backgroundColor: isActiveTimer ? secondaryColor : undefined,
      }}
    >
      <Text>{name}</Text>
      <Text>
        {toSeconds(timeElapsed)}/{toSeconds(length)}
      </Text>
    </Card>
  );
};

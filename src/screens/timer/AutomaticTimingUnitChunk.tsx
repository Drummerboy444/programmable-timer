import React from 'react-native';
import { useEffect } from 'react';
import { Text } from '../../lib/components/Text';
import { useTimer } from '../../lib/hooks/use-timer';
import { AutomaticTimingUnit } from '../../model/types';
import { Card } from '../../lib/components/Card';
import { appendTimeElapsed } from './append-time-elapsed';
import { useSizes } from '../../theming/use-sizes';
import { useTheme } from '../../theming/use-theme';
import { toSeconds } from '../../lib/utils/time-display';

export const AutomaticTimingUnitChunk = ({
  timingUnits,
  isCurrentChunk,
  onFinished,
}: {
  timingUnits: AutomaticTimingUnit[];
  isCurrentChunk: boolean;
  onFinished: () => void;
}) => {
  const { small } = useSizes();
  const { secondaryColor } = useTheme();
  const { timeElapsed: totalTimeElapsed, play, pause } = useTimer();

  const totalLength = timingUnits.reduce(
    (previous, { length }) => previous + length,
    0,
  );

  useEffect(() => {
    if (isCurrentChunk) {
      play();
    } else {
      pause();
    }
  }, [isCurrentChunk, pause, play]);

  useEffect(() => {
    if (totalTimeElapsed >= totalLength && isCurrentChunk) {
      onFinished();
    }
  }, [isCurrentChunk, onFinished, totalTimeElapsed, totalLength]);

  return (
    <>
      {appendTimeElapsed(totalTimeElapsed)(timingUnits).map(
        ({ id, name, length, timeElapsed }) => (
          <Card
            key={id}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: small,
              backgroundColor:
                timeElapsed > 0 && timeElapsed < length
                  ? secondaryColor
                  : undefined,
            }}
          >
            <Text>{name}</Text>
            <Text>
              {toSeconds(timeElapsed)}/{toSeconds(length)}
            </Text>
          </Card>
        ),
      )}
    </>
  );
};

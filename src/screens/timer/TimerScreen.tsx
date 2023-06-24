import { useState } from 'react';
import React, { View } from 'react-native';
import { Text } from '../../lib/components/Text';
import { Timer } from '../../model/types';
import { useSizes } from '../../theming/use-sizes';
import { Screen } from '../Screen';
import { AutomaticTimingUnitChunk } from './AutomaticTimingUnitChunk';
import { ManualTimingUnitChunk } from './ManualTimingUnitChunk';
import { chunkTimingUnits } from './chunk-timing-units';

export const TimerScreen = ({ timer: { timingUnits } }: { timer: Timer }) => {
  const { small } = useSizes();
  const [currentChunkIndex, setCurrentChunkIndex] = useState(0);

  const timingUnitChunks = chunkTimingUnits(timingUnits);

  const onChunkFinished = () => {
    setCurrentChunkIndex(currentChunkIndex + 1);
  };

  return (
    <Screen>
      <View style={{ gap: small }}>
        {timingUnitChunks.map((chunk, index) => {
          const isCurrentChunk = index === currentChunkIndex;

          return Array.isArray(chunk) ? (
            <AutomaticTimingUnitChunk
              key={chunk[0].id}
              timingUnits={chunk}
              isCurrentChunk={isCurrentChunk}
              onFinished={onChunkFinished}
            />
          ) : (
            <ManualTimingUnitChunk
              key={chunk.id}
              timingUnit={chunk}
              isCurrentChunk={isCurrentChunk}
              onFinished={onChunkFinished}
            />
          );
        })}
        {currentChunkIndex >= timingUnitChunks.length && <Text>Done!</Text>}
      </View>
    </Screen>
  );
};

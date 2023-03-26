import { StatusBar } from 'expo-status-bar';
import { pipe } from 'fp-ts/lib/function';
import * as O from 'fp-ts/Option';
import { useCallback, useState } from 'react';
import React, { View } from 'react-native';
import { Button } from './lib/components/buttons/Button';
import { Text } from './lib/components/Text';
import { MOCK_TIMING_UNITS } from './mock-data';
import { useSizes } from './sizing/use-sizes';
import { useTheme } from './theming/use-theme';
import { TimingUnitList } from './TimingUnitList';
import { useRepeater } from './use-repeater';

export const App = () => {
  const { backgroundColor } = useTheme();
  const { large } = useSizes();

  const [timeStampData, setTimestampData] = useState<
    O.Option<{
      startTimestamp: number;
      timeSinceStart: number;
    }>
  >(O.none);

  const onPressStart = useCallback(() => {
    setTimestampData(
      O.of({
        startTimestamp: Date.now(),
        timeSinceStart: 0,
      }),
    );
  }, []);

  const onPressReset = useCallback(() => {
    setTimestampData(O.none);
  }, []);

  useRepeater(() => {
    pipe(
      timeStampData,
      O.map(({ startTimestamp }) =>
        setTimestampData(
          O.of({
            startTimestamp,
            timeSinceStart: Date.now() - startTimestamp,
          }),
        ),
      ),
    );
  }, 10);

  const renderStartTimestamp = pipe(
    timeStampData,
    O.match(
      () => 'Start timestamp: N/A',
      ({ startTimestamp }) => `Start timestamp: ${startTimestamp}`,
    ),
  );

  const renderTimeSinceStart = pipe(
    timeStampData,
    O.match(
      () => 'Time sinceStart: N/A',
      ({ timeSinceStart }) => `Time sinceStart: ${timeSinceStart}`,
    ),
  );

  const timeElapsed = pipe(
    timeStampData,
    O.map(({ timeSinceStart }) => timeSinceStart),
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor,
        justifyContent: 'center',
      }}
    >
      <StatusBar style="auto" />
      <View
        style={{
          padding: large,
        }}
      >
        <Button title="Start" onPress={onPressStart} />
        <Button title="Reset" onPress={onPressReset} />
        <Text>{renderStartTimestamp}</Text>
        <Text>{renderTimeSinceStart}</Text>
        <TimingUnitList
          timingUnits={MOCK_TIMING_UNITS}
          timeElapsed={timeElapsed}
        />
      </View>
    </View>
  );
};

import React, { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { useRepeater } from './hooks/use-repeater';
import { renderTimestamp } from './utils/date-utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export function App() {
  const [currentTimestamp, setCurrentTimestamp] = useState<number>();

  const { startTimestamp } = useRepeater(newCurrentTimestamp => {
    setCurrentTimestamp(newCurrentTimestamp);
  }, 100);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>Timer started at: {startTimestamp}</Text>
      <Text>Current timestamp is: {currentTimestamp}</Text>
      <Text>
        Current time is:{' '}
        {currentTimestamp === undefined
          ? undefined
          : renderTimestamp({ includeDate: true, includeTime: true })(
              currentTimestamp,
            )}
      </Text>
    </View>
  );
}

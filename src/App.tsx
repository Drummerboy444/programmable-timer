import React, { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>This is some text</Text>
    </View>
  );
}
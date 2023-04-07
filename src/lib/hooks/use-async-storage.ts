import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';

export const getAsyncStorageHook =
  <T>({
    serialise,
    deserialise,
  }: {
    serialise: (t: T) => string;
    deserialise: (s: string) => T | null;
  }) =>
  ({ key, defaultValue }: { key: string; defaultValue: T }) => {
    const [value, setValue] = useState<T>(defaultValue);

    useEffect(() => {
      const getInitialValue = async () => {
        const serialisedItem = await AsyncStorage.getItem(key);
        const deserialisedItem =
          serialisedItem === null ? null : deserialise(serialisedItem);
        setValue(deserialisedItem === null ? defaultValue : deserialisedItem);
      };
      getInitialValue();
    }, [defaultValue, key]);

    useEffect(() => {
      const setNewValue = async () => {
        await AsyncStorage.setItem(key, serialise(value));
      };
      setNewValue();
    }, [key, value]);

    return { value, setValue };
  };

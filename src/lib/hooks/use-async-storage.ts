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
  ({ key }: { key: string }) => {
    const [value, setValue] = useState<T | null>(null);

    useEffect(() => {
      const getInitialValue = async () => {
        const serialisedItem = await AsyncStorage.getItem(key);
        const deserialisedItem =
          serialisedItem === null ? null : deserialise(serialisedItem);
        setValue(deserialisedItem);
      };
      getInitialValue();
    }, [key]);

    useEffect(() => {
      const setNewValue = async () => {
        if (value === null) await AsyncStorage.removeItem(key);
        else await AsyncStorage.setItem(key, serialise(value));
      };
      setNewValue();
    }, [key, value]);

    return { value, setValue };
  };

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import * as O from 'fp-ts/Option';
import { identity, pipe } from 'fp-ts/lib/function';

const getItemOptional = async (key: string) =>
  O.fromNullable(await AsyncStorage.getItem(key));

export const getAsyncStorageHook =
  <T>({
    serialise,
    deserialise,
  }: {
    serialise: (t: T) => string;
    deserialise: (s: string) => O.Option<T>;
  }) =>
  ({ key, defaultValue }: { key: string; defaultValue: T }) => {
    const [value, setValue] = useState<T>(defaultValue);

    useEffect(() => {
      const getInitialValue = async () => {
        pipe(
          await getItemOptional(key),
          O.chain(deserialise),
          O.getOrElse(() => defaultValue),
          setValue,
        );
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

export const useAsyncStringStorage = getAsyncStorageHook<string>({
  serialise: identity,
  deserialise: O.of,
});

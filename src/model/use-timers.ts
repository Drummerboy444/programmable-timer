import { flow, pipe } from 'fp-ts/lib/function';
import { useAsyncStringStorage } from '../lib/hooks/use-async-storage';
import { deserialiseTimers, serialiseTimers } from './utils';

const TIMERS_KEY = 'timers';

export const useTimers = () => {
  const { value: serialisedTimers, setValue: setSerialisedTimers } =
    useAsyncStringStorage({
      key: TIMERS_KEY,
      defaultValue: '',
    });

  return {
    timers: pipe(deserialiseTimers(serialisedTimers), as => [...as]),
    setTimers: flow(serialiseTimers, setSerialisedTimers),
  };
};

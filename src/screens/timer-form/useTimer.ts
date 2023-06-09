import { useCallback, useState } from 'react';
import { useRepeater } from '../../lib/hooks/use-repeater';

type TimingEvent = {
  start: number;
  end: number | undefined;
};

const REPEATER_INTERVAL = 10;

const calculateSingularTimeElapsed = ({ start, end }: TimingEvent) =>
  end === undefined ? 0 : end - start;

const calculateLastTimeElapsed = (lastTimingEvent: TimingEvent | undefined) =>
  lastTimingEvent === undefined
    ? 0
    : (lastTimingEvent.end === undefined ? Date.now() : lastTimingEvent.end) -
      lastTimingEvent.start;

const calculateTimeElapsed = (timingEvents: TimingEvent[]) => {
  const firstTimingEvents = timingEvents.slice(0, timingEvents.length - 1);
  const lastTimingEvent = timingEvents[timingEvents.length - 1];

  return (
    firstTimingEvents
      .map(calculateSingularTimeElapsed)
      .reduce((a, b) => a + b, 0) + calculateLastTimeElapsed(lastTimingEvent)
  );
};

export const useTimer = () => {
  const [playing, setPlaying] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [timingEvents, setTimingEvents] = useState<TimingEvent[]>([]);

  const togglePlaying = useCallback(() => {
    if (playing) {
      const firstTimingEvents = timingEvents.slice(0, timingEvents.length - 1);
      const lastTimingEvent = timingEvents[timingEvents.length - 1];
      if (lastTimingEvent === undefined) return;

      setPlaying(false);
      setTimingEvents([
        ...firstTimingEvents,
        { start: lastTimingEvent.start, end: Date.now() },
      ]);
    } else {
      setPlaying(true);
      setTimingEvents([...timingEvents, { start: Date.now(), end: undefined }]);
    }
  }, [playing, timingEvents]);

  const reset = useCallback(() => {
    setPlaying(false);
    setTimeElapsed(0);
    setTimingEvents([]);
  }, []);

  useRepeater(() => {
    setTimeElapsed(calculateTimeElapsed(timingEvents));
  }, REPEATER_INTERVAL);

  return {
    playing,
    timeElapsed,
    togglePlaying,
    reset,
  };
};

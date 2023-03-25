import { useEffect, useState } from 'react';

export const useRepeater = (
  callback: (currentTimestamp: number) => void,
  intervalMs: number,
) => {
  const [startTimestamp] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => callback(Date.now()), intervalMs);
    return () => clearInterval(interval);
  }, [callback, intervalMs]);

  return { startTimestamp };
};

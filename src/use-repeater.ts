import { useEffect } from 'react';

export const useRepeater = (callback: () => void, intervalMs: number) => {
  useEffect(() => {
    const interval = setInterval(() => callback(), intervalMs);
    return () => clearInterval(interval);
  }, [callback, intervalMs]);
};

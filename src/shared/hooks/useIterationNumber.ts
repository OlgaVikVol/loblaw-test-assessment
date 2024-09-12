import { PING_DELAY } from '@/shared/consts/api';
import { useEffect, useState } from 'react';

/**
 * Custom hook to increment the iteration number every `PING_DELAY` milliseconds.
 * 
 * This hook sets an interval that increases the iteration number periodically based on the `PING_DELAY` value. 
 * It can be useful for polling or repeatedly fetching data from an API.
 * 
 * @returns {Object} - The returned object contains:
 * - `iteration` {number} - The current iteration number, which increments over time.
 */
export const useIterationNumber = () => {
  const [iteration, setIteration] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIteration((prev) => prev + 1);
    }, PING_DELAY);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return { iteration };
};

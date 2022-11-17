import { useEffect, useRef } from 'react';

export function useInterval(callback, delay) {
  const savedCallback = useRef();
  const idRef = useRef();

  // Remember the latest callback
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      idRef.current = setInterval(tick, delay);

      return () => clearInterval(idRef.current);
    }

    return () => {};
  }, [delay]);

  return idRef;
}

import useInterval from 'react-useinterval';
import { EffectCallback, useEffect, useRef } from 'react';

const usePersonify = (cb: EffectCallback, delay: number | null, personify: any = {}) => {
  const savedCallback = useRef<EffectCallback>();
  useEffect(() => {
    savedCallback.current = cb;
  });

  useInterval(() => {
    if (personify.apiCalls?.length !== 0) {
      savedCallback.current?.();
    }
  }, delay);
};

export default usePersonify;

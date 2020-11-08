import { useEffect, useState } from 'react';

import noop from 'lodash/noop';

export const useTimestampTimer = ({
  tillTimestamp = null,
  delay = 1000,
  onStart: onOuterStart = noop,
  onFinish: onOuterFinish = noop,
}) => {
  function getCurrentCounter() {
    const currentTimestamp = new Date().getTime();
    const diff = tillTimestamp - currentTimestamp;
    const restSteps = diff / delay;

    return Math.max(Math.ceil(restSteps), 0);
  }

  const [counter, setCounter] = useState(getCurrentCounter);

  useEffect(() => {
    onOuterStart();

    const initialCurrentCounter = getCurrentCounter();
    setCounter(initialCurrentCounter);

    const isInitiallyFinished = initialCurrentCounter === 0;

    if (isInitiallyFinished) {
      onOuterFinish();
      return noop;
    }

    const intervalId = setInterval(() => {
      const currentCounter = getCurrentCounter();
      const isFinished = currentCounter === 0;

      if (isFinished) {
        onOuterFinish();
        clearInterval(intervalId);
      }

      setCounter(currentCounter);
    }, delay);

    return () => clearInterval(intervalId);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay, tillTimestamp]);

  return counter;
};

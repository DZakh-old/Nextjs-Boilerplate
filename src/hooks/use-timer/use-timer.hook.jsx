import { useEffect, useState } from 'react';

import { noop } from 'lodash';

const useTimer = ({ from = 0, to = Infinity, delay = 1000, onStart = noop, onFinish = noop }) => {
  const [counter, setCounter] = useState(from);

  useEffect(() => {
    onStart();

    setCounter(from);

    const isInitiallyFinished = from === to;

    if (isInitiallyFinished) {
      onFinish();
      return noop;
    }

    const isAscending = to > from;
    const diff = isAscending ? 1 : -1;

    const intervalId = setInterval(() => {
      setCounter((currentCounter) => {
        const newCounter = currentCounter + diff;
        const isFinished = newCounter === to;

        if (isFinished) {
          onFinish();
          clearInterval(intervalId);
        }

        return newCounter;
      });
    }, delay);

    return () => {
      return clearInterval(intervalId);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay, from, to]);

  return counter;
};

export default useTimer;

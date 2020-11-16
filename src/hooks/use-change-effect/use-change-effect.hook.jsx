import { useEffect, useRef } from 'react';

import noop from 'lodash/noop';

const useChangeEffect = (callback, dependencies) => {
  const shouldSkipEffectRef = useRef(true);

  useEffect(() => {
    if (shouldSkipEffectRef.current) {
      shouldSkipEffectRef.current = false;
      return noop;
    }

    return callback();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
};

export default useChangeEffect;

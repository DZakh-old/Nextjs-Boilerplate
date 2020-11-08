import React, { useEffect, useRef } from 'react';

import noop from 'lodash/noop';

const useChangeEffect = (
  callback: React.EffectCallback,
  dependencies: React.DependencyList
): void => {
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

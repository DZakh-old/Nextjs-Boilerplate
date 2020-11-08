import { useEffect, useState, useRef } from 'react';

const useSnapshotBeforeEffect = ({
  value,
  initialValue,
  dependencies = [],
  shouldSkipInitialEffect = false,
  callback,
}) => {
  const shouldSkipEffectRef = useRef(shouldSkipInitialEffect);
  const [trakedValue, setTrakedValue] = useState(initialValue);

  useEffect(() => {
    setTrakedValue((currentTrakedValue) => {
      if (shouldSkipEffectRef.current) {
        shouldSkipEffectRef.current = false;
        return currentTrakedValue;
      }

      return callback({ prevValue: currentTrakedValue, newValue: value });
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, ...dependencies]);

  return trakedValue;
};

export default useSnapshotBeforeEffect;

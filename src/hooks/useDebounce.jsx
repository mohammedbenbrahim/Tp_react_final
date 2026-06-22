import { useState, useEffect } from "react";

/**
 * Hook pour débouncer une valeur
 */
function useDebounce(value, delay = 500) {
  // ======================
  // STATE
  // ======================
  const [debouncedValue, setDebouncedValue] = useState(value);

  // ======================
  // EFFECT
  // ======================
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // cleanup: cancel previous timer
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  // ======================
  // RETURN
  // ======================
  return debouncedValue;
}

export default useDebounce;
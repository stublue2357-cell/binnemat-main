import { useState, useEffect } from 'react';

/**
 * Custom hook to debounce dynamic user inputs (search, filter, form fields)
 * Delays updating the debounced value until after 500ms of inactivity.
 * Prevents firing API requests on every keystroke.
 */
export function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

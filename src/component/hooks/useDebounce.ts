import { useEffect, useState } from "react";

const useDebounce = <T>(value: T, delay: number = 100) => {
  const [debounceValue, setDebounceValue] = useState<T>(value);
  useEffect(() => {
    const debounceTimer = setTimeout(() => setDebounceValue(value), delay);
    return () => {
      clearTimeout(debounceTimer);
    };
  }, [value, delay]);
  return debounceValue;
};
export default useDebounce;

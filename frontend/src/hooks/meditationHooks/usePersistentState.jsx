import { useState, useEffect } from "react";

export function usePersistentState(
  key,
  defaultValue,
  parse = (v) => v,
  stringify = (v) => v
) {
  const stored = localStorage.getItem(key);
  const initial = stored !== null ? parse(stored) : defaultValue;

  const [value, setValue] = useState(initial);

  useEffect(() => {
    localStorage.setItem(key, stringify(value));
  }, [key, value, stringify]);

  return [value, setValue];
}

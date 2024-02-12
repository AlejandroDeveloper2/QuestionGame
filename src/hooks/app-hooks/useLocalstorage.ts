import { useState, useEffect } from "react";

const useLocalstorage = <T>(key: string, defaultValue: T | null = null) => {
  const [lsValue, setLsValue] = useState<T | null>(() => {
    try {
      const saved = window.localStorage.getItem(key);
      if (saved !== null) {
        return JSON.parse(saved);
      }
      return defaultValue;
    } catch {
      return defaultValue;
    }
  });

  useEffect(() => {
    const rawValue = window.JSON.stringify(lsValue);
    window.localStorage.setItem(key, rawValue);
  }, [key, lsValue]);

  return { lsValue, setLsValue };
};
export default useLocalstorage;

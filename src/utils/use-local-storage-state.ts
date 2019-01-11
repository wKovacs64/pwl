import { useState, useEffect } from 'react';
import { useLocalStorage } from 'react-use';

const useLocalStorageState = <T>(
  key: string,
  initialValue: T,
): [T, (newValue: T) => void] => {
  const [value, setValue] = useState<T>(initialValue);
  const [persistedValue, persistValue] = useLocalStorage<T>(key, initialValue);

  useEffect(() => {
    // sync up in-memory state with localStorage on mount
    setValue(persistedValue);
  }, []);

  const setAndPersistValue = (newValue: T): void => {
    persistValue(newValue);
    setValue(newValue);
  };

  return [value, setAndPersistValue];
};

export default useLocalStorageState;

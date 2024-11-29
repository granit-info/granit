import { useEffect, useState } from "react";

export function useSyncedState<T>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  // Чтение из sessionStorage с обработкой случаев, когда данных нет или они некорректны
  const getInitialValue = (): T => {
    try {
      const item = sessionStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      // Если данные некорректны, возвращаем значение по умолчанию
      return initialValue;
    }
  };

  const [state, setState] = useState<T>(getInitialValue);

  // Синхронизация с sessionStorage
  useEffect(() => {
    try {
      sessionStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.error("Failed to save state to sessionStorage:", error);
    }
  }, [key, state]);

  return [state, setState];
}

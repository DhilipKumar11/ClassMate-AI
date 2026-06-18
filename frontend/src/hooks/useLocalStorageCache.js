import { useEffect, useState } from "react";
import { safeJsonParse } from "../utils/helpers";

export function useLocalStorageCache(key, limit = 10) {
  const normalizeItems = (value) => (Array.isArray(value) ? value : []);

  const [items, setItems] = useState(() => {
    if (typeof window === "undefined") {
      return [];
    }

    return normalizeItems(safeJsonParse(window.localStorage.getItem(key), []));
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(items));
  }, [items, key]);

  const addItem = (item) => {
    setItems((prev) => {
      const safePrev = normalizeItems(prev);
      const next = [item, ...safePrev.filter((entry) => entry.id !== item.id)];
      return next.slice(0, limit);
    });
  };

  const clearItems = () => setItems([]);

  return { items, addItem, clearItems };
}

import { useSyncExternalStore } from 'react';

function subscribe(callback: () => void) {
  window.addEventListener('storage', callback);
  return () => window.removeEventListener('storage', callback);
}

function useLocalStorage(key: string, defaultValue = '') {
  return useSyncExternalStore(
    subscribe,
    () => localStorage.getItem(key) ?? defaultValue, // client snapshot
    () => defaultValue, // server snapshot (SSR-safe fallback)
  );
}

export default useLocalStorage;

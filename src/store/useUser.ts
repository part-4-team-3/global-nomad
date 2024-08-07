import { User } from '@/types/user';
import { create } from 'zustand';
import { persist, PersistStorage, StorageValue } from 'zustand/middleware';

interface AuthStore {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

interface StorageItem<T> {
  state: StorageValue<T>;
  expiry: number;
}

const createExpiringStorage = <T>(expireInMinutes: number): PersistStorage<T> => {
  const storage = localStorage;

  return {
    getItem: (name: string): StorageValue<T> | null => {
      const itemStr = storage.getItem(name);
      if (!itemStr) return null;

      const item: StorageItem<T> = JSON.parse(itemStr);
      if (new Date().getTime() > item.expiry) {
        storage.removeItem(name);
        return null;
      }
      return item.state;
    },
    setItem: (name: string, value: StorageValue<T>): void => {
      const item: StorageItem<T> = {
        state: value,
        expiry: new Date().getTime() + expireInMinutes * 60 * 1000,
      };
      storage.setItem(name, JSON.stringify(item));
    },
    removeItem: (name: string): void => {
      storage.removeItem(name);
    },
  };
};

const useUser = create(
  persist<AuthStore>(
    (set) => ({
      user: null,
      setUser: (user: User) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'user',
      storage: createExpiringStorage<AuthStore>(60 * 24),
    },
  ),
);

export default useUser;

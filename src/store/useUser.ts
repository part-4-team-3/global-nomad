import { User } from '@/types/user';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AuthStore {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

const useUser = create(
  persist<AuthStore>(
    (set) => ({
      user: null,
      setUser: (user: User) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'user',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useUser;

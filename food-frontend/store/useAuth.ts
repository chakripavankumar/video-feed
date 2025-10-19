import { create } from 'zustand';

type User = { id: string; name: string; role?: string } | null;

interface AuthState {
  user: User;
  setUser: (u: User) => void;
  clearUser: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  setUser: (u) => set({ user: u }),
  clearUser: () => set({ user: null }),
}));

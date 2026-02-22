import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthUser {
    name: string;
    email: string;
}

interface AuthState {
    token: string | null;
    user: AuthUser | null;
    login: (token: string, user: AuthUser) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            token: null,
            user: null,
            login: (token, user) => {
                if (!token || !user?.name) {
                    set({ token: null, user: null }); // Clear corrupted state
                } else {
                    set({ token, user });
                }
            },
            logout: () => set({ token: null, user: null }),
        }),
        {
            name: 'notes-auth-storage',
        }
    )
);

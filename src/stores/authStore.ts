import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authApi } from '@/lib/api';
import type { User, Driver, Dispatcher, Customer } from '@/types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, role: 'driver' | 'dispatcher' | 'customer') => Promise<void>;
  logout: () => void;
  updateUser: (user: User) => void;
  setDriver: (driver: Driver) => void;
  setDispatcher: (dispatcher: Dispatcher) => void;
  setCustomer: (customer: Customer) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email, password, role) => {
        set({ isLoading: true });

        try {
          const { user } = await authApi.login(email, password, role);

          // Add role-specific data
          let userWithRole = user;
          if (role === 'driver') {
            userWithRole = {
              ...user,
              role: 'driver',
              vehicleType: 'Van',
              licenseNumber: 'DL-12345',
              availability: true,
              currentLocation: { lat: 40.7128, lng: -74.006 },
            } as Driver;
          } else if (role === 'dispatcher') {
            userWithRole = {
              ...user,
              role: 'dispatcher',
              fleetIds: ['driver-1', 'driver-2'],
            } as Dispatcher;
          }

          set({
            user: userWithRole,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
        });
      },

      updateUser: (user) => set({ user }),

      setDriver: (driver) => set({ user: driver }),

      setDispatcher: (dispatcher) => set({ user: dispatcher }),

      setCustomer: (customer) => set({ user: customer }),
    }),
    {
      name: 'openspoke-auth',
    }
  )
);

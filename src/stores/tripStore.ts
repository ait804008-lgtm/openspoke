import { create } from 'zustand';
import type { Trip, Stop } from '@/types';

interface TripState {
  trips: Trip[];
  currentTrip: Trip | null;
  isLoading: boolean;
  createTrip: (trip: Omit<Trip, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateTrip: (id: string, updates: Partial<Trip>) => Promise<void>;
  deleteTrip: (id: string) => Promise<void>;
  setCurrentTrip: (trip: Trip | null) => void;
  addStop: (tripId: string, stop: Omit<Stop, 'id'>) => Promise<void>;
  updateStop: (tripId: string, stopId: string, updates: Partial<Stop>) => Promise<void>;
  deleteStop: (tripId: string, stopId: string) => Promise<void>;
  optimizeRoute: (tripId: string) => Promise<void>;
}

export const useTripStore = create<TripState>((set) => ({
  trips: [],
  currentTrip: null,
  isLoading: false,

  createTrip: async (tripData) => {
    set({ isLoading: true });

    // Mock API call - replace with actual API
    await new Promise((resolve) => setTimeout(resolve, 500));

    const newTrip: Trip = {
      ...tripData,
      id: `trip-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    set((state) => ({
      trips: [...state.trips, newTrip],
      isLoading: false,
    }));
  },

  updateTrip: async (id, updates) => {
    set({ isLoading: true });

    // Mock API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    set((state) => ({
      trips: state.trips.map((trip) =>
        trip.id === id ? { ...trip, ...updates, updatedAt: new Date() } : trip
      ),
      currentTrip:
        state.currentTrip?.id === id
          ? { ...state.currentTrip, ...updates, updatedAt: new Date() }
          : state.currentTrip,
      isLoading: false,
    }));
  },

  deleteTrip: async (id) => {
    set({ isLoading: true });

    // Mock API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    set((state) => ({
      trips: state.trips.filter((trip) => trip.id !== id),
      currentTrip: state.currentTrip?.id === id ? null : state.currentTrip,
      isLoading: false,
    }));
  },

  setCurrentTrip: (trip) => set({ currentTrip: trip }),

  addStop: async (tripId, stopData) => {
    set({ isLoading: true });

    // Mock API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    const newStop: Stop = {
      ...stopData,
      id: `stop-${Date.now()}`,
    };

    set((state) => ({
      trips: state.trips.map((trip) =>
        trip.id === tripId
          ? {
              ...trip,
              stops: [...trip.stops, newStop],
              updatedAt: new Date(),
            }
          : trip
      ),
      currentTrip:
        state.currentTrip?.id === tripId
          ? {
              ...state.currentTrip,
              stops: [...state.currentTrip.stops, newStop],
              updatedAt: new Date(),
            }
          : state.currentTrip,
      isLoading: false,
    }));
  },

  updateStop: async (tripId, stopId, updates) => {
    set({ isLoading: true });

    // Mock API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    set((state) => ({
      trips: state.trips.map((trip) =>
        trip.id === tripId
          ? {
              ...trip,
              stops: trip.stops.map((stop) =>
                stop.id === stopId ? { ...stop, ...updates } : stop
              ),
              updatedAt: new Date(),
            }
          : trip
      ),
      currentTrip:
        state.currentTrip?.id === tripId
          ? {
              ...state.currentTrip,
              stops: state.currentTrip.stops.map((stop) =>
                stop.id === stopId ? { ...stop, ...updates } : stop
              ),
              updatedAt: new Date(),
            }
          : state.currentTrip,
      isLoading: false,
    }));
  },

  deleteStop: async (tripId, stopId) => {
    set({ isLoading: true });

    // Mock API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    set((state) => ({
      trips: state.trips.map((trip) =>
        trip.id === tripId
          ? {
              ...trip,
              stops: trip.stops.filter((stop) => stop.id !== stopId),
              updatedAt: new Date(),
            }
          : trip
      ),
      currentTrip:
        state.currentTrip?.id === tripId
          ? {
              ...state.currentTrip,
              stops: state.currentTrip.stops.filter((stop) => stop.id !== stopId),
              updatedAt: new Date(),
            }
          : state.currentTrip,
      isLoading: false,
    }));
  },

  optimizeRoute: async (tripId) => {
    set({ isLoading: true });

    // Mock API call - replace with Google Routes API
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock route optimization result
    const mockResult = {
      distance: 15000, // 15km
      duration: 2700, // 45 minutes
      polyline: '',
    };

    set((state) => ({
      trips: state.trips.map((trip) =>
        trip.id === tripId
          ? {
              ...trip,
              optimizedRoute: mockResult,
              updatedAt: new Date(),
            }
          : trip
      ),
      currentTrip:
        state.currentTrip?.id === tripId
          ? {
              ...state.currentTrip,
              optimizedRoute: mockResult,
              updatedAt: new Date(),
            }
          : state.currentTrip,
      isLoading: false,
    }));
  },
}));

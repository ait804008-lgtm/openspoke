import { create } from 'zustand';
import { tripsApi, stopsApi } from '@/lib/api';
import type { Trip, Stop } from '@/types';

// Extend Trip type to include required timestamp fields
interface TripWithTimestamps extends Trip {
  createdAt: string;
  updatedAt: string;
}

interface TripState {
  trips: Trip[];
  currentTrip: Trip | null;
  isLoading: boolean;
  loadTrips: (dispatcherId: string) => Promise<void>;
  createTrip: (trip: Omit<Trip, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateTrip: (id: string, updates: Partial<Trip>) => Promise<void>;
  deleteTrip: (id: string) => Promise<void>;
  setCurrentTrip: (trip: Trip | null) => void;
  addStop: (tripId: string, stop: Omit<Stop, 'id' | 'createdAt'>) => Promise<void>;
  updateStop: (tripId: string, stopId: string, updates: Partial<Stop>) => Promise<void>;
  deleteStop: (tripId: string, stopId: string) => Promise<void>;
  optimizeRoute: (tripId: string) => Promise<void>;
}

export const useTripStore = create<TripState>((set, get) => ({
  trips: [],
  currentTrip: null,
  isLoading: false,

  loadTrips: async (dispatcherId: string) => {
    set({ isLoading: true });
    try {
      const response = await tripsApi.list(dispatcherId);

      if (response.status === 500) {
        throw new Error('Failed to load trips');
      }

      const { trips } = await response.json();
      set({ trips, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  createTrip: async (tripData) => {
    set({ isLoading: true });
    try {
      const response = await tripsApi.create(tripData);

      if (response.status === 500) {
        throw new Error('Failed to create trip');
      }

      const trip = await response.json();
      const now = new Date();

      set((state) => ({
        trips: [...state.trips, trip],
        currentTrip: trip,
        isLoading: false,
      }));
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  updateTrip: async (id, updates) => {
    set({ isLoading: true });
    try {
      const response = await tripsApi.update(id, updates);

      if (response.status === 500) {
        throw new Error('Failed to update trip');
      }

      const updatedTrip = await response.json();
      set((state) => ({
        trips: state.trips.map((trip) =>
          trip.id === id ? updatedTrip : trip
        ),
        currentTrip:
          state.currentTrip?.id === id ? updatedTrip : state.currentTrip,
        isLoading: false,
      }));
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  deleteTrip: async (id) => {
    set({ isLoading: true });
    try {
      const response = await tripsApi.delete(id);

      if (response.status === 500) {
        throw new Error('Failed to delete trip');
      }

      await response.json();

      set((state) => ({
        trips: state.trips.filter((trip) => trip.id !== id),
        currentTrip: state.currentTrip?.id === id ? null : state.currentTrip,
        isLoading: false,
      }));
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  setCurrentTrip: (trip) => set({ currentTrip: trip }),

  addStop: async (tripId, stopData) => {
    set({ isLoading: true });
    try {
      const response = await stopsApi.create(stopData);

      if (response.status === 500) {
        throw new Error('Failed to add stop');
      }

      const stop = await response.json();
      const now = new Date();

      set((state) => ({
        trips: state.trips.map((trip) =>
          trip.id === tripId
            ? {
                ...trip,
                stops: [...trip.stops, stop],
                updatedAt: now as unknown as string,
              }
            : trip
        ),
        currentTrip:
          state.currentTrip?.id === tripId
            ? {
                ...state.currentTrip,
                stops: [...state.currentTrip.stops, stop],
                updatedAt: now as unknown as string,
              }
            : state.currentTrip,
        isLoading: false,
      }));
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  updateStop: async (tripId, stopId, updates) => {
    set({ isLoading: true });
    try {
      const response = await stopsApi.update(stopId, updates);

      if (response.status === 500) {
        throw new Error('Failed to update stop');
      }

      const updatedStop = await response.json();
      const now = new Date();

      set((state) => ({
        trips: state.trips.map((trip) =>
          trip.id === tripId
            ? {
                ...trip,
                stops: trip.stops.map((stop) =>
                  stop.id === stopId ? updatedStop : stop
                ),
                updatedAt: now as unknown as string,
              }
            : trip
        ),
        currentTrip:
          state.currentTrip?.id === tripId
            ? {
                ...state.currentTrip,
                stops: state.currentTrip.stops.map((stop) =>
                  stop.id === stopId ? updatedStop : stop
                ),
                updatedAt: now as unknown as string,
              }
            : state.currentTrip,
        isLoading: false,
      }));
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  deleteStop: async (tripId, stopId) => {
    set({ isLoading: true });
    try {
      const response = await stopsApi.delete(stopId);

      if (response.status === 500) {
        throw new Error('Failed to delete stop');
      }

      await response.json();
      const now = new Date();

      set((state) => ({
        trips: state.trips.map((trip) =>
          trip.id === tripId
            ? {
                ...trip,
                stops: trip.stops.filter((stop) => stop.id !== stopId),
                updatedAt: now as unknown as string,
              }
            : trip
        ),
        currentTrip:
          state.currentTrip?.id === tripId
            ? {
                ...state.currentTrip,
                stops: state.currentTrip.stops.filter((stop) => stop.id !== stopId),
                updatedAt: now as unknown as string,
              }
            : state.currentTrip,
        isLoading: false,
      }));
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  optimizeRoute: async (tripId) => {
    set({ isLoading: true });
    try {
      const response = await tripsApi.optimize(tripId);

      if (response.status === 500) {
        throw new Error('Failed to optimize route');
      }

      const { optimizedRoute } = await response.json();
      const now = new Date();

      set((state) => ({
        trips: state.trips.map((trip) =>
          trip.id === tripId
            ? {
                ...trip,
                optimizedRoute,
                updatedAt: now as unknown as string,
              }
            : trip
        ),
        currentTrip:
          state.currentTrip?.id === tripId
            ? {
                ...state.currentTrip,
                optimizedRoute,
                updatedAt: now as unknown as string,
              }
            : state.currentTrip,
        isLoading: false,
      }));
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
}));

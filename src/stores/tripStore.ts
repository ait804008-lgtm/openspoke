import { create } from 'zustand';
import { tripsApi, stopsApi } from '@/lib/api';
import type { Trip, Stop } from '@/types';

// Extend Trip type to include required timestamp fields
interface TripWithTimestamps extends Trip {
  createdAt: Date;
  updatedAt: Date;
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
  addStop: (tripId: string, stop: Omit<Stop, 'id'>) => Promise<void>;
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
      const { trips } = await tripsApi.list(dispatcherId);
      set({ trips, isLoading: false });
    } catch (error) {
      console.error('Failed to load trips:', error);
      set({ isLoading: false });
    }
  },

  createTrip: async (tripData) => {
    set({ isLoading: true });
    try {
      const trip = await tripsApi.create(tripData);
      set((state) => ({
        trips: [...state.trips, trip],
        currentTrip: trip,
        isLoading: false,
      }));
    } catch (error) {
      console.error('Failed to create trip:', error);
      set({ isLoading: false });
      throw error;
    }
  },

  updateTrip: async (id, updates) => {
    set({ isLoading: true });
    try {
      const updatedTrip = await tripsApi.update(id, updates);
      set((state) => ({
        trips: state.trips.map((trip) =>
          trip.id === id ? updatedTrip : trip
        ),
        currentTrip:
          state.currentTrip?.id === id ? updatedTrip : state.currentTrip,
        isLoading: false,
      }));
    } catch (error) {
      console.error('Failed to update trip:', error);
      set({ isLoading: false });
      throw error;
    }
  },

  deleteTrip: async (id) => {
    set({ isLoading: true });
    try {
      await tripsApi.delete(id);
      set((state) => ({
        trips: state.trips.filter((trip) => trip.id !== id),
        currentTrip: state.currentTrip?.id === id ? null : state.currentTrip,
        isLoading: false,
      }));
    } catch (error) {
      console.error('Failed to delete trip:', error);
      set({ isLoading: false });
      throw error;
    }
  },

  setCurrentTrip: (trip) => set({ currentTrip: trip }),

  addStop: async (tripId, stopData) => {
    set({ isLoading: true });
    try {
      const stop = await stopsApi.create(stopData);
      const now = new Date();

      set((state) => ({
        trips: state.trips.map((trip) =>
          trip.id === tripId
            ? {
                ...trip,
                stops: [...trip.stops, stop],
                updatedAt: now as TripWithTimestamps['updatedAt'],
              }
            : trip
        ),
        currentTrip:
          state.currentTrip?.id === tripId
            ? {
                ...state.currentTrip,
                stops: [...state.currentTrip.stops, stop],
                updatedAt: now as TripWithTimestamps['updatedAt'],
              }
            : state.currentTrip,
        isLoading: false,
      }));
    } catch (error) {
      console.error('Failed to add stop:', error);
      set({ isLoading: false });
      throw error;
    }
  },

  updateStop: async (tripId, stopId, updates) => {
    set({ isLoading: true });
    try {
      const updatedStop = await stopsApi.update(stopId, updates);
      const now = new Date();

      set((state) => ({
        trips: state.trips.map((trip) =>
          trip.id === tripId
            ? {
                ...trip,
                stops: trip.stops.map((stop) =>
                  stop.id === stopId ? updatedStop : stop
                ),
                updatedAt: now as TripWithTimestamps['updatedAt'],
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
                updatedAt: now as TripWithTimestamps['updatedAt'],
              }
            : state.currentTrip,
        isLoading: false,
      }));
    } catch (error) {
      console.error('Failed to update stop:', error);
      set({ isLoading: false });
      throw error;
    }
  },

  deleteStop: async (tripId, stopId) => {
    set({ isLoading: true });
    try {
      await stopsApi.delete(stopId);
      const now = new Date();

      set((state) => ({
        trips: state.trips.map((trip) =>
          trip.id === tripId
            ? {
                ...trip,
                stops: trip.stops.filter((stop) => stop.id !== stopId),
                updatedAt: now as TripWithTimestamps['updatedAt'],
              }
            : trip
        ),
        currentTrip:
          state.currentTrip?.id === tripId
            ? {
                ...state.currentTrip,
                stops: state.currentTrip.stops.filter((stop) => stop.id !== stopId),
                updatedAt: now as TripWithTimestamps['updatedAt'],
              }
            : state.currentTrip,
        isLoading: false,
      }));
    } catch (error) {
      console.error('Failed to delete stop:', error);
      set({ isLoading: false });
      throw error;
    }
  },

  optimizeRoute: async (tripId) => {
    set({ isLoading: true });
    try {
      const { optimizedRoute } = await tripsApi.optimize(tripId);
      const now = new Date();

      set((state) => ({
        trips: state.trips.map((trip) =>
          trip.id === tripId
            ? { ...trip, optimizedRoute, updatedAt: now as TripWithTimestamps['updatedAt'] }
            : trip
        ),
        currentTrip:
          state.currentTrip?.id === tripId
            ? { ...state.currentTrip, optimizedRoute, updatedAt: now as TripWithTimestamps['updatedAt'] }
            : state.currentTrip,
        isLoading: false,
      }));
    } catch (error) {
      console.error('Failed to optimize route:', error);
      set({ isLoading: false });
      throw error;
    }
  },
}));

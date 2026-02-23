import { NextRequest, NextResponse } from 'next/server';

// Mock API client for server-side use
export const tripsApi = {
  list: async (dispatcherId?: string) => {
    // This will be called from API routes
    return { status: 200 };
  },

  create: async (trip: any) => {
    return { status: 201, trip: { ...trip, id: 'mock-trip', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() } };
  },

  update: async (id: string, updates: any) => {
    return { status: 200 };
  },

  delete: async (id: string) => {
    return { status: 200, success: true };
  },

  optimize: async (tripId: string) => {
    return { status: 200, optimizedRoute: { distance: 10000, duration: 1800, polyline: '' } };
  },
};

export const stopsApi = {
  list: async (tripId?: string) => {
    return { status: 200, stops: [] };
  },

  create: async (stop: any) => {
    return { status: 201, stop: { ...stop, id: 'mock-stop', createdAt: new Date().toISOString() } };
  },

  update: async (stopId: string, updates: any) => {
    return { status: 200, stop: updates };
  },

  delete: async (stopId: string) => {
    return { status: 200, success: true };
  },
};

export const authApi = {
  login: async (email: string, password: string, role: string) => {
    return {
      status: 200,
      user: {
        id: 'user-' + Date.now(),
        email,
        name: email.split('@')[0],
        role,
        createdAt: new Date().toISOString(),
      }
    };
  },
};

// Global test utilities

import { render } from '@testing-library/react';
import { tripsApi, stopsApi } from '@/lib/api';

// Mock API
jest.mock('@/lib/api', () => ({
  tripsApi: {
    list: jest.fn().mockResolvedValue({ trips: [] }),
    get: jest.fn(),
    create: jest.fn().mockResolvedValue({ id: 'trip-1' }),
    update: jest.fn().mockResolvedValue({ id: 'trip-1', name: 'Updated' }),
    delete: jest.fn().mockResolvedValue({ success: true }),
    optimize: jest.fn().mockResolvedValue({
      optimizedRoute: { distance: 10000, duration: 1800 },
    }),
  },
  stopsApi: {
    list: jest.fn().mockResolvedValue({ stops: [] }),
    get: jest.fn(),
    create: jest.fn().mockResolvedValue({ id: 'stop-1' }),
    update: jest.fn().mockResolvedValue({ id: 'stop-1', status: 'delivered' }),
    delete: jest.fn().mockResolvedValue({ success: true }),
  },
}));

export { render, tripsApi, stopsApi };

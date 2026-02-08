// Mock data generator for openSpoke

export const generateMockTrips = (dispatcherId: string, count: number = 3) => {
  const tripNames = [
    'Downtown Deliveries - Feb 8',
    'Industrial Park Route',
    'Residential Morning Run',
    'Office Complex Drop-offs',
    'Retail Store Deliveries',
  ];

  const statuses = ['draft', 'assigned', 'in_progress', 'completed'];

  return Array.from({ length: count }, (_, i) => ({
    id: `trip-mock-${i + 1}`,
    dispatcherId,
    name: tripNames[i % tripNames.length],
    date: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toISOString(),
    status: statuses[i % statuses.length],
    priority: ['low', 'medium', 'high'][i % 3],
    optimizedRoute: i % 2 === 0 ? {
      distance: 5000 + Math.random() * 10000,
      duration: 1200 + Math.random() * 1800,
      polyline: '',
    } : null,
    createdAt: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - i * 12 * 60 * 60 * 1000).toISOString(),
  }));
};

export const generateMockStops = (tripId: string, count: number = 3) => {
  const streets = ['Main St', 'Broadway', 'Park Ave', '5th Ave', 'Wall St', 'Madison Ave'];
  const cities = ['New York', 'Brooklyn', 'Queens', 'Manhattan', 'Bronx'];
  const states = ['NY', 'NY', 'NY', 'NY', 'NY'];
  const zipCodes = ['10001', '10002', '10003', '10004', '10005'];

  const contactNames = ['John Doe', 'Jane Smith', 'Bob Johnson', 'Alice Brown', 'Charlie Wilson'];
  const phones = ['(555) 123-4567', '(555) 234-5678', '(555) 345-6789', '(555) 456-7890', '(555) 567-8901'];

  const packageInfos = [
    'Small box - Fragile',
    'Medium package',
    'Large box - Heavy',
    'Envelope - Documents',
    'Electronics - Handle with care',
  ];

  const instructions = [
    'Leave at door',
    'Ring doorbell twice',
    'Call on arrival',
    'Leave with reception',
    'Deliver to loading dock',
  ];

  const statuses = ['pending', 'picked_up', 'in_transit', 'arrived', 'delivered'];

  return Array.from({ length: count }, (_, i) => {
    const lat = 40.7128 + (Math.random() - 0.5) * 0.1;
    const lng = -74.006 + (Math.random() - 0.5) * 0.1;

    const status = statuses[Math.min(i, statuses.length - 1)];
    const deliveredAt = status === 'delivered' ? new Date(Date.now() - i * 30 * 60 * 1000).toISOString() : undefined;

    return {
      id: `stop-mock-${tripId}-${i + 1}`,
      tripId,
      sequence: i + 1,
      address: {
        street: `${100 + i * 10} ${streets[i % streets.length]}`,
        city: cities[i % cities.length],
        state: states[i % states.length],
        zipCode: zipCodes[i % zipCodes.length],
        coordinates: { lat, lng },
      },
      contactInfo: {
        name: contactNames[i % contactNames.length],
        phone: phones[i % phones.length],
      },
      packageInfo: packageInfos[i % packageInfos.length],
      instructions: instructions[i % instructions.length],
      status,
      deliveredAt,
      createdAt: new Date(Date.now() - (count - i) * 60 * 60 * 1000).toISOString(),
    };
  });
};

export const generateMockUsers = () => {
  return {
    driver: {
      id: 'user-driver-1',
      email: 'driver@example.com',
      name: 'Mike Driver',
      role: 'driver',
      avatar: 'https://ui-avatars.com/api/?name=Mike+Driver&background=random',
      vehicleType: 'Delivery Van',
      licenseNumber: 'DL-12345',
      availability: true,
      currentLocation: { lat: 40.7128, lng: -74.006 },
    },
    dispatcher: {
      id: 'user-dispatcher-1',
      email: 'dispatcher@example.com',
      name: 'Sarah Dispatcher',
      role: 'dispatcher',
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Dispatcher&background=random',
      fleetIds: ['driver-1', 'driver-2'],
    },
    customer: {
      id: 'user-customer-1',
      email: 'customer@example.com',
      name: 'John Customer',
      role: 'customer',
      avatar: 'https://ui-avatars.com/api/?name=John+Customer&background=random',
      defaultAddress: {
        street: '123 Home St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        coordinates: { lat: 40.7128, lng: -74.006 },
      },
    },
  };
};

export const generateMockNotifications = (userId: string, count: number = 5) => {
  const types = ['delivery_assigned', 'delivery_status', 'route_change', 'message', 'delay'];
  const titles = [
    'New Delivery Assigned',
    'Delivery Status Update',
    'Route Changed',
    'New Message',
    'Delivery Delayed',
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: `notif-${userId}-${i + 1}`,
    userId,
    type: types[i % types.length],
    title: titles[i % titles.length],
    message: `This is a mock notification message ${i + 1}`,
    read: i > 2,
    createdAt: new Date(Date.now() - i * 15 * 60 * 1000).toISOString(),
  }));
};

// Helper to seed the API with mock data
export const seedMockData = async () => {
  const mockUsers = generateMockUsers();
  const dispatcherId = mockUsers.dispatcher.id;

  // Generate trips
  const trips = generateMockTrips(dispatcherId, 3);

  // Generate stops for each trip
  const allStops = trips.flatMap((trip) =>
    generateMockStops(trip.id, Math.floor(Math.random() * 3) + 2)
  );

  return {
    users: mockUsers,
    trips,
    stops: allStops,
  };
};

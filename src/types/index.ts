export type UserRole = 'driver' | 'dispatcher' | 'customer';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phone?: string;
  avatar?: string;
  createdAt: Date;
}

export interface Driver extends User {
  role: 'driver';
  vehicleType: string;
  licenseNumber: string;
  availability: boolean;
  currentLocation?: {
    lat: number;
    lng: number;
  };
}

export interface Dispatcher extends User {
  role: 'dispatcher';
  fleetIds?: string[];
}

export interface Customer extends User {
  role: 'customer';
  defaultAddress?: Address;
}

export interface Address {
  id?: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface Stop {
  id: string;
  tripId: string;
  sequence: number;
  address: Address;
  contactInfo: {
    name: string;
    phone: string;
  };
  packageInfo: string;
  status: StopStatus;
  timeWindow?: {
    start: Date;
    end: Date;
  };
  instructions?: string;
  deliveredAt?: Date;
  proofPhotoUrl?: string;
  signature?: string;
}

export type StopStatus = 'pending' | 'assigned' | 'picked_up' | 'in_transit' | 'arrived' | 'delivered' | 'failed';

export interface Trip {
  id: string;
  dispatcherId: string;
  driverId?: string;
  name: string;
  date: Date;
  status: TripStatus;
  stops: Stop[];
  optimizedRoute?: {
    distance: number;
    duration: number;
    polyline: string;
  };
  notes?: string;
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  updatedAt: Date;
}

export type TripStatus = 'draft' | 'assigned' | 'in_progress' | 'completed' | 'cancelled';

export interface Delivery {
  id: string;
  stopId: string;
  status: StopStatus;
  proofPhotoUrl?: string;
  signature?: string;
  deliveredAt?: Date;
  notes?: string;
  failedReason?: string;
}

export interface Message {
  id: string;
  tripId?: string;
  senderId: string;
  recipientId: string;
  content: string;
  sentAt: Date;
  read: boolean;
  type: 'text' | 'image' | 'location';
}

export interface Notification {
  id: string;
  userId: string;
  type: 'delivery_assigned' | 'delivery_status' | 'route_change' | 'message' | 'delay';
  title: string;
  message: string;
  data?: Record<string, unknown>;
  read: boolean;
  createdAt: Date;
}

export interface RouteOptimizationResult {
  optimizedSequence: number[];
  totalDistance: number;
  totalDuration: number;
  polyline: string;
}

export interface DriverLocation {
  driverId: string;
  tripId: string;
  location: {
    lat: number;
    lng: number;
  };
  speed?: number;
  heading?: number;
  timestamp: Date;
}

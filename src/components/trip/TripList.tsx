import { Trip } from '@/types';
import { formatDistance, formatDuration, formatDate } from '@/lib/utils';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import { MapPin, Calendar, Clock, Truck, User } from 'lucide-react';

interface TripListProps {
  trips: Trip[];
  onSelectTrip: (trip: Trip) => void;
  selectedTripId?: string;
}

const statusConfig = {
  draft: { color: 'bg-gray-100 text-gray-600', label: 'Draft' },
  assigned: { color: 'bg-blue-100 text-blue-600', label: 'Assigned' },
  in_progress: { color: 'bg-yellow-100 text-yellow-600', label: 'In Progress' },
  completed: { color: 'bg-green-100 text-green-600', label: 'Completed' },
  cancelled: { color: 'bg-red-100 text-red-600', label: 'Cancelled' },
};

export function TripList({ trips, onSelectTrip, selectedTripId }: TripListProps) {
  return (
    <div className="space-y-4">
      {trips.length === 0 ? (
        <div className="text-center py-12">
          <MapPin className="mx-auto h-12 w-12 text-gray-300" />
          <p className="mt-2 text-sm text-gray-500">No trips created yet</p>
        </div>
      ) : (
        trips.map((trip) => {
          const config = statusConfig[trip.status];
          const completedStops = trip.stops.filter((s) => s.status === 'delivered').length;
          const totalStops = trip.stops.length;

          return (
            <Card
              key={trip.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedTripId === trip.id ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => onSelectTrip(trip)}
            >
              <CardBody className="space-y-3">
                {/* Trip Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{trip.name}</h3>
                    <p className="text-sm text-gray-500">ID: {trip.id}</p>
                  </div>
                  <div className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${config.color}`}>
                    {config.label}
                  </div>
                </div>

                {/* Trip Details */}
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(trip.date)}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <User className="h-4 w-4" />
                    <span>{trip.driverId ? 'Assigned' : 'Unassigned'}</span>
                  </div>
                  {trip.optimizedRoute && (
                    <>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <span>{formatDistance(trip.optimizedRoute.distance)}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>{formatDuration(trip.optimizedRoute.duration)}</span>
                      </div>
                    </>
                  )}
                </div>

                {/* Progress */}
                <div className="pt-2 border-t border-gray-100">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium text-gray-900">
                      {completedStops}/{totalStops} stops
                    </span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-200">
                    <div
                      className="h-full bg-blue-600 transition-all"
                      style={{ width: `${(completedStops / totalStops) * 100 || 0}%` }}
                    />
                  </div>
                </div>
              </CardBody>
            </Card>
          );
        })
      )}
    </div>
  );
}

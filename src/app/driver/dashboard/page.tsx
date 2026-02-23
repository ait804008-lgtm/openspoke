'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import { useTripStore } from '@/stores/tripStore';
import { GoogleMap } from '@/components/map/GoogleMap';
import { StopCard } from '@/components/stop/StopCard';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { formatDistance, formatDuration, formatDate } from '@/lib/utils';
import { MapPin, Clock, LogOut, Menu } from 'lucide-react';

export default function DriverDashboard() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const { currentTrip, optimizeRoute, updateStop } = useTripStore();

  useEffect(() => {
    // If no trip, could load today's trip from API
    if (!currentTrip) {
      // Mock loading a trip - replace with actual API call
      console.log('Loading today\'s trip...');
    }
  }, [currentTrip]);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const handleOptimizeRoute = async () => {
    if (currentTrip) {
      await optimizeRoute(currentTrip.id);
    }
  };

  const handleStatusChange = async (stopId: string, status: any) => {
    if (currentTrip) {
      await updateStop(currentTrip.id, stopId, { status });
    }
  };

  if (!user || user.role !== 'driver') {
    return <div>Redirecting...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm">
              <Menu className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="font-semibold text-gray-900">Driver Dashboard</h1>
              <p className="text-xs text-gray-500">{user.name}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <div className="p-4 space-y-4">
        {currentTrip ? (
          <>
            {/* Trip Info */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-lg font-semibold">{currentTrip.name}</h2>
                    <p className="text-sm text-gray-500">{formatDate(currentTrip.date)}</p>
                  </div>
                  <div className="text-right">
                    {currentTrip.optimizedRoute && (
                      <div className="text-sm text-gray-600">
                        <div className="flex items-center justify-end space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{formatDistance(currentTrip.optimizedRoute.distance)}</span>
                        </div>
                        <div className="flex items-center justify-end space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{formatDuration(currentTrip.optimizedRoute.duration)}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    {currentTrip.stops.filter((s) => s.status === 'delivered').length} / {currentTrip.stops.length} stops completed
                  </div>
                  <Button size="sm" onClick={handleOptimizeRoute}>
                    Optimize Route
                  </Button>
                </div>
              </CardBody>
            </Card>

            {/* Map */}
            <div className="h-64 rounded-xl overflow-hidden">
              <GoogleMap
                center={currentTrip.stops[0]?.address.coordinates || { lat: 40.7128, lng: -74.006 }}
                markers={currentTrip.stops.map((stop, index) => ({
                  position: stop.address.coordinates || { lat: 40.7128, lng: -74.006 },
                  label: String(index + 1),
                }))}
                polyline={{
                  path: currentTrip.stops
                    .filter((s) => s.address.coordinates)
                    .map((s) => s.address.coordinates!)
                    .filter((c): c is { lat: number; lng: number } => c !== undefined),
                }}
              />
            </div>

            {/* Stops List */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">Stops</h3>
              {currentTrip.stops.map((stop, index) => (
                <StopCard
                  key={stop.id}
                  stop={stop}
                  index={index}
                  isActive={stop.status === 'in_transit' || stop.status === 'arrived'}
                  onStatusChange={(status) => handleStatusChange(stop.id, status)}
                />
              ))}
            </div>
          </>
        ) : (
          <Card>
            <CardBody className="text-center py-12">
              <MapPin className="mx-auto h-12 w-12 text-gray-300" />
              <h3 className="mt-4 font-semibold text-gray-900">No active trip</h3>
              <p className="mt-2 text-sm text-gray-500">
                You don't have any trips assigned for today
              </p>
            </CardBody>
          </Card>
        )}
      </div>
    </div>
  );
}

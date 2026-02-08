'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import { useTripStore } from '@/stores/tripStore';
import { GoogleMap } from '@/components/map/GoogleMap';
import { TripList } from '@/components/trip/TripList';
import { StopCard } from '@/components/stop/StopCard';
import { StopForm } from '@/components/stop/StopForm';
import { Card, CardHeader, CardBody, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Plus, LogOut, MapIcon, List, MapPin } from 'lucide-react';

export default function DispatcherDashboard() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const { trips, currentTrip, createTrip, setCurrentTrip, optimizeRoute } = useTripStore();

  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showStopForm, setShowStopForm] = useState(false);
  const [newTripName, setNewTripName] = useState('');

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const handleCreateTrip = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTripName.trim()) return;

    await createTrip({
      dispatcherId: user!.id,
      name: newTripName,
      date: new Date(),
      status: 'draft',
      stops: [],
      priority: 'medium',
    });

    setNewTripName('');
    setShowCreateForm(false);
  };

  const handleSelectTrip = (trip: any) => {
    setCurrentTrip(trip);
  };

  const handleOptimizeRoute = async () => {
    if (currentTrip) {
      await optimizeRoute(currentTrip.id);
    }
  };

  if (!user || user.role !== 'dispatcher') {
    return <div>Redirecting...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="px-4 py-3 flex items-center justify-between">
          <div>
            <h1 className="font-semibold text-gray-900">Dispatcher Dashboard</h1>
            <p className="text-xs text-gray-500">{user.name}</p>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar - Trip List */}
        <aside className="w-full md:w-96 bg-white border-r border-gray-200 min-h-screen">
          <div className="p-4">
            {/* View Toggle */}
            <div className="flex space-x-2 mb-4">
              <Button
                variant={viewMode === 'list' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="flex-1"
              >
                <List className="h-4 w-4 mr-1" />
                List
              </Button>
              <Button
                variant={viewMode === 'map' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setViewMode('map')}
                className="flex-1"
              >
                <MapIcon className="h-4 w-4 mr-1" />
                Map
              </Button>
            </div>

            {/* Create Trip Button */}
            <Button onClick={() => setShowCreateForm(true)} className="w-full mb-4">
              <Plus className="h-4 w-4 mr-1" />
              New Trip
            </Button>

            {/* Create Trip Form */}
            {showCreateForm && (
              <Card className="mb-4">
                <CardBody>
                  <form onSubmit={handleCreateTrip} className="space-y-3">
                    <Input
                      label="Trip Name"
                      placeholder="e.g., Downtown Deliveries - Feb7"
                      value={newTripName}
                      onChange={(e) => setNewTripName(e.target.value)}
                      required
                    />
                    <div className="flex space-x-2">
                      <Button type="submit" size="sm" className="flex-1">
                        Create
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setShowCreateForm(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardBody>
              </Card>
            )}

            {/* Trip List */}
            <TripList trips={trips} onSelectTrip={handleSelectTrip} selectedTripId={currentTrip?.id} />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {currentTrip ? (
            <div className="space-y-6">
              {/* Trip Header */}
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-xl font-semibold">{currentTrip.name}</h2>
                      <p className="text-sm text-gray-500">
                        {currentTrip.stops.length} stops • {currentTrip.status}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => setShowStopForm(true)}
                        size="sm"
                        disabled={currentTrip.status === 'completed' || currentTrip.status === 'cancelled'}
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add Stop
                      </Button>
                      {currentTrip.optimizedRoute && (
                        <Button onClick={handleOptimizeRoute} size="sm">
                          Re-optimize
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>
              </Card>

              {/* Map */}
              <div className="h-96 rounded-xl overflow-hidden">
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

              {/* Stops */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Route Stops</h3>
                {currentTrip.stops.length === 0 ? (
                  <Card>
                    <CardBody className="text-center py-12">
                      <MapPin className="mx-auto h-12 w-12 text-gray-300" />
                      <h3 className="mt-4 font-semibold text-gray-900">No stops yet</h3>
                      <p className="mt-2 text-sm text-gray-500">
                        Click "Add Stop" to add delivery stops to this trip
                      </p>
                      <Button
                        onClick={() => setShowStopForm(true)}
                        className="mt-4"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add Your First Stop
                      </Button>
                    </CardBody>
                  </Card>
                ) : (
                  <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                    {currentTrip.stops.map((stop, index) => (
                      <StopCard key={stop.id} stop={stop} index={index} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <Card>
              <CardBody className="text-center py-12">
                <MapIcon className="mx-auto h-12 w-12 text-gray-300" />
                <h3 className="mt-4 font-semibold text-gray-900">No trip selected</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Select a trip from the sidebar or create a new one
                </p>
              </CardBody>
            </Card>
          )}
        </main>
      </div>

      {/* Stop Form Modal */}
      {showStopForm && currentTrip && (
        <StopForm tripId={currentTrip.id} onClose={() => setShowStopForm(false)} />
      )}
    </div>
  );
}

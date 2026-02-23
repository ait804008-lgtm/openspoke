'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import { MapPin, Search, LogOut, ArrowLeft } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';

export default function CustomerTracking() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const [trackingId, setTrackingId] = useState('');
  const [searching, setSearching] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/auth/login');
  };

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId.trim()) return;

    setSearching(true);
    // Mock tracking - replace with actual API call
    setTimeout(() => {
      setSearching(false);
      alert(`Tracking delivery: ${trackingId}`);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" onClick={() => router.push('/')}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="font-semibold text-gray-900">Track Delivery</h1>
              <p className="text-xs text-gray-500">{user?.name || 'Guest'}</p>
            </div>
          </div>
          {user && (
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-5 w-5" />
            </Button>
          )}
        </div>
      </header>

      <div className="p-4">
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Track Your Delivery</h2>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleTrack} className="space-y-4">
              <Input
                label="Tracking ID"
                placeholder="Enter your tracking ID (e.g., TRK-123456)"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                required
              />
              <Button type="submit" className="w-full" disabled={searching}>
                <Search className="h-4 w-4 mr-2" />
                {searching ? 'Tracking...' : 'Track Delivery'}
              </Button>
            </form>
          </CardBody>
        </Card>

        <div className="mt-8 text-center">
          <MapPin className="mx-auto h-12 w-12 text-gray-300" />
          <p className="mt-4 text-sm text-gray-500">
            Enter your tracking ID to see real-time delivery status
          </p>
        </div>
      </div>
    </div>
  );
}

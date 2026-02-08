'use client';

import { useState } from 'react';
import { useTripStore } from '@/stores/tripStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardHeader, CardBody, CardFooter } from '@/components/ui/Card';
import { X } from 'lucide-react';

interface StopFormProps {
  tripId: string;
  onClose: () => void;
}

export function StopForm({ tripId, onClose }: StopFormProps) {
  const { addStop } = useTripStore();

  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [packageInfo, setPackageInfo] = useState('');
  const [instructions, setInstructions] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!street || !city || !contactName || !contactPhone) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);

    try {
      await addStop(tripId, {
        tripId,
        sequence: 0, // Will be updated by optimization
        address: {
          street,
          city,
          state,
          zipCode,
          coordinates: {
            // Mock coordinates - in real app, use Google Geocoding API
            lat: 40.7128 + (Math.random() - 0.5) * 0.1,
            lng: -74.006 + (Math.random() - 0.5) * 0.1,
          },
        },
        contactInfo: {
          name: contactName,
          phone: contactPhone,
        },
        packageInfo,
        instructions,
        status: 'pending',
      });

      onClose();
    } catch (error) {
      console.error('Failed to add stop:', error);
      alert('Failed to add stop');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="fixed inset-0 z-50 m-0 rounded-none">
      <CardHeader className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Add New Stop</h2>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardBody className="space-y-4 overflow-y-auto max-h-[calc(100vh-200px)]">
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              label="Street Address *"
              placeholder="123 Main St"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              required
            />
            <Input
              label="City *"
              placeholder="New York"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              label="State"
              placeholder="NY"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
            <Input
              label="ZIP Code"
              placeholder="10001"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
            />
          </div>
          <div className="border-t pt-4">
            <p className="text-sm font-medium text-gray-700 mb-3">Contact Information</p>
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                label="Contact Name *"
                placeholder="John Doe"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                required
              />
              <Input
                label="Contact Phone *"
                placeholder="(555) 123-4567"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="border-t pt-4">
            <p className="text-sm font-medium text-gray-700 mb-3">Delivery Details</p>
            <Input
              label="Package Information"
              placeholder="e.g., Small box - Fragile"
              value={packageInfo}
              onChange={(e) => setPackageInfo(e.target.value)}
            />
          </div>
          <Input
            label="Delivery Instructions"
            placeholder="e.g., Leave at door"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            multiline
          />
        </CardBody>
        <CardFooter className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? 'Adding...' : 'Add Stop'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

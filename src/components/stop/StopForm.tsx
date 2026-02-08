'use client';

import { useState } from 'react';
import { useTripStore } from '@/stores/tripStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardHeader, CardBody, CardFooter } from '@/components/ui/Card';
import { X, AlertCircle } from 'lucide-react';

interface StopFormProps {
  tripId: string;
  onClose: () => void;
}

// Validation functions
function validatePhone(phone: string): boolean {
  const phoneRegex = /^\(\d{3}\)\s*\d{3}-\d{4}$/;
  return phoneRegex.test(phone);
}

function validateName(name: string): boolean {
  return name.trim().length > 0 && name.trim().length <= 100;
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
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!street || !city || !contactName || !contactPhone) {
      setError('Please fill in all required fields');
      return;
    }

    if (!validatePhone(contactPhone)) {
      setError('Please enter a valid phone number (e.g., (555) 123-4567)');
      return;
    }

    if (!validateName(contactName)) {
      setError('Contact name must be between 1 and 100 characters');
      return;
    }

    if (street.length > 200) {
      setError('Street address is too long (max 200 characters)');
      return;
    }

    if (city.length > 100) {
      setError('City is too long (max 100 characters)');
      return;
    }

    setLoading(true);

    try {
      await addStop(tripId, {
        tripId,
        sequence: 0,
        address: {
          street: street.trim(),
          city: city.trim(),
          state: state.trim(),
          zipCode: zipCode.trim(),
          coordinates: {
            lat: 40.7128 + (Math.random() - 0.5) * 0.1,
            lng: -74.006 + (Math.random() - 0.5) * 0.1,
          },
        },
        contactInfo: {
          name: contactName.trim(),
          phone: contactPhone,
        },
        packageInfo: packageInfo.trim(),
        instructions: instructions.trim(),
        status: 'pending',
      });

      onClose();
    } catch (err: any) {
      console.error('Failed to add stop:', err);
      setError(err.message || 'Failed to add stop. Please try again.');
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
          {/* Error Display */}
          {error && (
            <div className="flex items-start space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-4">
            <Input
              label="Street Address *"
              placeholder="123 Main St"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              required
              maxLength={200}
            />
            <Input
              label="City *"
              placeholder="New York"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              maxLength={100}
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              label="State"
              placeholder="NY"
              value={state}
              onChange={(e) => setState(e.target.value)}
              maxLength={50}
            />
            <Input
              label="ZIP Code"
              placeholder="10001"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              maxLength={20}
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
                maxLength={100}
                helperText="1-100 characters"
              />
              <Input
                label="Contact Phone *"
                placeholder="(555) 123-4567"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                required
                helperText="Format: (555) 123-4567"
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
              maxLength={500}
            />
          </div>
          <Input
            label="Delivery Instructions"
            placeholder="e.g., Leave at door"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            multiline
            maxLength={500}
            rows={3}
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

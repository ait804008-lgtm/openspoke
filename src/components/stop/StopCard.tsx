import { Stop } from '@/types';
import { formatDistance, formatDuration } from '@/lib/utils';
import { MapPin, Clock, Phone, Package, CheckCircle, XCircle, Truck } from 'lucide-react';
import { Card } from '@/components/ui/Card';

interface StopCardProps {
  stop: Stop;
  index: number;
  isActive?: boolean;
  onStatusChange?: (status: Stop['status']) => void;
}

const statusConfig = {
  pending: { color: 'bg-gray-100 text-gray-600', icon: Clock, label: 'Pending' },
  assigned: { color: 'bg-blue-100 text-blue-600', icon: Package, label: 'Assigned' },
  picked_up: { color: 'bg-yellow-100 text-yellow-600', icon: Truck, label: 'Picked Up' },
  in_transit: { color: 'bg-blue-100 text-blue-600', icon: Truck, label: 'In Transit' },
  arrived: { color: 'bg-green-100 text-green-600', icon: MapPin, label: 'Arrived' },
  delivered: { color: 'bg-green-100 text-green-600', icon: CheckCircle, label: 'Delivered' },
  failed: { color: 'bg-red-100 text-red-600', icon: XCircle, label: 'Failed' },
};

export function StopCard({ stop, index, isActive = false, onStatusChange }: StopCardProps) {
  const config = statusConfig[stop.status];
  const StatusIcon = config.icon;

  return (
    <Card className={isActive ? 'ring-2 ring-blue-500' : ''}>
      <CardBody className="space-y-3">
        {/* Stop Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white font-bold">
              {index + 1}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Stop #{index + 1}</h3>
              <div className={`inline-flex items-center space-x-1 rounded-full px-2 py-0.5 text-xs ${config.color}`}>
                <StatusIcon className="h-3 w-3" />
                <span>{config.label}</span>
              </div>
            </div>
          </div>
          {stop.deliveredAt && (
            <span className="text-xs text-gray-500">
              {new Date(stop.deliveredAt).toLocaleTimeString()}
            </span>
          )}
        </div>

        {/* Address */}
        <div className="flex items-start space-x-2">
          <MapPin className="mt-0.5 h-4 w-4 text-gray-400" />
          <p className="text-sm text-gray-600">
            {stop.address.street}, {stop.address.city}, {stop.address.state} {stop.address.zipCode}
          </p>
        </div>

        {/* Contact Info */}
        <div className="flex items-center space-x-2">
          <Phone className="h-4 w-4 text-gray-400" />
          <div>
            <p className="text-sm font-medium text-gray-900">{stop.contactInfo.name}</p>
            <p className="text-sm text-gray-500">{stop.contactInfo.phone}</p>
          </div>
        </div>

        {/* Package Info */}
        {stop.packageInfo && (
          <div className="flex items-start space-x-2">
            <Package className="mt-0.5 h-4 w-4 text-gray-400" />
            <p className="text-sm text-gray-600">{stop.packageInfo}</p>
          </div>
        )}

        {/* Time Window */}
        {stop.timeWindow && (
          <div className="flex items-start space-x-2">
            <Clock className="mt-0.5 h-4 w-4 text-gray-400" />
            <p className="text-sm text-gray-600">
              Time Window: {new Date(stop.timeWindow.start).toLocaleTimeString()} -{' '}
              {new Date(stop.timeWindow.end).toLocaleTimeString()}
            </p>
          </div>
        )}

        {/* Instructions */}
        {stop.instructions && (
          <div className="rounded-lg bg-gray-50 p-2">
            <p className="text-xs text-gray-600">{stop.instructions}</p>
          </div>
        )}

        {/* Actions (for driver) */}
        {onStatusChange && isActive && (
          <div className="flex space-x-2 pt-2 border-t border-gray-100">
            <button
              onClick={() => onStatusChange('arrived')}
              className="flex-1 rounded-lg bg-blue-100 px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-200 transition-colors"
            >
              Arrived
            </button>
            <button
              onClick={() => onStatusChange('delivered')}
              className="flex-1 rounded-lg bg-green-100 px-3 py-1.5 text-sm font-medium text-green-600 hover:bg-green-200 transition-colors"
            >
              Delivered
            </button>
          </div>
        )}
      </CardBody>
    </Card>
  );
}

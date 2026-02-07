'use client';

import { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

interface GoogleMapProps {
  center?: { lat: number; lng: number };
  zoom?: number;
  markers?: Array<{
    position: { lat: number; lng: number };
    title?: string;
    label?: string;
  }>;
  polyline?: {
    path: Array<{ lat: number; lng: number }>;
    options?: google.maps.PolylineOptions;
  };
  onMapClick?: (event: google.maps.MapMouseEvent) => void;
  className?: string;
}

export function GoogleMap({
  center = { lat: 40.7128, lng: -74.006 },
  zoom = 12,
  markers = [],
  polyline,
  onMapClick,
  className = '',
}: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markersMap, setMarkersMap] = useState<Map<string, google.maps.Marker>>(new Map());
  const [polylineInstance, setPolylineInstance] = useState<google.maps.Polyline | null>(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
      version: 'weekly',
      libraries: ['places', 'geometry'],
    });

    loader.load().then(() => {
      if (mapRef.current && !map) {
        const mapInstance = new google.maps.Map(mapRef.current, {
          center,
          zoom,
          mapTypeId: 'roadmap',
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }],
            },
          ],
        });

        if (onMapClick) {
          mapInstance.addListener('click', onMapClick);
        }

        setMap(mapInstance);
      }
    });
  }, [center, zoom, map, onMapClick]);

  // Update markers
  useEffect(() => {
    if (!map) return;

    // Clear existing markers
    markersMap.forEach((marker) => marker.setMap(null));
    const newMarkersMap = new Map<string, google.maps.Marker>();

    // Add new markers
    markers.forEach((markerData, index) => {
      const marker = new google.maps.Marker({
        position: markerData.position,
        map,
        title: markerData.title,
        label: markerData.label || String(index + 1),
        animation: google.maps.Animation.DROP,
      });

      newMarkersMap.set(`marker-${index}`, marker);
    });

    setMarkersMap(newMarkersMap);
  }, [map, markers]);

  // Update polyline
  useEffect(() => {
    if (!map || !polyline) return;

    // Clear existing polyline
    if (polylineInstance) {
      polylineInstance.setMap(null);
    }

    // Create new polyline
    const polylinePath = new google.maps.Polyline({
      path: polyline.path,
      map,
      geodesic: true,
      strokeColor: '#3B82F6',
      strokeOpacity: 1.0,
      strokeWeight: 3,
      ...polyline.options,
    });

    setPolylineInstance(polylinePath);
  }, [map, polyline]);

  // Fit bounds to markers
  useEffect(() => {
    if (!map || markers.length === 0) return;

    const bounds = new google.maps.LatLngBounds();
    markers.forEach((marker) => {
      bounds.extend(marker.position);
    });

    // Only fit if we have markers and they're not all at the same location
    if (markers.length > 1) {
      map.fitBounds(bounds, { padding: 50 });
    } else {
      map.setCenter(markers[0].position);
    }
  }, [map, markers]);

  return <div ref={mapRef} className={className} style={{ height: '100%', width: '100%' }} />;
}

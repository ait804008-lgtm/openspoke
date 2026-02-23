'use client';

import { useEffect, useRef, useState } from 'react';

// @ts-ignore
import { Loader } from '@googlemaps/js-api-loader';

declare global {
  interface Window {
    google: any;
  }
}

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
    options?: any;
  };
  onMapClick?: (event: any) => void;
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
  const [map, setMap] = useState<any>(null);
  const [markersMap, setMarkersMap] = useState<Map<string, any>>(new Map());
  const [polylineInstance, setPolylineInstance] = useState<any>(null);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      console.warn('Google Maps API key not found');
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,geometry&v=weekly`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      if (mapRef.current && !map && window.google) {
        const mapInstance = new window.google.maps.Map(mapRef.current, {
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
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup script
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [center, zoom, map, onMapClick]);

  // Update markers
  useEffect(() => {
    if (!map || !window.google) return;

    // Clear existing markers
    markersMap.forEach((marker) => marker.setMap(null));
    const newMarkersMap = new Map<string, any>();

    // Add new markers
    markers.forEach((markerData, index) => {
      const marker = new window.google.maps.Marker({
        position: markerData.position,
        map,
        title: markerData.title,
        label: markerData.label || String(index + 1),
        animation: window.google.maps.Animation.DROP,
      });

      newMarkersMap.set(`marker-${index}`, marker);
    });

    setMarkersMap(newMarkersMap);
  }, [map, markers]);

  // Update polyline
  useEffect(() => {
    if (!map || !polyline || !window.google) return;

    // Clear existing polyline
    if (polylineInstance) {
      polylineInstance.setMap(null);
    }

    // Create new polyline
    const polylinePath = new window.google.maps.Polyline({
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
    if (!map || markers.length === 0 || !window.google) return;

    const bounds = new window.google.maps.LatLngBounds();
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

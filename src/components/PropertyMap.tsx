
import React, { useCallback, useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { Property } from '@/data/properties';
import { Link } from 'react-router-dom';

interface PropertyMapProps {
  properties: Property[];
  center?: { lat: number, lng: number };
  zoom?: number;
}

// Default center on Martil, Morocco
const defaultCenter = {
  lat: 35.6180, 
  lng: -5.2774
};

const containerStyle = {
  width: '100%',
  height: '500px'
};

const PropertyMap: React.FC<PropertyMapProps> = ({ 
  properties, 
  center = defaultCenter, 
  zoom = 12 
}) => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  // Mock coordinates for demo purposes as our data doesn't have real coords
  const getPropertyCoordinates = useCallback((property: Property, index: number) => {
    // Generate mock coordinates around the center point
    // In a real app, these would come from your database
    const latVariation = (index % 5) * 0.008;
    const lngVariation = (index % 4) * 0.01;
    
    return {
      lat: center.lat + latVariation,
      lng: center.lng + lngVariation
    };
  }, [center]);

  // Options for the map
  const mapOptions = {
    disableDefaultUI: false,
    clickableIcons: false,
    scrollwheel: true,
    styles: [
      {
        featureType: 'poi',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }]
      }
    ]
  };

  return (
    <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
        options={mapOptions}
      >
        {properties.map((property, index) => (
          <Marker
            key={property.id}
            position={getPropertyCoordinates(property, index)}
            onClick={() => setSelectedProperty(property)}
          />
        ))}

        {selectedProperty && (
          <InfoWindow
            position={getPropertyCoordinates(selectedProperty, properties.findIndex(p => p.id === selectedProperty.id))}
            onCloseClick={() => setSelectedProperty(null)}
          >
            <div className="p-2 max-w-xs">
              <h3 className="font-medium text-sm">{selectedProperty.title}</h3>
              <p className="text-xs text-gray-500">${selectedProperty.price}/{selectedProperty.priceUnit}</p>
              <div className="mt-1">
                <Link 
                  to={`/property/${selectedProperty.id}`}
                  className="text-xs text-moroccan-blue hover:underline"
                >
                  View details
                </Link>
              </div>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default PropertyMap;

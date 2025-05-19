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
  height: '550px',
  borderRadius: '12px'
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
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#f5f5f5"
          }
        ]
      },
      {
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#616161"
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#f5f5f5"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#bdbdbd"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#eeeeee"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#e5e5e5"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#ffffff"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dadada"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#616161"
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#e5e5e5"
          }
        ]
      },
      {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#eeeeee"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#c9d6df"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
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
            icon={{
              url: `data:image/svg+xml,${encodeURIComponent(
                `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="36" viewBox="0 0 24 36">
                  <path d="M12 0C7.31 0 3.5 3.81 3.5 8.5c0 5.79 6.45 11.93 7.57 13.05a1.49 1.49 0 002.01.04C14.04 20.44 20.5 14.27 20.5 8.5 20.5 3.81 16.69 0 12 0zm0 11a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" 
                  fill="${property.featured ? '#E9B44C' : '#0D5C93'}" stroke="#FFFFFF" stroke-width="2"/>
                </svg>`
              )}`,
              scaledSize: new window.google.maps.Size(32, 48),
              anchor: new window.google.maps.Point(16, 48),
            }}
            animation={window.google.maps.Animation.DROP}
          />
        ))}

        {selectedProperty && (
          <InfoWindow
            position={getPropertyCoordinates(selectedProperty, properties.findIndex(p => p.id === selectedProperty.id))}
            onCloseClick={() => setSelectedProperty(null)}
          >
            <div className="p-2 max-w-xs">
              <div className="mb-2 overflow-hidden rounded-lg">
                <img 
                  src={selectedProperty.images[0]} 
                  alt={selectedProperty.title}
                  className="w-full h-24 object-cover"
                />
              </div>
              <h3 className="font-medium text-sm">{selectedProperty.title}</h3>
              <p className="text-xs text-gray-500">${selectedProperty.price}/{selectedProperty.priceUnit}</p>
              <div className="mt-2">
                <Link 
                  to={`/property/${selectedProperty.id}`}
                  className="text-xs text-moroccan-blue font-medium hover:underline"
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

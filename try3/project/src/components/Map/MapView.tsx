import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Attraction } from '../../types';
import { Link } from 'react-router-dom';

interface MapViewProps {
  attractions: Attraction[];
  center?: [number, number];
  zoom?: number;
  height?: string;
}

const MapView: React.FC<MapViewProps> = ({ 
  attractions, 
  center = [20, 0], 
  zoom = 2,
  height = '600px'
}) => {
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    setMapReady(true);
  }, []);

  const customIcon = new Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    shadowSize: [41, 41]
  });

  if (!mapReady) {
    return <div style={{ height }} className="bg-gray-100 flex items-center justify-center">Loading map...</div>;
  }

  return (
    <div style={{ height }} className="rounded-lg overflow-hidden shadow-md">
      <MapContainer 
        center={center} 
        zoom={zoom} 
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {[...attractions,
          { id: 31, name: 'Great Wall of China', location: { lat: 40.4319, lng: 116.5704 }, city: 'Beijing', country: 'China', image: 'greatwall.jpg' },
          { id: 32, name: 'Machu Picchu', location: { lat: -13.1631, lng: -72.5450 }, city: 'Cusco Region', country: 'Peru', image: 'machupicchu.jpg' },
          { id: 33, name: 'Petra', location: { lat: 30.3285, lng: 35.4444 }, city: 'Ma\'an', country: 'Jordan', image: 'petra.jpg' },
          { id: 34, name: 'Colosseum', location: { lat: 41.8902, lng: 12.4922 }, city: 'Rome', country: 'Italy', image: 'colosseum.jpg' },
          { id: 35, name: 'Taj Mahal', location: { lat: 27.1751, lng: 78.0421 }, city: 'Agra', country: 'India', image: 'tajmahal.jpg' },
          { id: 36, name: 'Christ the Redeemer', location: { lat: -22.9519, lng: -43.2105 }, city: 'Rio de Janeiro', country: 'Brazil', image: 'christ.jpg' },
          { id: 37, name: 'Chichén Itzá', location: { lat: 20.6843, lng: -88.5678 }, city: 'Yucatán', country: 'Mexico', image: 'chichenitza.jpg' },
          { id: 38, name: 'Pyramids of Giza', location: { lat: 29.9792, lng: 31.1342 }, city: 'Giza', country: 'Egypt', image: 'giza.jpg' },
          { id: 39, name: 'Eiffel Tower', location: { lat: 48.8584, lng: 2.2945 }, city: 'Paris', country: 'France', image: 'eiffel.jpg' },
          { id: 40, name: 'Statue of Liberty', location: { lat: 40.6892, lng: -74.0445 }, city: 'New York', country: 'USA', image: 'statueofliberty.jpg' },
          { id: 41, name: 'Grand Canyon', location: { lat: 36.1069, lng: -112.1129 }, city: 'Arizona', country: 'USA', image: 'grandcanyon.jpg' },
          { id: 42, name: 'Great Barrier Reef', location: { lat: -18.2871, lng: 147.6992 }, city: 'Queensland', country: 'Australia', image: 'greatbarrier.jpg' },
          { id: 43, name: 'Northern Lights', location: { lat: 69.6496, lng: 18.9560 }, city: 'Tromsø', country: 'Norway', image: 'northernlights.jpg' },
          { id: 44, name: 'Victoria Falls', location: { lat: -17.9243, lng: 25.8572 }, city: 'Livingstone', country: 'Zambia', image: 'victoriafalls.jpg' },
          { id: 45, name: 'Mount Everest', location: { lat: 27.9881, lng: 86.9250 }, city: 'Himalayas', country: 'Nepal', image: 'everest.jpg' },
        ].map((attraction) => (
          <Marker 
            key={attraction.id}
            position={[attraction.location.lat, attraction.location.lng]}
            icon={customIcon}
          >
            <Popup>
              <div className="text-center">
                <h3 className="font-semibold text-lg">{attraction.name}</h3>
                { 'city' in attraction.location && 'country' in attraction.location && (
                  <p className="text-sm text-gray-600 mb-2">{attraction.location.city}, {attraction.location.country}</p>
                )}
                <img 
                  src={attraction.image} 
                  alt={attraction.name}
                  className="w-full h-24 object-cover rounded mb-2"
                />
                <Link 
                  to={`/attraction/${attraction.id}`}
                  className="bg-teal-600 text-white text-sm py-1 px-3 rounded hover:bg-teal-700 inline-block"
                >
                  View Details
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;



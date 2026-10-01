import React, { useEffect } from 'react';
import { Map, Marker, useMap } from '@vis.gl/react-google-maps';
import { useSelector } from 'react-redux';

const MapEffect = ({ selectedPlace }) => {
  const map = useMap();
  
  useEffect(() => {
    if (map && selectedPlace?.location) {
      map.setCenter(selectedPlace.location);
      map.setZoom(15);
    }
  }, [map, selectedPlace]);

  return null;
};

const MapComponent = () => {
  const selectedPlace = useSelector((state) => state.places.selectedPlace);

  const defaultCenter = { lat: 39.8283, lng: -98.5795 };

  return (
    <div className="w-full h-full min-h-[400px] rounded-lg overflow-hidden shadow-lg border border-gray-200">
      <Map
        defaultZoom={4}
        defaultCenter={defaultCenter}
        disableDefaultUI={false}
        mapId="DEMO_MAP_ID"
      >
        <MapEffect selectedPlace={selectedPlace} />
        {selectedPlace && (
          <Marker position={selectedPlace.location} />
        )}
      </Map>
    </div>
  );
};

export default MapComponent;

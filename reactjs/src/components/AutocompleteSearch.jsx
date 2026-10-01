import React, { useEffect, useRef, useState } from 'react';
import { useMapsLibrary } from '@vis.gl/react-google-maps';
import { useDispatch } from 'react-redux';
import { saveSearch } from '../store/placesSlice';

const AutocompleteSearch = () => {
  const autocompleteRef = useRef(null);
  const places = useMapsLibrary('places');
  const dispatch = useDispatch();

  useEffect(() => {
    if (!places || !autocompleteRef.current) return;

    const autocompleteElement = autocompleteRef.current;

    const handlePlaceSelect = async (event) => {
      const place = event.place;
      
      if (!place) return;

      if (!place.location) {
        try {
          await place.fetchFields({
            fields: ['displayName', 'formattedAddress', 'id', 'location']
          });
        } catch (e) {
          alert("Failed to fetch place details: " + e.message);
          return;
        }
      }

      if (!place.location) {
         alert("Place has no location coordinates.");
         return;
      }

      let extractedName = 'Unknown Place';
      if (place.displayName) {
        extractedName = typeof place.displayName === 'string' ? place.displayName : place.displayName.text;
      } else if (place.name) {
        extractedName = place.name;
      }

      const placeData = {
        name: extractedName,
        address: place.formattedAddress || '',
        placeId: place.id || String(Math.random()),
        location: {
          lat: typeof place.location.lat === 'function' ? place.location.lat() : place.location.lat,
          lng: typeof place.location.lng === 'function' ? place.location.lng() : place.location.lng
        }
      };

      dispatch(saveSearch(placeData));
      
      autocompleteElement.inputValue = '';
    };

    autocompleteElement.addEventListener('gmp-placeselect', handlePlaceSelect);

    return () => {
      autocompleteElement.removeEventListener('gmp-placeselect', handlePlaceSelect);
    };
  }, [places, dispatch]);

  return (
    <div className="w-full relative">
      <gmp-place-autocomplete ref={autocompleteRef}></gmp-place-autocomplete>
    </div>
  );
};

export default AutocompleteSearch;

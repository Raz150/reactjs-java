import React from 'react';
import { APIProvider } from '@vis.gl/react-google-maps';
import AutocompleteSearch from './components/AutocompleteSearch';
import MapComponent from './components/MapComponent';
import RecentSearches from './components/RecentSearches';

// Replace with your actual Google Maps API Key
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

function App() {
  return (
    <APIProvider apiKey={GOOGLE_MAPS_API_KEY} libraries={['places']}>
      <div className="min-h-screen bg-gray-100 p-4 md:p-8">
        <div className="max-w-6xl mx-auto space-y-6">
          <header className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Place Explorer</h1>
            <p className="text-gray-600">Search for any location and see it on the map.</p>
          </header>

          <div className="flex flex-col md:flex-row gap-6 h-[calc(100vh-200px)] min-h-[600px]">
            {/* Sidebar for Search and History */}
            <div className="w-full md:w-1/3 flex flex-col gap-6 h-full">
              <div className="z-10">
                <AutocompleteSearch />
              </div>
              <div className="flex-1 overflow-hidden flex flex-col">
                <RecentSearches />
              </div>
            </div>

            {/* Map Area */}
            <div className="w-full md:w-2/3 h-full">
              <MapComponent />
            </div>
          </div>
        </div>
      </div>
    </APIProvider>
  );
}

export default App;

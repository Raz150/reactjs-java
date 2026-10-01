import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedPlace, markAsFavorite } from '../store/placesSlice';

const RecentSearches = () => {
  const recentSearches = useSelector((state) => state.places.recentSearches);
  const selectedPlace = useSelector((state) => state.places.selectedPlace);
  const dispatch = useDispatch();

  if (recentSearches.length === 0) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <p className="text-gray-500 text-sm text-center">No recent searches yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
        <h3 className="text-sm font-semibold text-gray-700">Recent Searches</h3>
      </div>
      <ul className="divide-y divide-gray-200 max-h-[400px] overflow-y-auto">
        {recentSearches.map((place) => (
          <li 
            key={place.placeId} 
            className={`p-4 hover:bg-gray-50 transition-colors flex justify-between items-center ${selectedPlace?.placeId === place.placeId ? 'bg-blue-50' : ''}`}
          >
            <div 
              className="flex-1 cursor-pointer"
              onClick={() => dispatch(setSelectedPlace(place))}
            >
              <p className="text-sm font-medium text-gray-900">{place.name}</p>
              <p className="text-xs text-gray-500 truncate">{place.address}</p>
            </div>
            <button
              onClick={() => dispatch(markAsFavorite(place.placeId))}
              className={`ml-4 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${place.isFavorite ? 'text-yellow-500 hover:text-yellow-600 bg-yellow-50' : 'text-gray-400 hover:text-gray-500 hover:bg-gray-100'}`}
              title={place.isFavorite ? "Unmark favorite" : "Mark as favorite"}
            >
              <svg className="w-5 h-5" fill={place.isFavorite ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
              </svg>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentSearches;

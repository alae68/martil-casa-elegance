
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState('Martil, Morocco');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real application, you would use these values to filter properties
    // For now, we'll just navigate to the home page
    navigate('/', { 
      state: { 
        searchParams: {
          location,
          checkIn,
          checkOut,
          guests
        }
      }
    });
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-1">
      <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-2">
        <div className="p-3 border-b md:border-b-0 md:border-r border-gray-200">
          <label className="block text-xs font-medium text-gray-500 mb-1">Location</label>
          <input
            type="text"
            className="w-full text-gray-900 focus:outline-none"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        
        <div className="p-3 border-b md:border-b-0 md:border-r border-gray-200">
          <label className="block text-xs font-medium text-gray-500 mb-1">Check-in Date</label>
          <input
            type="date"
            className="w-full text-gray-900 focus:outline-none"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
          />
        </div>
        
        <div className="p-3 border-b md:border-b-0 md:border-r border-gray-200">
          <label className="block text-xs font-medium text-gray-500 mb-1">Check-out Date</label>
          <input
            type="date"
            className="w-full text-gray-900 focus:outline-none"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            min={checkIn}
          />
        </div>
        
        <div className="flex items-center space-x-2 p-2">
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-500 mb-1">Guests</label>
            <select
              className="w-full text-gray-900 focus:outline-none bg-white"
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
            >
              {[...Array(10)].map((_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1} Guest{i !== 0 ? 's' : ''}
                </option>
              ))}
            </select>
          </div>
          
          <button
            type="submit"
            className="btn-primary h-full flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            <span>Search</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { Search, MapPin, Calendar, Users } from 'lucide-react';

const SearchBar = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState('Martil, Morocco');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    if (!location) {
      toast({
        title: "Location required",
        description: "Please enter a location to search.",
        variant: "destructive",
      });
      return;
    }
    
    if (checkIn && checkOut) {
      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);
      
      if (checkInDate >= checkOutDate) {
        toast({
          title: "Invalid dates",
          description: "Check-out date must be after check-in date.",
          variant: "destructive",
        });
        return;
      }
    }
    
    // Navigate with search params
    const searchParams = new URLSearchParams();
    if (location) searchParams.set('location', location);
    if (checkIn) searchParams.set('checkIn', checkIn);
    if (checkOut) searchParams.set('checkOut', checkOut);
    searchParams.set('guests', guests.toString());
    
    toast({
      title: "Search started",
      description: `Searching for properties in ${location}`,
    });
    
    // Navigate to properties page with search params
    navigate(`/properties?${searchParams.toString()}`);
  };
  
  return (
    <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-elevated p-1.5">
      <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-2">
        <div className="p-3 border-b md:border-b-0 md:border-r border-gray-200">
          <label className="flex items-center text-xs font-medium text-gray-500 mb-1">
            <MapPin className="w-3.5 h-3.5 mr-1 text-moroccan-blue" />
            Location
          </label>
          <input
            type="text"
            className="w-full text-gray-900 focus:outline-none"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        
        <div className="p-3 border-b md:border-b-0 md:border-r border-gray-200">
          <label className="flex items-center text-xs font-medium text-gray-500 mb-1">
            <Calendar className="w-3.5 h-3.5 mr-1 text-moroccan-blue" />
            Check-in Date
          </label>
          <input
            type="date"
            className="w-full text-gray-900 focus:outline-none"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            min={new Date().toISOString().split('T')[0]} // Today's date as minimum
          />
        </div>
        
        <div className="p-3 border-b md:border-b-0 md:border-r border-gray-200">
          <label className="flex items-center text-xs font-medium text-gray-500 mb-1">
            <Calendar className="w-3.5 h-3.5 mr-1 text-moroccan-blue" />
            Check-out Date
          </label>
          <input
            type="date"
            className="w-full text-gray-900 focus:outline-none"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            min={checkIn || new Date().toISOString().split('T')[0]}
          />
        </div>
        
        <div className="flex items-center space-x-3 p-3">
          <div className="flex-1">
            <label className="flex items-center text-xs font-medium text-gray-500 mb-1">
              <Users className="w-3.5 h-3.5 mr-1 text-moroccan-blue" />
              Guests
            </label>
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
            className="h-full flex items-center space-x-2 bg-moroccan-blue hover:bg-moroccan-blue/90 text-white px-5 py-3 rounded-lg transition duration-300 shadow-button"
          >
            <Search className="w-4 h-4" />
            <span>Search</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;

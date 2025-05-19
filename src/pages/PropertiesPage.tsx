
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useProperties } from '@/contexts/PropertiesContext';
import { Property } from '@/data/properties';
import PropertyCard from '@/components/PropertyCard';

const PropertiesPage = () => {
  const { properties } = useProperties();
  const [searchParams] = useSearchParams();
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);

  // Get search params
  const location = searchParams.get('location');
  const checkIn = searchParams.get('checkIn');
  const checkOut = searchParams.get('checkOut');
  const guestsParam = searchParams.get('guests');
  const guests = guestsParam ? parseInt(guestsParam, 10) : undefined;

  useEffect(() => {
    // Filter properties based on search params
    let filtered = [...properties];

    if (location) {
      filtered = filtered.filter(property => 
        property.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    if (guests) {
      filtered = filtered.filter(property => property.maxGuests >= guests);
    }

    // Note: In a real application, you would filter by dates as well
    // This is simplified for the demo

    setFilteredProperties(filtered);
  }, [properties, location, checkIn, checkOut, guests]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-gray-50 py-12">
        <div className="container-custom">
          {/* Search summary */}
          <div className="mb-8">
            <h1 className="text-3xl font-medium mb-2">Properties in {location || 'Martil'}</h1>
            <p className="text-gray-600">
              {filteredProperties.length} properties found
              {guests ? ` for ${guests} guests` : ''}
              {checkIn && checkOut ? ` from ${new Date(checkIn).toLocaleDateString()} to ${new Date(checkOut).toLocaleDateString()}` : ''}
            </p>
          </div>
          
          {/* Filter options - could be expanded in the future */}
          <div className="bg-white p-4 rounded-md shadow-sm mb-6">
            <h2 className="text-lg font-medium mb-2">Filters</h2>
            <div className="flex flex-wrap gap-2">
              <button className="px-3 py-1 bg-gray-100 rounded-full text-sm">Price</button>
              <button className="px-3 py-1 bg-gray-100 rounded-full text-sm">Type</button>
              <button className="px-3 py-1 bg-gray-100 rounded-full text-sm">Amenities</button>
            </div>
          </div>
          
          {/* Results */}
          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl font-medium mb-2">No properties found</h2>
              <p className="text-gray-600">
                Try adjusting your search parameters to find more options.
              </p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PropertiesPage;

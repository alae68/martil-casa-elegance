
import React, { useState } from 'react';
import { useProperties } from '@/contexts/PropertiesContext';
import PropertyCard from '@/components/PropertyCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchBar from '@/components/SearchBar';
import { Search } from 'lucide-react';

const PropertiesPage = () => {
  const { properties } = useProperties();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 10000,
    bedrooms: 0,
    featured: false
  });
  
  // Filter properties based on search and filters
  const filteredProperties = properties.filter(property => {
    // Search term filter
    const matchesSearch = 
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Price filter
    const matchesPrice = 
      property.price >= filters.minPrice &&
      property.price <= filters.maxPrice;
    
    // Bedrooms filter
    const matchesBedrooms = 
      filters.bedrooms === 0 || property.bedrooms >= filters.bedrooms;
    
    // Featured filter
    const matchesFeatured = 
      !filters.featured || property.featured;
    
    return matchesSearch && matchesPrice && matchesBedrooms && matchesFeatured;
  });
  
  // Handle filter changes
  const handleFilterChange = (name: string, value: number | boolean) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };
  
  return (
    <>
      <Header />
      
      <main className="min-h-screen pt-24 pb-16">
        <div className="container-custom">
          <h1 className="text-3xl font-bold mb-2">All Properties</h1>
          <p className="text-gray-600 mb-8">
            Discover our complete collection of beautiful properties in Martil
          </p>
          
          {/* Search and Filters */}
          <div className="bg-white rounded-lg shadow p-4 mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search properties..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Min Price ($)
                </label>
                <input
                  type="range"
                  min="0"
                  max="5000"
                  step="100"
                  value={filters.minPrice}
                  onChange={(e) => handleFilterChange('minPrice', Number(e.target.value))}
                  className="w-full"
                />
                <div className="text-sm text-gray-600">${filters.minPrice}</div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Max Price ($)
                </label>
                <input
                  type="range"
                  min="1000"
                  max="10000"
                  step="100"
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', Number(e.target.value))}
                  className="w-full"
                />
                <div className="text-sm text-gray-600">${filters.maxPrice}</div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Min Bedrooms
                </label>
                <select
                  value={filters.bedrooms}
                  onChange={(e) => handleFilterChange('bedrooms', Number(e.target.value))}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  <option value="0">Any</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                  <option value="5">5+</option>
                </select>
              </div>
              
              <div className="flex items-end">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.featured}
                    onChange={(e) => handleFilterChange('featured', e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm font-medium text-gray-700">Featured Only</span>
                </label>
              </div>
            </div>
          </div>
          
          {/* Results */}
          <div className="mb-4">
            <span className="text-gray-600">{filteredProperties.length} properties found</span>
          </div>
          
          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900">No properties found</h3>
              <p className="mt-1 text-gray-500">
                Try adjusting your search or filters to find properties.
              </p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default PropertiesPage;

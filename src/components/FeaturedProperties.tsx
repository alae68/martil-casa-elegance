
import React from 'react';
import PropertyCard from './PropertyCard';
import { Property } from '@/data/properties';

interface FeaturedPropertiesProps {
  properties: Property[];
}

const FeaturedProperties: React.FC<FeaturedPropertiesProps> = ({ properties }) => {
  const featuredProperties = properties.filter(property => property.featured);
  
  return (
    <section className="py-16 bg-moroccan-white">
      <div className="container-custom">
        <h2 className="section-title text-center mx-auto">Featured Properties</h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          Discover our handpicked selection of the most stunning properties in Martil, each offering a unique experience of luxury and comfort.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProperties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="btn-outline">
            View All Properties
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;

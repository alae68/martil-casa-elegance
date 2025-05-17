
import React from 'react';
import SearchBar from './SearchBar';

const Hero: React.FC = () => {
  return (
    <div className="relative h-[600px] flex items-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1483058712412-4245e9b90334?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" 
          alt="Martil Beach" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        
        {/* Moroccan Pattern Overlay */}
        <div className="absolute inset-0 moroccan-pattern"></div>
      </div>
      
      {/* Hero Content */}
      <div className="container-custom relative z-10 text-white">
        <div className="max-w-2xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-medium mb-4 leading-tight">
            Discover Your Perfect <span className="text-moroccan-gold">Coastal Retreat</span> in Martil
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-8">
            Luxury villas, traditional riads, and modern apartments with stunning Mediterranean views
          </p>
          
          {/* Search Bar */}
          <SearchBar />
          
          {/* Quick Stats */}
          <div className="mt-12 grid grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-serif font-medium text-moroccan-gold mb-1">25+</div>
              <div className="text-sm opacity-80">Luxury Properties</div>
            </div>
            <div>
              <div className="text-3xl font-serif font-medium text-moroccan-gold mb-1">4.9</div>
              <div className="text-sm opacity-80">Average Rating</div>
            </div>
            <div>
              <div className="text-3xl font-serif font-medium text-moroccan-gold mb-1">1000+</div>
              <div className="text-sm opacity-80">Happy Guests</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

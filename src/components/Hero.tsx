
import React from 'react';
import SearchBar from './SearchBar';

const Hero: React.FC = () => {
  return (
    <div className="relative h-[650px] flex items-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1601991105025-f56e6f3a5d4f?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" 
          alt="Martil Beach" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
        
        {/* Enhanced Moroccan Pattern Overlay */}
        <div className="absolute inset-0 moroccan-pattern opacity-20"></div>
      </div>
      
      {/* Hero Content */}
      <div className="container-custom relative z-10 text-white">
        <div className="max-w-2xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-medium mb-6 leading-tight animate-fade-up">
            Experience <span className="text-moroccan-gold">Authentic Morocco</span> on the Mediterranean Coast
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-10 animate-fade-up animate-delay-100">
            Discover handpicked luxury properties in Martil with breathtaking sea views and world-class amenities
          </p>
          
          {/* Enhanced Search Bar Container with updated styling */}
          <div className="bg-white/10 backdrop-blur-md p-5 rounded-xl border border-white/20 shadow-xl animate-fade-up animate-delay-200">
            <SearchBar />
          </div>
          
          {/* Enhanced Quick Stats with updated styling */}
          <div className="mt-16 grid grid-cols-3 gap-8 text-center animate-fade-up animate-delay-300">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg py-5 px-3 border border-white/10 shadow-lg transform transition-all duration-300 hover:scale-105 hover:bg-white/15">
              <div className="text-3xl font-serif font-medium text-moroccan-gold mb-1">25+</div>
              <div className="text-sm opacity-80">Luxury Properties</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg py-5 px-3 border border-white/10 shadow-lg transform transition-all duration-300 hover:scale-105 hover:bg-white/15">
              <div className="text-3xl font-serif font-medium text-moroccan-gold mb-1">4.9</div>
              <div className="text-sm opacity-80">Average Rating</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg py-5 px-3 border border-white/10 shadow-lg transform transition-all duration-300 hover:scale-105 hover:bg-white/15">
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

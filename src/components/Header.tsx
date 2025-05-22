import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { List, X } from "lucide-react";
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setIsScrolled(scrollTop > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const navigationLinks = [{
    name: "Home",
    path: "/"
  }, {
    name: "Properties",
    path: "/properties"
  }, {
    name: "About",
    path: "/about"
  }, {
    name: "Contact",
    path: "/contact"
  }];
  return <header className={`${isScrolled ? "bg-white shadow-sm" : "bg-transparent"} sticky top-0 z-50 transition-all duration-300`}>
      <div className="container-custom mx-auto px-4 bg-blue-100">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="relative size-10 bg-gradient-to-br from-sky-400 to-blue-600 rounded-full shadow-lg flex items-center justify-center">
              {/* Beach umbrella icon */}
              <div className="absolute top-1 left-1/2 -translate-x-1/2 w-5 h-4 bg-red-500 rounded-t-full"></div>
              <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-0.5 h-4 bg-white"></div>
              {/* Sun icon */}
              <div className="absolute top-1 right-1 w-3 h-3 bg-yellow-400 rounded-full"></div>
              {/* Wave lines */}
              <div className="absolute bottom-1.5 w-6 h-2 flex flex-col justify-between">
                <div className="h-0.5 bg-white rounded opacity-80"></div>
                <div className="h-0.5 bg-white rounded"></div>
              </div>
            </div>
            <div className="font-serif">
              <span className="text-sky-900 text-xl font-medium">Martil</span>
              <span className="text-moroccan-gold text-xl font-medium">Haven</span>
              <span className="block text-[10px] text-gray-500 -mt-1">BEACH PROPERTIES</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationLinks.map(link => <NavLink key={link.path} to={link.path} className={({
            isActive
          }) => `text-sm font-medium transition-colors hover:text-moroccan-blue ${isActive ? "text-moroccan-blue" : "text-gray-700"}`}>
                {link.name}
              </NavLink>)}
            <Link to="/owner-dashboard" className="bg-moroccan-gold hover:bg-moroccan-gold/90 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-colors">
              List Your Property
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden flex items-center p-2" aria-expanded={isMobileMenuOpen}>
            {isMobileMenuOpen ? <X className="h-6 w-6 text-gray-700" /> : <List className="h-6 w-6 text-gray-700" />}
            <span className="sr-only">
              {isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            </span>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && <nav className="lg:hidden py-4 border-t">
            <ul className="flex flex-col space-y-4">
              {navigationLinks.map(link => <li key={link.path}>
                  <NavLink to={link.path} className={({
              isActive
            }) => `block text-base transition-colors hover:text-moroccan-blue ${isActive ? "text-moroccan-blue" : "text-gray-700"}`} onClick={() => setIsMobileMenuOpen(false)}>
                    {link.name}
                  </NavLink>
                </li>)}
              <li>
                <Link to="/owner-dashboard" className="block text-moroccan-gold font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                  List Your Property
                </Link>
              </li>
            </ul>
          </nav>}
      </div>
    </header>;
};
export default Header;
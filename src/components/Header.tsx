import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, LogIn, LogOut, Anchor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check login status on component mount and when localStorage changes
    const checkLoginStatus = () => {
      const loginStatus = localStorage.getItem('isLoggedIn') === 'true';
      const role = localStorage.getItem('userRole');
      
      setIsLoggedIn(loginStatus);
      setUserRole(role);
    };
    
    checkLoginStatus();
    
    // Listen for storage events (in case user logs in/out in another tab)
    window.addEventListener('storage', checkLoginStatus);
    
    // Add scroll event listener
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('storage', checkLoginStatus);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    setIsLoggedIn(false);
    setUserRole(null);
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate('/');
  };

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-md' 
          : 'bg-transparent'
      }`}
    >
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Enhanced Logo */}
          <Link to="/" className="flex items-center space-x-3 z-20 group">
            <div className={`relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 ${
              isScrolled ? 'bg-moroccan-blue' : 'bg-moroccan-blue/90'
            } p-2.5 transform group-hover:scale-105`}>
              <Anchor className="h-5 w-5 text-white" />
              <div className="absolute inset-0 bg-gradient-to-tr from-moroccan-gold/30 to-transparent opacity-50"></div>
            </div>
            <div className="font-serif">
              <span className={`text-2xl font-medium transition-colors duration-300 ${
                isScrolled ? 'text-moroccan-blue' : 'text-white'
              }`}>Martil</span>
              <span className="text-2xl font-medium text-moroccan-gold">Haven</span>
              <div className={`h-0.5 w-0 group-hover:w-full transition-all duration-300 ${
                isScrolled ? 'bg-moroccan-blue' : 'bg-white'
              }`}></div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link 
              to="/" 
              className={`nav-link ${
                isScrolled ? 'text-gray-700' : 'text-white'
              } hover:text-moroccan-gold transition duration-200`}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className={`nav-link ${
                isScrolled ? 'text-gray-700' : 'text-white'
              } hover:text-moroccan-gold transition duration-200`}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className={`nav-link ${
                isScrolled ? 'text-gray-700' : 'text-white'
              } hover:text-moroccan-gold transition duration-200`}
            >
              Contact
            </Link>
            {userRole === 'admin' && (
              <Link 
                to="/admin" 
                className={`nav-link ${
                  isScrolled ? 'text-gray-700' : 'text-white'
                } hover:text-moroccan-gold transition duration-200`}
              >
                Admin
              </Link>
            )}
          </nav>

          {/* Auth Button (Desktop) */}
          <div className="hidden md:block">
            {isLoggedIn ? (
              <Button 
                variant={isScrolled ? "outline" : "secondary"}
                onClick={handleLogout}
                className="flex items-center space-x-2 shadow-button transition-all duration-300 hover:scale-105"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            ) : (
              <Button 
                variant={isScrolled ? "outline" : "secondary"}
                onClick={() => navigate('/login')}
                className="flex items-center space-x-2 shadow-button transition-all duration-300 hover:scale-105"
              >
                <LogIn className="h-4 w-4" />
                <span>Login</span>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button 
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              className={`${isScrolled ? 'text-gray-700' : 'text-white'} hover:bg-white/10`}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-6 border-t mt-4 animate-fade-in bg-white/95 backdrop-blur-md absolute left-0 right-0 top-full shadow-md">
            <div className="container-custom">
              <div className="flex flex-col space-y-5">
                <Link 
                  to="/" 
                  className="text-gray-700 hover:text-moroccan-blue font-medium transition duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  to="/about" 
                  className="text-gray-700 hover:text-moroccan-blue font-medium transition duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
                <Link 
                  to="/contact" 
                  className="text-gray-700 hover:text-moroccan-blue font-medium transition duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
                {userRole === 'admin' && (
                  <Link 
                    to="/admin" 
                    className="text-gray-700 hover:text-moroccan-blue font-medium transition duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Admin
                  </Link>
                )}
                
                {/* Auth Link (Mobile) */}
                {isLoggedIn ? (
                  <button 
                    className="text-left text-moroccan-blue font-medium hover:text-moroccan-blue/80 transition duration-200 flex items-center"
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </button>
                ) : (
                  <Link 
                    to="/login" 
                    className="text-moroccan-blue font-medium hover:text-moroccan-blue/80 transition duration-200 flex items-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <LogIn className="h-4 w-4 mr-2" />
                    Login
                  </Link>
                )}
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;

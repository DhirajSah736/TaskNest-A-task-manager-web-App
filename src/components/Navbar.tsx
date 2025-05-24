import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Clipboard, User, Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="bg-background-light border-b border-secondary shadow-md">
      <div className="container-custom mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-primary hover:text-primary-hover transition-colors"
          >
            <Clipboard size={28} />
            <span className="text-xl font-bold tracking-wide">TaskNest</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {user && (
              <>
                <Link 
                  to="/" 
                  className="text-text-primary hover:text-primary transition-colors px-3 py-2"
                >
                  Dashboard
                </Link>
                {/* <div className="relative group">
                  <button 
                    className="flex items-center space-x-1 text-text-primary hover:text-primary transition-colors px-3 py-2"
                  >
                    <span>{user.name}</span>
                    <User size={18} />
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-background-light border border-secondary rounded-md shadow-lg overflow-hidden z-10 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 transform origin-top-right">
                    <div className="py-1">
                      <Link 
                        to="/profile" 
                        className="block px-4 py-2 text-sm text-text-primary hover:bg-secondary hover:text-primary transition-colors"
                      >
                        Your Profile
                      </Link>
                      <button 
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-secondary hover:text-error transition-colors"
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                </div> */}

                <div className="relative inline-block group">
                  <button 
                    className="flex items-center space-x-1 text-text-primary hover:text-primary transition-colors px-3 py-2"
                  >
                    <span>{user.name}</span>
                    <User size={18} />
                  </button>
                  
                  <div className="absolute right-0 mt-2 w-48 bg-background-light border border-secondary rounded-md shadow-lg overflow-hidden z-10 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 transform origin-top-right pointer-events-none group-hover:pointer-events-auto">
                    <div className="py-1">
                      <Link 
                        to="/profile" 
                        className="block px-4 py-2 text-sm text-text-primary hover:bg-secondary hover:text-primary transition-colors"
                      >
                        Your Profile
                      </Link>
                      <button 
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-secondary hover:text-error transition-colors"
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                </div>

              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-text-primary hover:text-primary transition-colors focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background-light shadow-lg animate-fadeIn">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {user && (
              <>
                <Link 
                  to="/"
                  className="block px-3 py-2 text-text-primary hover:bg-secondary hover:text-primary rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/profile"
                  className="block px-3 py-2 text-text-primary hover:bg-secondary hover:text-primary rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <button 
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-text-primary hover:bg-secondary hover:text-error rounded-md transition-colors"
                >
                  Sign out
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
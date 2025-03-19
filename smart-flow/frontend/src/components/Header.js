import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Header({ isAuthenticated, setIsAuthenticated }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path ? 'text-emerald-500 font-semibold' : 'text-gray-600 hover:text-emerald-500';
  };

  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center space-x-2">
            <i className="fas fa-leaf text-emerald-500 text-2xl"></i>
            <span className="text-xl font-semibold text-gray-800">Smart Flow</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {isAuthenticated ? (
              <>
                <Link to="/" className={`${isActive('/')} transition-colors duration-200`}>
                  Dashboard
                </Link>
                <Link to="/schedule" className={`${isActive('/schedule')} transition-colors duration-200`}>
                  Schedule
                </Link>
                <Link to="/plants" className={`${isActive('/plants')} transition-colors duration-200`}>
                  Plant Knowledge
                </Link>
                <button
                  onClick={handleLogout}
                  className="btn-secondary"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="btn-primary">
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-600 hover:text-gray-800"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/"
                    className={`${isActive('/')} block py-2 transition-colors duration-200`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/schedule"
                    className={`${isActive('/schedule')} block py-2 transition-colors duration-200`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Schedule
                  </Link>
                  <Link
                    to="/plants"
                    className={`${isActive('/plants')} block py-2 transition-colors duration-200`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Plant Knowledge
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="btn-secondary w-full text-center"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="btn-primary w-full text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;

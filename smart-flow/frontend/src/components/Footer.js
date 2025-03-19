import React from 'react';

function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <i className="fas fa-leaf text-emerald-500 text-xl"></i>
              <span className="text-lg font-semibold text-gray-800">Smart Flow</span>
            </div>
            <p className="text-gray-600 text-sm">
              Intelligent plant care solutions for your garden. Automate your watering system with precision and ease.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gray-800 font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#features" className="text-gray-600 hover:text-emerald-500 text-sm transition-colors duration-200">
                  Features
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-600 hover:text-emerald-500 text-sm transition-colors duration-200">
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-600 hover:text-emerald-500 text-sm transition-colors duration-200">
                  Contact
                </a>
              </li>
              <li>
                <a href="#support" className="text-gray-600 hover:text-emerald-500 text-sm transition-colors duration-200">
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-gray-800 font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2 text-sm text-gray-600">
                <i className="fas fa-envelope text-emerald-500"></i>
                <span>support@smartflow.com</span>
              </li>
              <li className="flex items-center space-x-2 text-sm text-gray-600">
                <i className="fas fa-phone text-emerald-500"></i>
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2 text-sm text-gray-600">
                <i className="fas fa-map-marker-alt text-emerald-500"></i>
                <span>123 Garden Street, Green City</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-emerald-500 transition-colors duration-200">
                <i className="fab fa-facebook text-xl"></i>
              </a>
              <a href="#" className="text-gray-600 hover:text-emerald-500 transition-colors duration-200">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="#" className="text-gray-600 hover:text-emerald-500 transition-colors duration-200">
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a href="#" className="text-gray-600 hover:text-emerald-500 transition-colors duration-200">
                <i className="fab fa-linkedin text-xl"></i>
              </a>
            </div>
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} Smart Flow. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Briefcase, Menu, X } from 'lucide-react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: '/', label: 'Jobs' },
    { to: '/submit-resume', label: 'Submit Your Resume' },
    { to: '/paid-service', label: 'Paid Service for Hiring' },
    { to: '/fleet', label: 'Fleet for Companies' },
    { to: '/contact', label: 'Contact Us' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 sm:space-x-3 group">
            <img
              src="/gemini_generated_image_qiafgwqiafgwqiaf.png"
              alt="Kutch Career Logo"
              className="w-10 h-10 sm:w-12 sm:h-12 transition-transform group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-extrabold text-gray-900 group-hover:text-blue-600 transition-colors leading-tight">Kutch Career</span>
              <span className="text-[10px] sm:text-xs text-gray-500 leading-tight">Find Jobs in Kutch</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  isActive(link.to)
                    ? 'text-blue-600 bg-gradient-to-r from-blue-50 to-blue-100 shadow-sm'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <Link
              to="/post-job"
              className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 text-white text-sm font-semibold rounded-lg hover:from-blue-700 hover:via-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
            >
              Post a Job
            </Link>
          </div>

          <button
            className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <nav className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive(link.to)
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/post-job"
              onClick={() => setIsMenuOpen(false)}
              className="block w-full text-center px-5 py-2.5 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 text-white text-base font-semibold rounded-lg hover:from-blue-700 hover:via-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md"
            >
              Post a Job
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

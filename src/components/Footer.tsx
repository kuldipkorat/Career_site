import { Link } from 'react-router-dom';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { to: '/', label: 'Jobs' },
    { to: '/submit-resume', label: 'Submit Your Resume' },
    { to: '/paid-service', label: 'Paid Service for Hiring' },
    { to: '/fleet', label: 'Fleet for Companies' },
    { to: '/contact', label: 'Contact Us' },
  ];

  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="text-gray-900 font-bold text-lg mb-1">Kutch Career Platform</p>
            <p className="text-gray-600 text-sm">
              © {currentYear} Kutch Career. All rights reserved.
            </p>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-4">
            {footerLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useUser } from '../context/UserContext';
import { 
  Menu, 
  X, 
  Bell, 
  Search, 
  User, 
  ChevronDown,
  Sun,
  Menu as MenuIcon
} from 'lucide-react';

const Navbar = ({ onToggleSidebar }) => {
  const { user, logout } = useAuth();
  const { language, setLanguage } = useUser();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const languages = {
    en: 'English',
    hi: 'हिंदी',
    mr: 'मराठी',
    gu: 'ગુજરાતી'
  };

  const translations = {
    en: {
      search: 'Search...',
      notifications: 'Notifications',
      viewAll: 'View all',
      profile: 'Profile',
      settings: 'Settings',
      toggleTheme: 'Toggle theme',
      dashboard: 'Dashboard',
      fields: 'Fields',
      diagnose: 'Diagnose',
      recommendations: 'Recommendations'
    },
    hi: {
      search: 'खोजें...',
      notifications: 'सूचनाएं',
      viewAll: 'सभी देखें',
      profile: 'प्रोफ़ाइल',
      settings: 'सेटिंग्स',
      toggleTheme: 'थीम बदलें',
      dashboard: 'डैशबोर्ड',
      fields: 'खेत',
      diagnose: 'निदान',
      recommendations: 'सिफारिशें'
    },
    mr: {
      search: 'शोधा...',
      notifications: 'सूचना',
      viewAll: 'सर्व पहा',
      profile: 'प्रोफाइल',
      settings: 'सेटिंग्ज',
      toggleTheme: 'थीम बदला',
      dashboard: 'डॅशबोर्ड',
      fields: 'शेत',
      diagnose: 'निदान',
      recommendations: 'शिफारसी'
    },
    gu: {
      search: 'શોધો...',
      notifications: 'સૂચનાઓ',
      viewAll: 'બધા જુઓ',
      profile: 'પ્રોફાઇલ',
      settings: 'સેટિંગ્સ',
      toggleTheme: 'થીમ બદલો',
      dashboard: 'ડેશબોર્ડ',
      fields: 'ખેતરો',
      diagnose: 'રોગનિદાન',
      recommendations: 'ભલામણો'
    }
  };

  const t = translations[language] || translations.en;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={onToggleSidebar}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
            >
              <span className="sr-only">Open main menu</span>
              <MenuIcon className="block h-6 w-6" />
            </button>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-green-600">CropAI</span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder={t.search}
              />
            </div>

            <button
              type="button"
              className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <span className="sr-only">View notifications</span>
              <Bell className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <div className="-mr-2 flex items-center md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === '/'
                  ? 'bg-green-50 text-green-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
              }`}
            >
              {t.dashboard}
            </Link>
            <Link
              to="/fields"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname.startsWith('/fields')
                  ? 'bg-green-50 text-green-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
              }`}
            >
              {t.fields}
            </Link>
            <Link
              to="/diagnose"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === '/diagnose'
                  ? 'bg-green-50 text-green-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
              }`}
            >
              {t.diagnose}
            </Link>
            <Link
              to="/recommendations"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname.startsWith('/recommendations')
                  ? 'bg-green-50 text-green-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
              }`}
            >
              {t.recommendations}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

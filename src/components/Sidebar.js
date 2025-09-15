import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutGrid, 
  MapPin, 
  Camera, 
  History, 
  Sprout, 
  Bell, 
  Settings, 
  ChevronRight,
  ChevronDown,
  PlusCircle,
  User,
  LogOut,
  Home,
  BarChart2,
  Calendar,
  HelpCircle,
  X,
  List
} from 'lucide-react';
import { useUser } from '../context/UserContext';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ isOpen, onClose, user }) => {
  const { language, changeLanguage } = useUser();
  const { logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [expandedSections, setExpandedSections] = useState({
    fields: false,
    diagnosis: false,
    recommendations: false
  });
  
  // Close mobile sidebar when location changes
  useEffect(() => {
    if (isOpen && onClose) {
      onClose();
    }
  }, [location]);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const translations = {
    english: {
      dashboard: 'Dashboard',
      fields: 'Fields',
      addField: 'Add Field',
      viewFields: 'View All Fields',
      diagnosis: 'Crop Diagnosis',
      newDiagnosis: 'New Diagnosis',
      history: 'Diagnosis History',
      recommendations: 'Recommendations',
      getRecommendation: 'Get Recommendation',
      alerts: 'Alerts & Reminders',
      settings: 'Settings',
      profile: 'Profile',
      logout: 'Logout'
    },
    // Add other languages similarly
  };

  const t = translations[language] || translations.english;

  const menuItems = [
    {
      icon: LayoutGrid,
      label: t.dashboard,
      path: '/',
      active: isActive('/')
    },
    {
      label: t.fields,
      icon: MapPin,
      children: [
        { label: t.viewFields, path: '/fields' },
        { label: t.addField, path: '/fields/add', icon: PlusCircle }
      ],
      expanded: expandedSections.fields,
      onClick: () => toggleSection('fields')
    },
    {
      label: t.diagnosis,
      icon: Camera,
      children: [
        { label: t.newDiagnosis, path: '/diagnose' },
        { label: t.history, path: '/history' }
      ],
      expanded: expandedSections.diagnosis,
      onClick: () => toggleSection('diagnosis')
    },
    {
      label: t.recommendations,
      icon: Sprout,
      children: [
        { label: t.getRecommendation, path: '/recommendations' }
      ],
      expanded: expandedSections.recommendations,
      onClick: () => toggleSection('recommendations')
    },
    {
      icon: Bell,
      label: t.alerts,
      path: '/alerts',
      active: isActive('/alerts')
    },
    {
      icon: Settings,
      label: t.settings,
      path: '/profile',
      active: isActive('/profile')
    }
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className={`fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 h-full bg-white border-r border-gray-200 w-64 flex flex-col transition-transform duration-300 ease-in-out z-40`}>
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800">CropAI</h2>
        <button 
          onClick={onClose}
          className="md:hidden p-1 rounded-md text-gray-500 hover:bg-gray-100 focus:outline-none"
        >
          <X className="h-6 w-6" />
        </button>
      </div>
      <nav className="p-4 space-y-1">
        {menuItems.map((item, index) => (
          <div key={index}>
            {item.children ? (
              <>
                <button
                  onClick={item.onClick}
                  className={`flex items-center justify-between w-full p-3 rounded-lg text-left hover:bg-gray-100 ${
                    item.active ? 'text-green-600 font-medium' : 'text-gray-700'
                  }`}
                >
                  <div className="flex items-center">
                    <item.icon className="w-5 h-5 mr-3" />
                    <span>{item.label}</span>
                  </div>
                  {item.expanded ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </button>
                {item.expanded && (
                  <div className="ml-8 mt-1 space-y-1">
                    {item.children.map((child, childIndex) => (
                      <Link
                        key={childIndex}
                        to={child.path}
                        className={`block p-2 text-sm rounded-md ${
                          isActive(child.path)
                            ? 'text-green-600 font-medium bg-green-50'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center">
                          {child.icon && (
                            <child.icon className="w-4 h-4 mr-2" />
                          )}
                          {child.label}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Link
                to={item.path}
                className={`flex items-center p-3 rounded-lg ${
                  item.active
                    ? 'text-green-600 font-medium bg-green-50'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                <span>{item.label}</span>
              </Link>
            )}
          </div>
        ))}
      </nav>
      
    </div>
  );
};

export default Sidebar;

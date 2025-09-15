import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import useLocation from '../../hooks/useLocation';
import { getRecommendedCrops } from '../../services/crop/cropService';
import { 
  LayoutDashboard, 
  ScanSearch, 
  History, 
  Settings, 
  Bell, 
  LogOut,
  PlusCircle,
  AlertCircle,
  Droplet,
  Thermometer,
  Wind,
  Clock
} from 'lucide-react';

const Dashboard = () => {
  const { user, logout, addNotification } = useApp();
  const { coords, placeName, weather, isLoading: isLoadingLocation } = useLocation();
  const [activeTab, setActiveTab] = useState('overview');
  const [cropRecommendations, setCropRecommendations] = useState([]);
  const [isLoadingCrops, setIsLoadingCrops] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch crop recommendations when location is loaded
    if (coords && !isLoadingLocation) {
      setIsLoadingCrops(true);
      getRecommendedCrops({
        latitude: coords.latitude,
        longitude: coords.longitude,
      })
        .then(recommendations => {
          setCropRecommendations(recommendations);
          
          // Add notification for new recommendations
          if (recommendations.length > 0) {
            addNotification({
              type: 'info',
              message: `Found ${recommendations.length} crop recommendations for your location`,
              action: () => setActiveTab('recommendations'),
            });
          }
        })
        .catch(error => {
          console.error('Error fetching crop recommendations:', error);
          addNotification({
            type: 'error',
            message: 'Failed to load crop recommendations',
          });
        })
        .finally(() => {
          setIsLoadingCrops(false);
        });
    }
  }, [coords, isLoadingLocation, addNotification]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleNewDiagnosis = () => {
    navigate('/diagnose');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            CropAI
          </h1>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full text-gray-600 hover:bg-gray-100">
              <Bell className="h-6 w-6" />
            </button>
            <div className="relative">
              <button className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                  <span className="text-indigo-600 font-medium">
                    {user?.name?.[0]?.toUpperCase() || 'U'}
                  </span>
                </div>
                <span className="hidden md:inline text-sm font-medium text-gray-700">
                  {user?.name || 'User'}
                </span>
              </button>
            </div>
            <button 
              onClick={handleLogout}
              className="hidden md:flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Weather Card */}
        <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-medium text-gray-900">
                  {placeName || 'Your Location'}
                </h2>
                <p className="text-sm text-gray-500">
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
              
              {weather && (
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-3xl font-bold text-gray-900">
                      {Math.round(weather.current.temp)}°C
                    </p>
                    <p className="text-sm text-gray-600 capitalize">
                      {weather.current.weather[0].description}
                    </p>
                  </div>
                  <div className="h-16 w-16">
                    <img
                      src={`http://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`}
                      alt={weather.current.weather[0].description}
                      className="h-full w-full"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="flex items-center space-x-2">
                <Thermometer className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Feels Like</p>
                  <p className="font-medium">{Math.round(weather?.current.feels_like || 0)}°C</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Droplet className="h-5 w-5 text-blue-400" />
                <div>
                  <p className="text-sm text-gray-500">Humidity</p>
                  <p className="font-medium">{weather?.current.humidity || 0}%</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Wind className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Wind</p>
                  <p className="font-medium">{weather?.current.wind_speed || 0} m/s</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Updated</p>
                  <p className="font-medium">Just now</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <nav className="p-4">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium ${
                    activeTab === 'overview'
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <LayoutDashboard className="h-5 w-5" />
                  <span>Overview</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('diagnose')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium ${
                    activeTab === 'diagnose'
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <ScanSearch className="h-5 w-5" />
                  <span>Diagnose Crop</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('history')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium ${
                    activeTab === 'history'
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <History className="h-5 w-5" />
                  <span>History</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium ${
                    activeTab === 'settings'
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Settings className="h-5 w-5" />
                  <span>Settings</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-900">Welcome back, {user?.name || 'Farmer'}!</h2>
                  <button
                    onClick={handleNewDiagnosis}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <PlusCircle className="-ml-1 mr-2 h-5 w-5" />
                    New Diagnosis
                  </button>
                </div>

                {/* Crop Recommendations */}
                <div className="bg-white shadow rounded-lg overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-gray-900">Recommended Crops</h3>
                      <button className="text-sm text-indigo-600 hover:text-indigo-500">
                        View All
                      </button>
                    </div>

                    {isLoadingCrops ? (
                      <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto"></div>
                        <p className="mt-2 text-sm text-gray-500">Loading recommendations...</p>
                      </div>
                    ) : cropRecommendations.length > 0 ? (
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {cropRecommendations.slice(0, 3).map((crop) => (
                          <div key={crop.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between">
                              <h4 className="font-medium text-gray-900">{crop.name}</h4>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                {crop.confidence}% Match
                              </span>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">{crop.scientificName}</p>
                            
                            <div className="mt-4 space-y-2">
                              <div className="flex items-center text-sm text-gray-600">
                                <Thermometer className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                                <span>{crop.temperature.min}°C - {crop.temperature.max}°C</span>
                              </div>
                              <div className="flex items-center text-sm text-gray-600">
                                <Droplet className="flex-shrink-0 mr-1.5 h-4 w-4 text-blue-400" />
                                <span>{crop.waterRequirement} water</span>
                              </div>
                              <div className="flex items-center text-sm text-gray-600">
                                <Clock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                                <span>{crop.duration} days to harvest</span>
                              </div>
                            </div>
                            
                            <button className="mt-4 w-full inline-flex justify-center items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                              View Details
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No recommendations found</h3>
                        <p className="mt-1 text-sm text-gray-500">We couldn't find any crop recommendations for your location.</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white shadow rounded-lg overflow-hidden">
                  <div className="p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                          <ScanSearch className="h-5 w-5 text-indigo-600" />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-900">New diagnosis completed</p>
                          <p className="text-sm text-gray-500">Wheat - Rust detected with 92% confidence</p>
                          <p className="text-xs text-gray-400">2 hours ago</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                          <svg className="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-900">Crop recommendation ready</p>
                          <p className="text-sm text-gray-500">3 new crop recommendations available</p>
                          <p className="text-xs text-gray-400">5 hours ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'diagnose' && (
              <div className="bg-white shadow rounded-lg p-6 text-center">
                <div className="max-w-md mx-auto">
                  <ScanSearch className="mx-auto h-16 w-16 text-gray-400" />
                  <h3 className="mt-2 text-lg font-medium text-gray-900">Diagnose Crop Issue</h3>
                  <p className="mt-1 text-sm text-gray-500">Upload an image of your crop to diagnose any diseases or issues.</p>
                  <div className="mt-6">
                    <button
                      onClick={handleNewDiagnosis}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <PlusCircle className="-ml-1 mr-2 h-5 w-5" />
                      Upload Image
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'history' && (
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Diagnosis History</h3>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-500">No diagnosis history yet. Start by uploading an image.</p>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-6">Settings</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-4">Account</h4>
                    <div className="space-y-4">
                      <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                              Name
                            </label>
                            <input
                              type="text"
                              id="name"
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              defaultValue={user?.name || ''}
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                              Email
                            </label>
                            <input
                              type="email"
                              id="email"
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              defaultValue={user?.email || ''}
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                              Phone Number
                            </label>
                            <input
                              type="tel"
                              id="phone"
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              defaultValue={user?.phone || ''}
                            />
                          </div>
                          
                          <div className="pt-2">
                            <button
                              type="button"
                              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                              Save Changes
                            </button>
                          </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-6">
                    <h4 className="text-sm font-medium text-gray-900 mb-4">Preferences</h4>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <input
                          id="push-notifications"
                          name="push-notifications"
                          type="checkbox"
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                          defaultChecked
                        />
                        <label htmlFor="push-notifications" className="ml-3 block text-sm font-medium text-gray-700">
                          Push Notifications
                        </label>
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          id="email-notifications"
                          name="email-notifications"
                          type="checkbox"
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                          defaultChecked
                        />
                        <label htmlFor="email-notifications" className="ml-3 block text-sm font-medium text-gray-700">
                          Email Notifications
                        </label>
                      </div>
                      
                      <div className="flex items-center">
                        <label htmlFor="language" className="block text-sm font-medium text-gray-700 mr-3">
                          Language
                        </label>
                        <select
                          id="language"
                          name="language"
                          className="mt-1 block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                          defaultValue="en"
                        >
                          <option value="en">English</option>
                          <option value="hi">हिंदी</option>
                          <option value="mr">मराठी</option>
                          <option value="gu">ગુજરાતી</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-6">
                    <h4 className="text-sm font-medium text-gray-900 mb-4">Danger Zone</h4>
                    <div className="space-y-4">
                      <div>
                            <button
                              type="button"
                              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                              onClick={handleLogout}
                            >
                              Logout
                            </button>
                          </div>
                          
                          <div>
                            <button
                              type="button"
                              className="inline-flex justify-center py-2 px-4 border border-red-200 shadow-sm text-sm font-medium rounded-md text-red-700 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                              Delete Account
                            </button>
                            <p className="mt-2 text-xs text-gray-500">
                              This will permanently delete your account and all associated data.
                            </p>
                          </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDiagnosis } from '../context/DiagnosisContext';
import { useUser } from '../context/UserContext';
import { 
  Activity, 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  Thermometer, 
  Droplet, 
  Wind,
  Sun as SunIcon,
  Calendar,
  PlusCircle,
  Camera,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudDrizzle
} from 'lucide-react';

const Dashboard = () => {
  const { recentDiagnoses, isLoading, error, loadDiagnoses } = useDiagnosis();
  const { user } = useUser();
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weather, setWeather] = useState(null);
  const [alerts, setAlerts] = useState([]);

  // Format date with time
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get weather icon based on condition
  const getWeatherIcon = (condition) => {
    const weatherIcons = {
      'clear': <SunIcon className="h-6 w-6 text-yellow-500" />,
      'clouds': <Cloud className="h-6 w-6 text-gray-500" />,
      'rain': <CloudRain className="h-6 w-6 text-blue-500" />,
      'snow': <CloudSnow className="h-6 w-6 text-blue-200" />,
      'thunderstorm': <CloudLightning className="h-6 w-6 text-purple-500" />,
      'drizzle': <CloudDrizzle className="h-6 w-6 text-blue-400" />,
    };
    return weatherIcons[condition.toLowerCase()] || <Cloud className="h-6 w-6 text-gray-400" />;
  };

  // Generate mock weather data
  const fetchWeatherData = async () => {
    try {
      // Mock data for demonstration
      const mockWeather = {
        temperature: 28,
        condition: 'clear',
        humidity: 65,
        windSpeed: 12,
        precipitation: 0,
        forecast: [
          { day: 'Today', high: 28, low: 22, condition: 'clear' },
          { day: 'Tue', high: 27, low: 21, condition: 'clouds' },
          { day: 'Wed', high: 26, low: 20, condition: 'rain' },
          { day: 'Thu', high: 25, low: 19, condition: 'clear' },
        ]
      };
      
      setWeather(mockWeather);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  // Generate mock alerts
  const fetchAlerts = () => {
    const mockAlerts = [
      { 
        id: 1, 
        type: 'warning', 
        message: 'High temperature alert for your crops', 
        timestamp: new Date() 
      },
      { 
        id: 2, 
        type: 'info', 
        message: 'Irrigation scheduled for tomorrow', 
        timestamp: new Date() 
      },
      { 
        id: 3, 
        type: 'critical', 
        message: 'Pest alert in your region', 
        timestamp: new Date() 
      },
    ];
    
    setAlerts(mockAlerts);
  };

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    // Initial data fetch
    loadDiagnoses();
    fetchWeatherData();
    fetchAlerts();

    return () => clearInterval(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-400 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertCircle className="h-5 w-5 text-red-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">
              Error loading dashboard data: {error.message}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4">
      {/* Header with Greeting and Time */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name || 'User'}</h1>
          <div className="flex items-center space-x-4 mt-1">
            <p className="text-gray-600 flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {formatDate(currentTime)}
            </p>
            {weather && (
              <div className="flex items-center text-gray-600">
                <Thermometer className="h-4 w-4 mr-1" />
                <span>{weather.temperature}°C</span>
                <span className="mx-2">•</span>
                <div className="flex items-center">
                  {getWeatherIcon(weather.condition)}
                  <span className="ml-1 capitalize">{weather.condition}</span>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="mt-4 md:mt-0">
          <button 
            onClick={() => navigate('/diagnose')}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            <Camera className="w-5 h-5 mr-2" />
            New Diagnosis
          </button>
        </div>
      </div>

      {/* Weather Overview */}
      {weather && (
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Weather Forecast</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {weather.forecast.map((day, index) => (
              <div key={index} className="text-center p-3 rounded-lg bg-gray-50">
                <p className="font-medium text-gray-700">{day.day}</p>
                <div className="my-2">{getWeatherIcon(day.condition)}</div>
                <div className="flex justify-center space-x-2">
                  <span className="text-gray-900 font-medium">{day.high}°</span>
                  <span className="text-gray-500">{day.low}°</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
              <Activity className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Recent Diagnoses</p>
              <p className="text-2xl font-semibold text-gray-900">
                {recentDiagnoses?.length || 0}
              </p>
              <p className="text-xs text-gray-500 mt-1">Last 30 days</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
              <CheckCircle className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Healthy Crops</p>
              <p className="text-2xl font-semibold text-gray-900">
                {recentDiagnoses?.filter(d => d.status?.toLowerCase() === 'healthy').length || 0}
              </p>
              <p className="text-xs text-gray-500 mt-1">Based on recent scans</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 mr-4">
              <AlertCircle className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Issues Detected</p>
              <p className="text-2xl font-semibold text-gray-900">
                {recentDiagnoses?.filter(d => d.status?.toLowerCase() === 'warning' || d.status?.toLowerCase() === 'critical').length || 0}
              </p>
              <p className="text-xs text-gray-500 mt-1">Needs attention</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
              <Clock className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Success Rate</p>
              <p className="text-2xl font-semibold text-gray-900">
                {recentDiagnoses?.length > 0 
                  ? `${Math.round((recentDiagnoses.filter(d => d.confidence > 70).length / recentDiagnoses.length) * 100)}%`
                  : '0%'}
              </p>
              <p className="text-xs text-gray-500 mt-1">Accurate diagnoses</p>
            </div>
          </div>
        </div>
      </div>

      {/* Alerts Section */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold text-gray-800">Recent Alerts</h2>
          <Link to="/alerts" className="text-sm text-green-600 hover:text-green-800">
            View All
          </Link>
        </div>
        <div className="space-y-3">
          {alerts.length > 0 ? (
            alerts.map(alert => (
              <div 
                key={alert.id} 
                className={`p-4 rounded-lg border-l-4 ${
                  alert.type === 'critical' 
                    ? 'bg-red-50 border-red-500' 
                    : alert.type === 'warning' 
                      ? 'bg-yellow-50 border-yellow-500'
                      : 'bg-blue-50 border-blue-500'
                }`}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 pt-0.5">
                    {alert.type === 'critical' ? (
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    ) : alert.type === 'warning' ? (
                      <AlertCircle className="h-5 w-5 text-yellow-500" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-blue-500" />
                    )}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-700">{alert.message}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(alert.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 py-4">No recent alerts</p>
          )}
        </div>
      </div>

      {/* Recent Diagnoses */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold text-gray-800">Recent Diagnoses</h2>
          <Link to="/history" className="text-sm text-green-600 hover:text-green-800">
            View All
          </Link>
        </div>
        <div className="space-y-4">
          {recentDiagnoses && recentDiagnoses.length > 0 ? (
            recentDiagnoses.slice(0, 3).map((diagnosis) => (
              <div 
                key={diagnosis.id} 
                className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => navigate(`/diagnosis/${diagnosis.id}`)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {diagnosis.cropType || 'Crop Analysis'}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {new Date(diagnosis.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <span 
                    className={`px-2 py-1 text-xs rounded-full ${
                      diagnosis.status === 'healthy' 
                        ? 'bg-green-100 text-green-800' 
                        : diagnosis.status === 'warning' 
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {diagnosis.status || 'Unknown'}
                  </span>
                </div>
                {diagnosis.issue && (
                  <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                    {diagnosis.issue}
                  </p>
                )}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 py-4">No recent diagnoses found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

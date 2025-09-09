import React, { useState } from 'react';
import { 
  User, Lock, Globe, Home, Leaf, History, Bell, Settings, 
  MapPin, Calendar, Cloud, AlertTriangle, CheckCircle, Info, 
  Upload, Users, Send, Wifi, WifiOff, ArrowRight, Star, 
  Clock, Droplets, Sun, Thermometer
} from 'lucide-react';

// 1. Login / Register Page Wireframe
export const LoginRegisterWireframe = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [language, setLanguage] = useState('English');

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center">
          <Leaf className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          {isLogin ? 'Farmer Login' : 'Farmer Registration'}
        </h1>
        <p className="text-gray-600">Digital Crop Recommendation Platform</p>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <Globe className="w-4 h-4 inline mr-2" />
          Language / भाषा
        </label>
        <select 
          value={language} 
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg bg-white"
        >
          <option value="English">English</option>
          <option value="Hindi">हिंदी (Hindi)</option>
          <option value="Local">Local Language</option>
        </select>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <User className="w-4 h-4 inline mr-2" />
              Phone Number / Email
            </label>
            <input 
              type="text" 
              placeholder="Enter phone or email"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Lock className="w-4 h-4 inline mr-2" />
              Password
            </label>
            <input 
              type="password" 
              placeholder="Enter password"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Lock className="w-4 h-4 inline mr-2" />
                Confirm Password
              </label>
              <input 
                type="password" 
                placeholder="Confirm password"
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>
          )}

          <button 
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors"
          >
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
      </div>

      <div className="text-center">
        <button 
          onClick={() => setIsLogin(!isLogin)}
          className="text-green-600 font-medium"
        >
          {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
        </button>
      </div>

      <div className="fixed bottom-4 right-4 bg-yellow-100 border border-yellow-400 rounded-lg p-2 flex items-center">
        <WifiOff className="w-4 h-4 text-yellow-600 mr-2" />
        <span className="text-sm text-yellow-800">Offline Mode</span>
      </div>
    </div>
  );
};

// 2. Farmer Dashboard Wireframe
export const FarmerDashboardWireframe = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-green-600 text-white p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Welcome, Ram Singh</h1>
            <p className="text-green-100">Village: Sukhdevpur, UP</p>
          </div>
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-green-600">5</div>
            <div className="text-sm text-gray-600">Past Recommendations</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-blue-600">2</div>
            <div className="text-sm text-gray-600">Active Alerts</div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <Leaf className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Get Crop Recommendation</h3>
                  <p className="text-sm text-gray-600">AI-powered suggestions for your farm</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <History className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">My Past Recommendations</h3>
                  <p className="text-sm text-gray-600">View your previous crop suggestions</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                  <Bell className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Alerts & Reminders</h3>
                  <p className="text-sm text-gray-600">Weather warnings and farming tips</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                  <Settings className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Profile & Settings</h3>
                  <p className="text-sm text-gray-600">Manage your account and preferences</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex justify-around py-2">
          <div className="flex flex-col items-center p-2">
            <Home className="w-6 h-6 text-green-600" />
            <span className="text-xs text-green-600 font-medium">Home</span>
          </div>
          <div className="flex flex-col items-center p-2">
            <Leaf className="w-6 h-6 text-gray-400" />
            <span className="text-xs text-gray-400">Crops</span>
          </div>
          <div className="flex flex-col items-center p-2">
            <Bell className="w-6 h-6 text-gray-400" />
            <span className="text-xs text-gray-400">Alerts</span>
          </div>
          <div className="flex flex-col items-center p-2">
            <User className="w-6 h-6 text-gray-400" />
            <span className="text-xs text-gray-400">Profile</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// 3. Crop Recommendation Input Page Wireframe
export const CropRecommendationInputWireframe = () => {
  const [formData, setFormData] = useState({
    farmSize: '',
    soilType: '',
    location: '',
    previousCrop: ''
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-green-600 text-white p-4">
        <div className="flex items-center">
          <button className="mr-4">
            <ArrowRight className="w-6 h-6 rotate-180" />
          </button>
          <h1 className="text-xl font-bold">Crop Recommendation</h1>
        </div>
      </div>

      <div className="p-4">
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Farm Size (Acres)
            </label>
            <input 
              type="number" 
              placeholder="Enter farm size in acres"
              value={formData.farmSize}
              onChange={(e) => setFormData({...formData, farmSize: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Soil Type
            </label>
            <select 
              value={formData.soilType}
              onChange={(e) => setFormData({...formData, soilType: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg"
            >
              <option value="">Select soil type</option>
              <option value="clay">Clay Soil</option>
              <option value="loamy">Loamy Soil</option>
              <option value="sandy">Sandy Soil</option>
              <option value="black">Black Soil</option>
              <option value="red">Red Soil</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="w-4 h-4 inline mr-2" />
              Location
            </label>
            <div className="space-y-2">
              <button className="w-full p-3 border border-green-500 text-green-600 rounded-lg font-medium">
                📍 Use GPS Location
              </button>
              <input 
                type="text" 
                placeholder="Or enter location manually"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Previous Crop (Optional)
            </label>
            <input 
              type="text" 
              placeholder="What did you grow last season?"
              value={formData.previousCrop}
              onChange={(e) => setFormData({...formData, previousCrop: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="bg-blue-50 border-2 border-dashed border-blue-300 rounded-lg p-4 text-center">
            <div className="text-blue-600 font-semibold mb-2">🤖 AI Integration Port</div>
            <div className="text-sm text-blue-700">
              Backend Model Integration Point<br/>
              Crop recommendation algorithm will be connected here
            </div>
          </div>

          <button className="w-full bg-green-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors">
            <Leaf className="w-5 h-5 inline mr-2" />
            Generate Recommendation (AI Powered)
          </button>
        </div>
      </div>
    </div>
  );
};

// 4. Recommendation Result Page Wireframe
export const RecommendationResultWireframe = () => {
  const recommendations = [
    {
      id: 1,
      name: "Wheat",
      score: 95,
      reason: "Best suited because of soil type and current weather conditions",
      season: "Rabi",
      duration: "120 days"
    },
    {
      id: 2,
      name: "Mustard",
      score: 87,
      reason: "Good alternative with high market demand",
      season: "Rabi", 
      duration: "90 days"
    },
    {
      id: 3,
      name: "Chickpea",
      score: 82,
      reason: "Suitable for crop rotation and soil health",
      season: "Rabi",
      duration: "110 days"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-green-600 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button className="mr-4">
              <ArrowRight className="w-6 h-6 rotate-180" />
            </button>
            <h1 className="text-xl font-bold">Crop Recommendations</h1>
          </div>
          <div className="text-sm">
            <Wifi className="w-4 h-4 inline mr-1" />
            AI Powered
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center">
            <Info className="w-5 h-5 text-blue-600 mr-2" />
            <span className="text-blue-800 font-medium">Based on your farm data, here are the best crop options:</span>
          </div>
        </div>

        {recommendations.map((crop, index) => (
          <div key={crop.id} className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-500">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <Leaf className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{crop.name}</h3>
                  <div className="flex items-center text-sm text-gray-600">
                    <Star className="w-4 h-4 text-yellow-500 mr-1" />
                    {crop.score}% Match
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">{crop.season}</div>
                <div className="text-sm text-gray-600">{crop.duration}</div>
              </div>
            </div>
            
            <p className="text-gray-700 mb-4">{crop.reason}</p>
            
            <div className="flex space-x-3">
              <button className="flex-1 bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700">
                View Details
              </button>
              <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700">
                <Calendar className="w-4 h-4 inline mr-1" />
                Set Reminder
              </button>
            </div>
          </div>
        ))}

        <div className="bg-yellow-50 border-2 border-dashed border-yellow-300 rounded-lg p-4 text-center">
          <div className="text-yellow-700 font-semibold mb-2">🤖 AI Integration Port</div>
          <div className="text-sm text-yellow-600">
            Recommendation results will be generated by AI model<br/>
            Backend integration point for crop suggestion algorithm
          </div>
        </div>
      </div>
    </div>
  );
};

// 5. Crop Detail Page Wireframe
export const CropDetailWireframe = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-green-600 text-white p-4">
        <div className="flex items-center">
          <button className="mr-4">
            <ArrowRight className="w-6 h-6 rotate-180" />
          </button>
          <h1 className="text-xl font-bold">Wheat Details</h1>
        </div>
      </div>

      <div className="bg-white p-4">
        <div className="w-full h-48 bg-green-100 rounded-lg flex items-center justify-center">
          <Leaf className="w-16 h-16 text-green-600" />
          <span className="text-green-600 font-medium ml-2">Crop Image</span>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Crop Information</h2>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                <Info className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <div className="font-medium text-gray-800">Description</div>
                <div className="text-sm text-gray-600">Wheat is a cereal grain that is a worldwide staple food. It's rich in nutrients and suitable for various soil types.</div>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                <MapPin className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <div className="font-medium text-gray-800">Ideal Soil</div>
                <div className="text-sm text-gray-600">Loamy soil, well-drained, pH 6.0-7.5</div>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                <Sun className="w-4 h-4 text-orange-600" />
              </div>
              <div>
                <div className="font-medium text-gray-800">Best Season</div>
                <div className="text-sm text-gray-600">Rabi (October to March)</div>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                <Clock className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <div className="font-medium text-gray-800">Growth Duration</div>
                <div className="text-sm text-gray-600">110-120 days</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Best Practices</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">🌱 Fertilizer Tips</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Apply NPK 120:60:40 kg/ha</li>
                <li>• Split application: 50% at sowing, 50% at tillering</li>
                <li>• Use organic manure for better soil health</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">💧 Irrigation Tips</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Critical stages: Crown root, Tillering, Jointing</li>
                <li>• Maintain soil moisture at 60-70%</li>
                <li>• Avoid waterlogging</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">🌡️ Weather Considerations</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Optimal temperature: 20-25°C</li>
                <li>• Frost sensitive during flowering</li>
                <li>• Requires 400-500mm rainfall</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <button className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-green-700">
            Add to My Plan
          </button>
          <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-700">
            <Calendar className="w-5 h-5 inline mr-2" />
            Set Planting Reminder
          </button>
        </div>
      </div>
    </div>
  );
};

// 6. Alerts & Reminders Page Wireframe
export const AlertsRemindersWireframe = () => {
  const alerts = [
    {
      id: 1,
      type: 'weather',
      title: 'Heavy Rainfall Expected',
      message: 'Heavy rainfall predicted for next 3 days. Avoid irrigation.',
      time: '2 hours ago',
      priority: 'high'
    },
    {
      id: 2,
      type: 'pest',
      title: 'Pest Alert: Aphids',
      message: 'Aphid infestation reported in nearby farms. Check your wheat crop.',
      time: '1 day ago',
      priority: 'medium'
    },
    {
      id: 3,
      type: 'reminder',
      title: 'Planting Reminder',
      message: 'Time to plant wheat seeds. Best window: Oct 15-30.',
      time: '3 days ago',
      priority: 'low'
    }
  ];

  const getIcon = (type) => {
    switch(type) {
      case 'weather': return <Cloud className="w-5 h-5" />;
      case 'pest': return <AlertTriangle className="w-5 h-5" />;
      case 'reminder': return <Calendar className="w-5 h-5" />;
      default: return <Bell className="w-5 h-5" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'border-red-500 bg-red-50';
      case 'medium': return 'border-orange-500 bg-orange-50';
      case 'low': return 'border-blue-500 bg-blue-50';
      default: return 'border-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-green-600 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button className="mr-4">
              <ArrowRight className="w-6 h-6 rotate-180" />
            </button>
            <h1 className="text-xl font-bold">Alerts & Reminders</h1>
          </div>
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <Bell className="w-5 h-5 text-green-600" />
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-red-100 rounded-lg p-3 text-center">
            <div className="text-xl font-bold text-red-600">2</div>
            <div className="text-xs text-red-700">High Priority</div>
          </div>
          <div className="bg-orange-100 rounded-lg p-3 text-center">
            <div className="text-xl font-bold text-orange-600">1</div>
            <div className="text-xs text-orange-700">Medium</div>
          </div>
          <div className="bg-blue-100 rounded-lg p-3 text-center">
            <div className="text-xl font-bold text-blue-600">3</div>
            <div className="text-xs text-blue-700">Total</div>
          </div>
        </div>

        <div className="space-y-4">
          {alerts.map((alert) => (
            <div key={alert.id} className={`bg-white rounded-xl shadow-sm p-4 border-l-4 ${getPriorityColor(alert.priority)}`}>
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mr-3 shadow-sm">
                    {getIcon(alert.type)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{alert.title}</h3>
                    <p className="text-sm text-gray-600">{alert.time}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
              <p className="text-gray-700 text-sm">{alert.message}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Weather Summary</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <Thermometer className="w-8 h-8 text-orange-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">28°C</div>
              <div className="text-sm text-gray-600">Temperature</div>
            </div>
            <div className="text-center">
              <Droplets className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">65%</div>
              <div className="text-sm text-gray-600">Humidity</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 7. Admin/Expert Dashboard Wireframe
export const AdminDashboardWireframe = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-purple-600 text-white p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
            <p className="text-purple-100">Extension Officer Portal</p>
          </div>
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-purple-600" />
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-purple-600">150</div>
            <div className="text-sm text-gray-600">Total Farmers</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-green-600">45</div>
            <div className="text-sm text-gray-600">Active Users</div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                  <Upload className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Upload Crop Database</h3>
                  <p className="text-sm text-gray-600">Add new crops and farming data</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Manage Farmer Users</h3>
                  <p className="text-sm text-gray-600">View and manage farmer accounts</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                  <Send className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Send Alerts</h3>
                  <p className="text-sm text-gray-600">Broadcast important messages to farmers</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <Leaf className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Crop Analytics</h3>
                  <p className="text-sm text-gray-600">View farming trends and recommendations</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="mt-6 bg-blue-50 border-2 border-dashed border-blue-300 rounded-lg p-4 text-center">
          <div className="text-blue-600 font-semibold mb-2">🤖 AI Integration Port</div>
          <div className="text-sm text-blue-700">
            Admin backend integration point<br/>
            Database management and AI model training interface
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Wireframes Component
export const Wireframes = () => {
  const [currentScreen, setCurrentScreen] = useState('login');

  const screens = {
    login: { component: LoginRegisterWireframe, name: 'Login/Register' },
    dashboard: { component: FarmerDashboardWireframe, name: 'Farmer Dashboard' },
    input: { component: CropRecommendationInputWireframe, name: 'Crop Input' },
    result: { component: RecommendationResultWireframe, name: 'Results' },
    detail: { component: CropDetailWireframe, name: 'Crop Detail' },
    alerts: { component: AlertsRemindersWireframe, name: 'Alerts' },
    admin: { component: AdminDashboardWireframe, name: 'Admin Dashboard' }
  };

  const CurrentComponent = screens[currentScreen].component;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-sm p-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Crop Recommendation Platform - Wireframes</h1>
          <div className="flex flex-wrap gap-2">
            {Object.entries(screens).map(([key, screen]) => (
              <button
                key={key}
                onClick={() => setCurrentScreen(key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentScreen === key
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {screen.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto">
        <CurrentComponent />
      </div>
    </div>
  );
};

export default { 
  LoginRegisterWireframe, 
  FarmerDashboardWireframe, 
  CropRecommendationInputWireframe,
  RecommendationResultWireframe,
  CropDetailWireframe,
  AlertsRemindersWireframe,
  AdminDashboardWireframe,
  Wireframes
};

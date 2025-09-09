import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  MapPin, 
  Ruler, 
  Droplets, 
  Wheat, 
  Zap,
  Smartphone,
  Globe,
  Calendar
} from 'lucide-react';

const CropRecommendationInput = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    farmSize: '',
    soilType: '',
    location: '',
    previousCrop: '',
    season: '',
    irrigation: '',
    budget: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  const soilTypes = [
    { value: 'clay', label: 'चिकनी मिट्टी (Clay)', description: 'भारी और पानी रोकने वाली' },
    { value: 'loamy', label: 'दोमट मिट्टी (Loamy)', description: 'सर्वोत्तम फसल उत्पादन के लिए' },
    { value: 'sandy', label: 'बलुई मिट्टी (Sandy)', description: 'हल्की और जल निकासी वाली' },
    { value: 'silt', label: 'गाद मिट्टी (Silt)', description: 'मध्यम बनावट वाली' },
    { value: 'red', label: 'लाल मिट्टी (Red Soil)', description: 'लोहे की अधिकता वाली' }
  ];

  const seasons = [
    { value: 'kharif', label: 'खरीफ (जुलाई-अक्टूबर)' },
    { value: 'rabi', label: 'रबी (अक्टूबर-मार्च)' },
    { value: 'zaid', label: 'ज़ायद (मार्च-जून)' }
  ];

  const irrigationTypes = [
    { value: 'rainfed', label: 'वर्षा आधारित' },
    { value: 'irrigated', label: 'सिंचित' },
    { value: 'drip', label: 'ड्रिप सिंचाई' },
    { value: 'sprinkler', label: 'स्प्रिंकलर' }
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate AI processing
    setTimeout(() => {
      setIsLoading(false);
      navigate('/recommendation-result');
    }, 2000);
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormData(prev => ({
            ...prev,
            location: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`
          }));
        },
        (error) => {
          console.error('Location error:', error);
          alert('स्थान प्राप्त करने में समस्या। कृपया मैन्युअल रूप से दर्ज करें।');
        }
      );
    } else {
      alert('आपका ब्राउज़र GPS का समर्थन नहीं करता।');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">फसल सिफारिश</h1>
              <p className="text-sm text-gray-600">अपने खेत की जानकारी दर्ज करें</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Farm Size */}
          <div className="card">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Ruler className="inline w-4 h-4 mr-2" />
              खेत का आकार
            </label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                name="farmSize"
                value={formData.farmSize}
                onChange={handleInputChange}
                placeholder="5"
                className="input-field"
                required
              />
              <select className="input-field">
                <option value="acres">एकड़</option>
                <option value="hectares">हेक्टेयर</option>
                <option value="bigha">बीघा</option>
              </select>
            </div>
          </div>

          {/* Soil Type */}
          <div className="card">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Droplets className="inline w-4 h-4 mr-2" />
              मिट्टी का प्रकार
            </label>
            <select
              name="soilType"
              value={formData.soilType}
              onChange={handleInputChange}
              className="input-field"
              required
            >
              <option value="">मिट्टी का प्रकार चुनें</option>
              {soilTypes.map((soil) => (
                <option key={soil.value} value={soil.value}>
                  {soil.label} - {soil.description}
                </option>
              ))}
            </select>
          </div>

          {/* Location */}
          <div className="card">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="inline w-4 h-4 mr-2" />
              स्थान
            </label>
            <div className="space-y-3">
              <div className="flex space-x-2">
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="गांव, जिला, राज्य"
                  className="input-field flex-1"
                  required
                />
                <button
                  type="button"
                  onClick={getCurrentLocation}
                  className="px-4 py-3 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                >
                  <Globe className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-gray-500">
                या GPS स्थान प्राप्त करने के लिए बटन दबाएं
              </p>
            </div>
          </div>

          {/* Previous Crop */}
          <div className="card">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Wheat className="inline w-4 h-4 mr-2" />
              पिछली फसल
            </label>
            <input
              type="text"
              name="previousCrop"
              value={formData.previousCrop}
              onChange={handleInputChange}
              placeholder="गेहूं, धान, मक्का, आदि"
              className="input-field"
            />
          </div>

          {/* Season */}
          <div className="card">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="inline w-4 h-4 mr-2" />
              फसल सीजन
            </label>
            <select
              name="season"
              value={formData.season}
              onChange={handleInputChange}
              className="input-field"
              required
            >
              <option value="">सीजन चुनें</option>
              {seasons.map((season) => (
                <option key={season.value} value={season.value}>
                  {season.label}
                </option>
              ))}
            </select>
          </div>

          {/* Irrigation */}
          <div className="card">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Droplets className="inline w-4 h-4 mr-2" />
              सिंचाई का प्रकार
            </label>
            <select
              name="irrigation"
              value={formData.irrigation}
              onChange={handleInputChange}
              className="input-field"
              required
            >
              <option value="">सिंचाई प्रकार चुनें</option>
              {irrigationTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* Budget Range */}
          <div className="card">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Smartphone className="inline w-4 h-4 mr-2" />
              बजट सीमा (प्रति एकड़)
            </label>
            <select
              name="budget"
              value={formData.budget}
              onChange={handleInputChange}
              className="input-field"
            >
              <option value="">बजट चुनें</option>
              <option value="low">कम (₹5,000 - ₹15,000)</option>
              <option value="medium">मध्यम (₹15,000 - ₹30,000)</option>
              <option value="high">उच्च (₹30,000+)</option>
            </select>
          </div>

          {/* AI Integration Notice */}
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-3">
              <Zap className="w-6 h-6 text-yellow-600" />
              <h4 className="font-bold text-yellow-800">AI इंटीग्रेशन पोर्ट</h4>
            </div>
            <p className="text-yellow-700 text-sm mb-3">
              <strong>बैकएंड मॉडल यहाँ:</strong> यह फॉर्म डेटा Gemini API को भेजा जाएगा जो 
              मिट्टी, मौसम, और क्षेत्रीय डेटा के आधार पर फसल सिफारिशें प्रदान करेगा।
            </p>
            <div className="bg-yellow-100 p-3 rounded-lg">
              <p className="text-yellow-800 text-xs">
                <strong>API एंडपॉइंट:</strong> POST /api/crop-recommendation<br/>
                <strong>मॉडल:</strong> Gemini Pro Vision + Custom ML Model<br/>
                <strong>इनपुट:</strong> Soil data, Weather data, Location, Season
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full btn-primary text-lg py-4 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>AI सिफारिश प्राप्त कर रहा है...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <Zap className="w-5 h-5" />
                <span>सिफारिश प्राप्त करें (AI संचालित)</span>
              </div>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CropRecommendationInput;

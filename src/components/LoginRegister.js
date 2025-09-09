import React, { useState } from 'react';
import { Sprout, Globe, Eye, EyeOff, Smartphone, Lock } from 'lucide-react';
import { useUser } from '../context/UserContext';

const LoginRegister = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const { language, changeLanguage } = useUser();
  const [formData, setFormData] = useState({
    phone: '',
    password: ''
  });

  const languages = [
    { code: 'hindi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'english', name: 'English', flag: '🇺🇸' },
    { code: 'marathi', name: 'मराठी', flag: '🇮🇳' },
    { code: 'gujarati', name: 'ગુજરાતી', flag: '🇮🇳' }
  ];

  const translations = {
    hindi: {
      title: 'क्रॉपएआई में आपका स्वागत है',
      subtitle: 'स्मार्ट खेती के लिए AI आधारित प्लेटफॉर्म',
      phone: 'फोन नंबर',
      password: 'पासवर्ड',
      login: 'लॉगिन करें',
      register: 'रजिस्टर करें',
      switchToRegister: 'नया खाता बनाएं',
      switchToLogin: 'पहले से खाता है?',
      language: 'भाषा चुनें'
    },
    english: {
      title: 'Welcome to CropAI',
      subtitle: 'AI-powered platform for smart farming',
      phone: 'Phone Number',
      password: 'Password',
      login: 'Login',
      register: 'Register',
      switchToRegister: 'Create new account',
      switchToLogin: 'Already have an account?',
      language: 'Select Language'
    },
    marathi: {
      title: 'क्रॉपएआई मध्ये आपले स्वागत आहे',
      subtitle: 'स्मार्ट शेतीसाठी AI-आधारित प्लॅटफॉर्म',
      phone: 'फोन नंबर',
      password: 'पासवर्ड',
      login: 'लॉगिन करा',
      register: 'नोंदणी करा',
      switchToRegister: 'नवीन खाते तयार करा',
      switchToLogin: 'आधीपासून खाते आहे?',
      language: 'भाषा निवडा'
    },
    gujarati: {
      title: 'ક્રોપએઆઈ માં આપનું સ્વાગત છે',
      subtitle: 'સ્માર્ટ ખેતી માટે AI-આધારિત પ્લેટફોર્મ',
      phone: 'ફોન નંબર',
      password: 'પાસવર્ડ',
      login: 'લૉગિન કરો',
      register: 'રજિસ્ટર કરો',
      switchToRegister: 'નવું એકાઉન્ટ બનાવો',
      switchToLogin: 'પહેલાથી એકાઉન્ટ છે?',
      language: 'ભાષા પસંદ કરો'
    }
  };

  const t = translations[language];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate login/register
    onLogin('farmer');
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-green-100 p-4 rounded-full">
              <Sprout className="w-12 h-12 text-green-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{t.title}</h1>
          <p className="text-gray-600">{t.subtitle}</p>
        </div>

        {/* Language Selector */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Globe className="inline w-4 h-4 mr-2" />
            {t.language}
          </label>
          <div className="grid grid-cols-2 gap-2">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                  language === lang.code
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{lang.flag}</span>
                {lang.name}
              </button>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Smartphone className="inline w-4 h-4 mr-2" />
                {t.phone}
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+91 98765 43210"
                className="input-field"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Lock className="inline w-4 h-4 mr-2" />
                {t.password}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="input-field pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn-primary w-full text-lg py-4">
              {isLogin ? t.login : t.register}
            </button>
          </form>

          {/* Switch Mode */}
          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-green-600 hover:text-green-700 font-medium"
            >
              {isLogin ? t.switchToRegister : t.switchToLogin}
            </button>
          </div>

          {/* Demo Login Buttons */}
          <div className="mt-6 space-y-3">
            <button
              onClick={() => onLogin('farmer')}
              className="w-full btn-secondary text-lg py-3"
            >
              👨‍🌾 Demo Farmer Login
            </button>
            <button
              onClick={() => onLogin('admin')}
              className="w-full btn-secondary text-lg py-3"
            >
              👨‍💼 Demo Admin Login
            </button>
          </div>
        </div>

        {/* Offline Indicator */}
        <div className="mt-4 text-center">
          <div className="inline-flex items-center px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
            <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
            Offline Mode Available
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;

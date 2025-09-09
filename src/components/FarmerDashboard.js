import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import LanguageSwitcher from './LanguageSwitcher';
import { 
  Sprout, 
  History, 
  Bell, 
  User, 
  LogOut, 
  TrendingUp,
  MapPin,
  Calendar
} from 'lucide-react';

const FarmerDashboard = ({ onLogout }) => {
  const navigate = useNavigate();
  const { user, alerts, language } = useUser();

  const translations = {
    hindi: {
      appName: 'क्रॉपएआई',
      appSubtitle: 'स्मार्ट खेती प्लेटफॉर्म',
      welcome: 'नमस्ते',
      welcomeSubtitle: 'आज क्या उगाना चाहते हैं? AI आपकी मदद करेगा',
      online: 'ऑनलाइन',
      logout: 'लॉगआउट',
      farmSize: 'खेत का आकार',
      currentSeason: 'इस सीजन',
      successRate: 'सफलता दर',
      recentActivity: 'हाल की गतिविधियां',
      aiIntegration: 'AI इंटीग्रेशन पोर्ट',
      aiIntegrationText: 'बैकएंड मॉडल यहाँ: Gemini API के साथ क्रॉप रेकमेंडेशन AI मॉडल इंटीग्रेट किया जाएगा। वर्तमान में डेमो डेटा प्रदर्शित किया जा रहा है।',
      tapToOpen: 'टैप करें',
      toOpen: 'खोलने के लिए',
      cards: {
        recommendation: {
          title: 'फसल सिफारिश प्राप्त करें',
          subtitle: 'AI से सर्वोत्तम फसल चुनें'
        },
        history: {
          title: 'मेरी पिछली सिफारिशें',
          subtitle: 'पिछले सुझाव देखें'
        },
        alerts: {
          title: 'अलर्ट और रिमाइंडर',
          subtitle: 'नई सूचनाएं'
        },
        profile: {
          title: 'प्रोफाइल और सेटिंग्स',
          subtitle: 'अपनी जानकारी अपडेट करें'
        }
      }
    },
    english: {
      appName: 'CropAI',
      appSubtitle: 'Smart Farming Platform',
      welcome: 'Hello',
      welcomeSubtitle: 'What would you like to grow today? AI will help you',
      online: 'Online',
      logout: 'Logout',
      farmSize: 'Farm Size',
      currentSeason: 'Current Season',
      successRate: 'Success Rate',
      recentActivity: 'Recent Activity',
      aiIntegration: 'AI Integration Port',
      aiIntegrationText: 'Backend Model Here: Crop Recommendation AI model will be integrated with Gemini API. Currently displaying demo data.',
      tapToOpen: 'Tap',
      toOpen: 'to open',
      cards: {
        recommendation: {
          title: 'Get Crop Recommendation',
          subtitle: 'Choose the best crop with AI'
        },
        history: {
          title: 'My Previous Recommendations',
          subtitle: 'View past suggestions'
        },
        alerts: {
          title: 'Alerts & Reminders',
          subtitle: 'new notifications'
        },
        profile: {
          title: 'Profile & Settings',
          subtitle: 'Update your information'
        }
      }
    },
    marathi: {
      appName: 'क्रॉपएआई',
      appSubtitle: 'स्मार्ट शेती प्लॅटफॉर्म',
      welcome: 'नमस्कार',
      welcomeSubtitle: 'आज काय वाढवायचे आहे? AI तुमची मदत करेल',
      online: 'ऑनलाइन',
      logout: 'लॉगआउट',
      farmSize: 'शेताचा आकार',
      currentSeason: 'सध्याचा हंगाम',
      successRate: 'यश दर',
      recentActivity: 'अलीकडील क्रियाकलाप',
      aiIntegration: 'AI इंटिग्रेशन पोर्ट',
      aiIntegrationText: 'बॅकएंड मॉडेल येथे: Gemini API सह क्रॉप रेकमेंडेशन AI मॉडेल इंटिग्रेट केले जाईल. सध्या डेमो डेटा दाखवला जात आहे.',
      tapToOpen: 'टॅप करा',
      toOpen: 'उघडण्यासाठी',
      cards: {
        recommendation: {
          title: 'फसल सिफारिश मिळवा',
          subtitle: 'AI सह सर्वोत्तम फसल निवडा'
        },
        history: {
          title: 'माझ्या मागील सिफारिशी',
          subtitle: 'मागील सुझाव पहा'
        },
        alerts: {
          title: 'अलर्ट आणि रिमाइंडर',
          subtitle: 'नवीन सूचना'
        },
        profile: {
          title: 'प्रोफाइल आणि सेटिंग्ज',
          subtitle: 'तुमची माहिती अपडेट करा'
        }
      }
    },
    gujarati: {
      appName: 'ક્રોપએઆઈ',
      appSubtitle: 'સ્માર્ટ ખેતી પ્લેટફોર્મ',
      welcome: 'નમસ્તે',
      welcomeSubtitle: 'આજે શું ઉગાડવું છે? AI તમારી મદદ કરશે',
      online: 'ઓનલાઇન',
      logout: 'લોગઆઉટ',
      farmSize: 'ખેતરનું કદ',
      currentSeason: 'વર્તમાન સીઝન',
      successRate: 'સફળતા દર',
      recentActivity: 'તાજેતરની પ્રવૃત્તિ',
      aiIntegration: 'AI ઇન્ટિગ્રેશન પોર્ટ',
      aiIntegrationText: 'બેકએન્ડ મોડેલ અહીં: Gemini API સાથે ક્રોપ રિકમેન્ડેશન AI મોડેલ ઇન્ટિગ્રેટ કરવામાં આવશે. હાલમાં ડેમો ડેટા પ્રદર્શિત કરવામાં આવી રહ્યો છે.',
      tapToOpen: 'ટેપ કરો',
      toOpen: 'ખોલવા માટે',
      cards: {
        recommendation: {
          title: 'ફસલની સિફારિશ મેળવો',
          subtitle: 'AI સાથે શ્રેષ્ઠ ફસલ પસંદ કરો'
        },
        history: {
          title: 'મારી પાછલી સિફારિશો',
          subtitle: 'પાછલા સૂચનો જુઓ'
        },
        alerts: {
          title: 'અલર્ટ અને રિમાઇન્ડર',
          subtitle: 'નવી સૂચનાઓ'
        },
        profile: {
          title: 'પ્રોફાઇલ અને સેટિંગ્સ',
          subtitle: 'તમારી માહિતી અપડેટ કરો'
        }
      }
    }
  };

  const t = translations[language] || translations.hindi;

  const dashboardCards = [
    {
      id: 'recommendation',
      title: t.cards.recommendation.title,
      subtitle: t.cards.recommendation.subtitle,
      icon: <Sprout className="w-8 h-8" />,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      route: '/recommendation-input'
    },
    {
      id: 'history',
      title: t.cards.history.title,
      subtitle: t.cards.history.subtitle,
      icon: <History className="w-8 h-8" />,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      route: '/recommendation-result'
    },
    {
      id: 'alerts',
      title: t.cards.alerts.title,
      subtitle: `${alerts.length} ${t.cards.alerts.subtitle}`,
      icon: <Bell className="w-8 h-8" />,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      route: '/alerts-reminders'
    },
    {
      id: 'profile',
      title: t.cards.profile.title,
      subtitle: t.cards.profile.subtitle,
      icon: <User className="w-8 h-8" />,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      route: '/profile'
    }
  ];

  const quickStats = [
    {
      label: t.farmSize,
      value: user.farmSize,
      icon: <MapPin className="w-5 h-5" />
    },
    {
      label: t.currentSeason,
      value: language === 'english' ? 'Rabi' : 'रबी',
      icon: <Calendar className="w-5 h-5" />
    },
    {
      label: t.successRate,
      value: '85%',
      icon: <TrendingUp className="w-5 h-5" />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <Sprout className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{t.appName}</h1>
                <p className="text-sm text-gray-600">{t.appSubtitle}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Language Switcher */}
              <LanguageSwitcher />
              
              {/* Online/Offline Status */}
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">{t.online}</span>
              </div>
              
              {/* Logout Button */}
              <button
                onClick={onLogout}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden sm:inline">{t.logout}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-white">
            <h2 className="text-3xl font-bold mb-2">
              {t.welcome}, {user.name}! 👋
            </h2>
            <p className="text-green-100 text-lg">
              {t.welcomeSubtitle}
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {quickStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-4 shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-xl font-bold text-gray-800">{stat.value}</p>
                </div>
                <div className="text-green-500">
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {dashboardCards.map((card) => (
            <div
              key={card.id}
              onClick={() => navigate(card.route)}
              className={`${card.bgColor} ${card.borderColor} border-2 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105`}
            >
              <div className="flex items-start space-x-4">
                <div className={`bg-gradient-to-r ${card.color} p-3 rounded-xl text-white`}>
                  {card.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {card.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {card.subtitle}
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <span>{t.tapToOpen}</span>
                    <div className="ml-2 w-1 h-1 bg-gray-400 rounded-full"></div>
                    <span>{t.toOpen}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            {t.recentActivity}
          </h3>
          <div className="space-y-4">
            {alerts.slice(0, 3).map((alert) => (
              <div key={alert.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className={`w-3 h-3 rounded-full ${
                  alert.priority === 'high' ? 'bg-red-500' : 'bg-yellow-500'
                }`}></div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{alert.title}</p>
                  <p className="text-sm text-gray-600">{alert.message}</p>
                </div>
                <span className="text-xs text-gray-500">
                  {new Date(alert.timestamp).toLocaleDateString('hi-IN')}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Integration Notice */}
        <div className="mt-8 bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
            <h4 className="font-bold text-yellow-800">{t.aiIntegration}</h4>
          </div>
          <p className="text-yellow-700 text-sm">
            {t.aiIntegrationText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;

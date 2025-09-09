import React from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import { useUser } from '../context/UserContext';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Sprout, Calendar, MapPin, Droplets, Sun, TrendingUp, AlertCircle } from 'lucide-react';

const CropDetail = () => {
  const { cropId } = useParams();
  const navigate = useNavigate();
  const { language } = useUser();

  const t = {
    hindi: {
      back: 'वापस जाएं',
      details: 'फसल का विवरण',
      season: 'मौसम',
      duration: 'अवधि',
      yield: 'उपज',
      water: 'पानी',
      temp: 'तापमान',
      soil: 'मिट्टी',
      timeline: 'खेती का समय',
      sowing: 'बुवाई का समय',
      harvest: 'कटाई का समय',
      varieties: 'उपयुक्त किस्में',
      benefits: 'फायदे',
      challenges: 'चुनौतियां',
      care: 'खेती के निर्देश',
      economics: 'आर्थिक जानकारी',
      marketPrice: 'बाजार कीमत',
      investment: 'निवेश',
      expectedProfit: 'अनुमानित लाभ',
      chooseCrop: 'इस फसल को चुनें',
      viewOthers: 'अन्य विकल्प देखें'
    },
    english: {
      back: 'Back',
      details: 'Crop Details',
      season: 'Season',
      duration: 'Duration',
      yield: 'Yield',
      water: 'Water',
      temp: 'Temperature',
      soil: 'Soil',
      timeline: 'Growing Timeline',
      sowing: 'Planting Time',
      harvest: 'Harvesting Time',
      varieties: 'Suitable Varieties',
      benefits: 'Benefits',
      challenges: 'Challenges',
      care: 'Care Instructions',
      economics: 'Economic Information',
      marketPrice: 'Market Price',
      investment: 'Investment',
      expectedProfit: 'Estimated Profit',
      chooseCrop: 'Choose this crop',
      viewOthers: 'View other options'
    },
    marathi: {
      back: 'परत जा',
      details: 'पीक तपशील',
      season: 'હંગામ',
      duration: 'कालावधी',
      yield: 'ઉત્પાદન',
      water: 'પાણી',
      temp: 'તાપમાન',
      soil: 'માટી',
      timeline: 'શેતીचा वेळ',
      sowing: 'પેરણીचा वेळ',
      harvest: 'કાપણીचा સમય',
      varieties: 'યોગ્ય વાણ',
      benefits: 'ફાયદે',
      challenges: 'આવહाने',
      care: 'શેતીचे निर्देश',
      economics: 'આર્થિક માહિતી',
      marketPrice: 'બજાર ભાવ',
      investment: 'ગુંતવણુક',
      expectedProfit: 'અનુમાનિત નફો',
      chooseCrop: 'હે પીક પસંદ કરો',
      viewOthers: 'ઇતર पर्याय पहा'
    },
    gujarati: {
      back: 'પાછા જાઓ',
      details: 'ફસલની વિગતો',
      season: 'મોસમ',
      duration: 'અવધિ',
      yield: 'ઉત્પાદન',
      water: 'પાણી',
      temp: 'તાપમાન',
      soil: 'માટી',
      timeline: 'ખેતી સમય',
      sowing: 'વાવણી સમય',
      harvest: 'કટાઈ સમય',
      varieties: 'યોગ્ય જાતો',
      benefits: 'ફાયદા',
      challenges: 'પડકારો',
      care: 'કાળજી સૂચનાઓ',
      economics: 'આર્થિક માહિતી',
      marketPrice: 'બજાર ભાવ',
      investment: 'રોકાણ',
      expectedProfit: 'અંદાજિત નફો',
      chooseCrop: 'આ ફસલ પસંદ કરો',
      viewOthers: 'અન્ય વિકલ્પો જુઓ'
    }
  }[language];

  // Mock crop detail data
  const cropDetails = {
    1: {
      name: 'गेहूं (Wheat)',
      scientificName: 'Triticum aestivum',
      description: 'गेहूं भारत की सबसे महत्वपूर्ण रबी फसल है। यह प्रोटीन का एक अच्छा स्रोत है और देश की खाद्य सुरक्षा में महत्वपूर्ण भूमिका निभाता है।',
      season: 'रबी (अक्टूबर-मार्च)',
      duration: '120-140 दिन',
      yield: '4.5-5.5 टन/हेक्टेयर',
      waterRequirement: 'मध्यम (500-600mm)',
      temperature: '15-25°C',
      soilType: 'दोमट मिट्टी सबसे उपयुक्त',
      plantingTime: 'नवंबर-दिसंबर',
      harvestingTime: 'मार्च-अप्रैल',
      varieties: ['HD-2967', 'HD-3086', 'PBW-343', 'DBW-17'],
      benefits: [
        'उच्च पोषण मूल्य',
        'अच्छी बाजार कीमत',
        'कम पानी की आवश्यकता',
        'विभिन्न जलवायु में उगाया जा सकता है'
      ],
      challenges: [
        'कीट और रोग प्रबंधन',
        'समय पर सिंचाई',
        'खरपतवार नियंत्रण',
        'भंडारण में सावधानी'
      ],
      careInstructions: [
        'बीज की गुणवत्ता का ध्यान रखें',
        'समय पर बुवाई करें',
        'संतुलित उर्वरक का प्रयोग करें',
        'नियमित सिंचाई करें',
        'कीट-रोग नियंत्रण करें'
      ],
      marketPrice: '₹2,200-2,500/क्विंटल',
      investment: '₹25,000-30,000/हेक्टेयर',
      expectedProfit: '₹40,000-50,000/हेक्टेयर'
    }
  };

  const crop = cropDetails[cropId] || cropDetails[1];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/recommendation-result')}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>{t.back}</span>
            </button>
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <Sprout className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{crop.name}</h1>
                <p className="text-sm text-gray-600">{crop.scientificName}</p>
              </div>
            </div>
            <div className="ml-auto"><LanguageSwitcher /></div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Overview Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">{t.details}</h2>
          <p className="text-gray-700 leading-relaxed">{crop.description}</p>
        </div>

        {/* Key Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm border">
            <div className="flex items-center space-x-3 mb-3">
              <Calendar className="w-5 h-5 text-blue-500" />
              <h3 className="font-bold text-gray-800">{t.season}</h3>
            </div>
            <p className="text-gray-600">{crop.season}</p>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border">
            <div className="flex items-center space-x-3 mb-3">
              <Calendar className="w-5 h-5 text-purple-500" />
              <h3 className="font-bold text-gray-800">{t.duration}</h3>
            </div>
            <p className="text-gray-600">{crop.duration}</p>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border">
            <div className="flex items-center space-x-3 mb-3">
              <TrendingUp className="w-5 h-5 text-green-500" />
              <h3 className="font-bold text-gray-800">{t.yield}</h3>
            </div>
            <p className="text-gray-600">{crop.yield}</p>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border">
            <div className="flex items-center space-x-3 mb-3">
              <Droplets className="w-5 h-5 text-blue-500" />
              <h3 className="font-bold text-gray-800">{t.water}</h3>
            </div>
            <p className="text-gray-600">{crop.waterRequirement}</p>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border">
            <div className="flex items-center space-x-3 mb-3">
              <Sun className="w-5 h-5 text-yellow-500" />
              <h3 className="font-bold text-gray-800">{t.temp}</h3>
            </div>
            <p className="text-gray-600">{crop.temperature}</p>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border">
            <div className="flex items-center space-x-3 mb-3">
              <MapPin className="w-5 h-5 text-orange-500" />
              <h3 className="font-bold text-gray-800">{t.soil}</h3>
            </div>
            <p className="text-gray-600">{crop.soilType}</p>
          </div>
        </div>

        {/* Growing Timeline */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">{t.timeline}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-green-700 mb-2">{t.sowing}</h4>
              <p className="text-gray-600">{crop.plantingTime}</p>
            </div>
            <div>
              <h4 className="font-bold text-orange-700 mb-2">{t.harvest}</h4>
              <p className="text-gray-600">{crop.harvestingTime}</p>
            </div>
          </div>
        </div>

        {/* Varieties */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">{t.varieties}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {crop.varieties.map((variety, index) => (
              <div key={index} className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                <span className="text-sm font-medium text-green-800">{variety}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits and Challenges */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border">
            <h3 className="text-xl font-bold text-green-700 mb-4">✅ {t.benefits}</h3>
            <ul className="space-y-3">
              {crop.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border">
            <h3 className="text-xl font-bold text-orange-700 mb-4">⚠️ {t.challenges}</h3>
            <ul className="space-y-3">
              {crop.challenges.map((challenge, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">{challenge}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Care Instructions */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">{t.care}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {crop.careInstructions.map((instruction, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-bold text-sm">{index + 1}</span>
                </div>
                <span className="text-gray-700">{instruction}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Economic Information */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-white mb-6">
          <h3 className="text-xl font-bold mb-4">{t.economics}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-bold mb-2">{t.marketPrice}</h4>
              <p className="text-green-100">{crop.marketPrice}</p>
            </div>
            <div>
              <h4 className="font-bold mb-2">{t.investment}</h4>
              <p className="text-green-100">{crop.investment}</p>
            </div>
            <div>
              <h4 className="font-bold mb-2">{t.expectedProfit}</h4>
              <p className="text-green-100">{crop.expectedProfit}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <button
            onClick={() => navigate('/recommendation-input')}
            className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 transition-colors"
          >
            {t.chooseCrop}
          </button>
          <button
            onClick={() => navigate('/recommendation-result')}
            className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            {t.viewOthers}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CropDetail;

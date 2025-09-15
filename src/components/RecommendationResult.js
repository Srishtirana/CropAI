import React, { useState, useEffect } from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sprout, TrendingUp, Calendar, Droplets, Sun, Cloud, Thermometer } from 'lucide-react';
import weatherService from '../services/weatherService';

const RecommendationResult = () => {
  const navigate = useNavigate();
  const { language } = useUser();
  const [recommendations, setRecommendations] = useState([]);
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState(null);

  const t = {
    hindi: {
      back: 'वापस जाएं',
      header: 'फसल सिफारिशें',
      subheader: 'AI द्वारा सुझाई गई फसलें',
      bestForYou: 'आपके लिए सर्वोत्तम फसलें',
      aiCount: (n) => `AI ने आपके खेत की स्थिति के आधार पर ${n} फसलों की सिफारिश की है`,
      confidence: 'विश्वसनीयता',
      estYield: 'अनुमानित उपज',
      season: 'मौसम',
      duration: 'अवधि',
      water: 'पानी',
      temp: 'तापमान',
      benefits: 'फायदे',
      challenges: 'चुनौतियां',
      viewDetail: 'विस्तार से देखें',
      save: 'सहेजें',
      needNew: 'नई सिफारिश चाहिए?',
      newHint: 'अगर आप अलग मापदंडों के साथ नई सिफारिश चाहते हैं',
      getNew: 'नई सिफारिश प्राप्त करें',
      weatherInfo: 'मौसम की जानकारी',
      loading: 'AI सिफारिशें लोड हो रही हैं...',
      kharif: 'खरीफ',
      rabi: 'रबी',
      zaid: 'ज़ायद',
      days: 'दिन',
      quintalsPerHectare: 'क्विंटल/हेक्टेयर',
      high: 'उच्च',
      medium: 'मध्यम',
      low: 'कम'
    },
    english: {
      back: 'Back',
      header: 'Crop Recommendations',
      subheader: 'AI suggested crops',
      bestForYou: 'Best crops for you',
      aiCount: (n) => `AI recommended ${n} crops based on your field conditions`,
      confidence: 'Confidence',
      estYield: 'Estimated Yield',
      season: 'Season',
      duration: 'Duration',
      water: 'Water',
      temp: 'Temperature',
      benefits: 'Benefits',
      challenges: 'Challenges',
      viewDetail: 'View Details',
      save: 'Save',
      needNew: 'Need a new recommendation?',
      newHint: 'Get a new recommendation with different parameters',
      getNew: 'Get New Recommendation',
      weatherInfo: 'Weather Information',
      loading: 'Loading AI recommendations...',
      kharif: 'Kharif',
      rabi: 'Rabi',
      zaid: 'Zaid',
      days: 'days',
      quintalsPerHectare: 'quintals/hectare',
      high: 'High',
      medium: 'Medium',
      low: 'Low'
    },
    marathi: {
      back: 'परत जा',
      header: 'पीक शिफारसी',
      subheader: 'AI ने सुचवलेले पीक',
      bestForYou: 'तुमच्यासाठी सर्वोत्तम पीक',
      aiCount: (n) => `AI ने तुमच्या शेताच्या स्थितीवर आधारित ${n} पीक सुचवले आहेत`,
      confidence: 'विश्वास',
      estYield: 'अनुमानित उत्पादन',
      season: 'हंगाम',
      duration: 'कालावधी',
      water: 'पाणी',
      temp: 'तापमान',
      benefits: 'फायदे',
      challenges: 'आव्हाने',
      viewDetail: 'तपशील पहा',
      save: 'जतन करा',
      needNew: 'नवीन शिफारस हवी?',
      newHint: 'वेगळ्या निकषांसह नवीन शिफारस मिळवा',
      getNew: 'नवीन शिफारस मिळवा',
      weatherInfo: 'हवामान माहिती',
      loading: 'AI शिफारसी लोड होत आहेत...',
      kharif: 'खरीप',
      rabi: 'रब्बी',
      zaid: 'झायद',
      days: 'दिवस',
      quintalsPerHectare: 'क्विंटल/हेक्टर',
      high: 'उच्च',
      medium: 'मध्यम',
      low: 'कमी'
    },
    gujarati: {
      back: 'પાછા જાઓ',
      header: 'ફસલ ભલામણો',
      subheader: 'AI દ્વારા સૂચવેલ ફસલો',
      bestForYou: 'તમારા માટે શ્રેષ્ઠ ફસલો',
      aiCount: (n) => `AI એ તમારા ખેતરની સ્થિતિ પર આધારિત ${n} ફસલો ભલામણ કર્યા છે`,
      confidence: 'વિશ્વાસ',
      estYield: 'અંદાજિત ઉત્પાદન',
      season: 'મોસમ',
      duration: 'અવધિ',
      water: 'પાણી',
      temp: 'તાપમાન',
      benefits: 'ફાયદા',
      challenges: 'પડકારો',
      viewDetail: 'વિગતો જુઓ',
      save: 'સેવ કરો',
      needNew: 'નવી ભલામણ જોઈએ?',
      newHint: 'અલગ પરિમાણો સાથે નવી ભલામણ મેળવો',
      getNew: 'નવી ભલામણ મેળવો',
      weatherInfo: 'હવામાન માહિતી',
      loading: 'AI ભલામણો લોડ થઈ રહી છે...',
      kharif: 'ખરીફ',
      rabi: 'રબી',
      zaid: 'ઝાયદ',
      days: 'દિવસ',
      quintalsPerHectare: 'ક્વિન્ટલ/હેક્ટર',
      high: 'ઊંચું',
      medium: 'મધ્યમ',
      low: 'ઓછું'
    }
  }[language];

  // Load recommendations on component mount
  useEffect(() => {
    const loadRecommendations = async () => {
      try {
        // Get stored form data from localStorage
        const storedData = localStorage.getItem('cropRecommendationData');
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setFormData(parsedData);
          
          // Use mock data for recommendations
          const mockRecommendations = [
            {
              name: 'Wheat',
              confidence: 85,
              yield: '40-50',
              season: language === 'hindi' ? 'रबी' : language === 'marathi' ? 'रबी' : language === 'gujarati' ? 'રબી' : 'Rabi',
              duration: '120-150',
              water: 'Medium',
              temperature: '20-25°C',
              benefits: language === 'hindi' ? ['उच्च पैदावार', 'कम रखरखाव'] : language === 'marathi' ? ['उच्च उत्पादन', 'कमी देखभाल'] : language === 'gujarati' ? ['ઊંચી ઉપજ', 'ઓછી જાળવણી'] : ['High yield', 'Low maintenance'],
              challenges: language === 'hindi' ? ['कीटों का प्रकोप', 'पानी की आवश्यकता'] : language === 'marathi' ? ['कीटांचा त्रास', 'पाण्याची गरज'] : language === 'gujarati' ? ['કીટકોનો ત્રાસ', 'પાણીની જરૂરિયાત'] : ['Pest attacks', 'Water requirement']
            },
            {
              name: 'Rice',
              confidence: 75,
              yield: '45-55',
              season: language === 'hindi' ? 'खरीफ' : language === 'marathi' ? 'खरीप' : language === 'gujarati' ? 'ખરીફ' : 'Kharif',
              duration: '150-180',
              water: 'High',
              temperature: '25-35°C',
              benefits: language === 'hindi' ? ['उच्च मांग', 'अच्छी कीमत'] : language === 'marathi' ? ['जास्त मागणी', 'चांगला भाव'] : language === 'gujarati' ? ['ઊંચી માંગ', 'સારી કિંમત'] : ['High demand', 'Good price'],
              challenges: language === 'hindi' ? ['ज्यादा पानी की आवश्यकता', 'जलभराव'] : language === 'marathi' ? ['जास्त पाण्याची गरज', 'पाण्याचा साठा'] : language === 'gujarati' ? ['વધુ પાણીની જરૂરિયાત', 'પાણીનો સંગ્રહ'] : ['More water requirement', 'Water logging']
            }
          ];
          
          // Get weather data
          const weatherResponse = await weatherService.getWeatherByLocation(parsedData.location);
          
          setRecommendations(mockRecommendations);
          setWeatherData(weatherResponse);
        } else {
          // Fallback to mock data if no form data
          setRecommendations(mockRecommendations);
        }
      } catch (error) {
        console.error('Error loading recommendations:', error);
        setRecommendations(mockRecommendations);
      } finally {
        setIsLoading(false);
      }
    };

    loadRecommendations();
  }, []);

  // Mock recommendation data with translations for fallback
  const mockRecommendations = [
    {
      id: 1,
      confidence: 92,
      temperature: '15-25°C',
      hi: {
        crop: 'गेहूं (Wheat)',
        yield: '4.5 टन/हेक्टेयर',
        season: 'रबी',
        duration: '120-140 दिन',
        water: 'मध्यम',
        description: 'आपके क्षेत्र के लिए गेहूं सबसे उपयुक्त फसल है। यह अच्छी उपज देगी।',
        benefits: ['उच्च उपज', 'कम पानी की आवश्यकता', 'अच्छी बाजार कीमत'],
        challenges: ['कीट प्रबंधन', 'समय पर सिंचाई']
      },
      en: {
        crop: 'Wheat',
        yield: '4.5 tons/hectare',
        season: 'Rabi',
        duration: '120-140 days',
        water: 'Medium',
        description: 'Wheat is most suitable for your region and will yield well.',
        benefits: ['High yield', 'Low water requirement', 'Good market price'],
        challenges: ['Pest management', 'Timely irrigation']
      }
    },
    {
      id: 2,
      confidence: 85,
      temperature: '18-28°C',
      hi: {
        crop: 'सरसों (Mustard)',
        yield: '2.8 टन/हेक्टेयर',
        season: 'रबी',
        duration: '90-110 दिन',
        water: 'कम',
        description: 'सरसों भी एक अच्छा विकल्प है, विशेषकर तेल के लिए।',
        benefits: ['तेल उत्पादन', 'कम लागत', 'अच्छी आय'],
        challenges: ['कीट नियंत्रण', 'फसल कटाई']
      },
      en: {
        crop: 'Mustard',
        yield: '2.8 tons/hectare',
        season: 'Rabi',
        duration: '90-110 days',
        water: 'Low',
        description: 'Mustard is also a good option, especially for oil.',
        benefits: ['Oil production', 'Low cost', 'Good income'],
        challenges: ['Pest control', 'Harvesting']
      }
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/dashboard')}
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
                <h1 className="text-2xl font-bold text-gray-800">{t.header}</h1>
                <p className="text-sm text-gray-600">{t.subheader}</p>
              </div>
            </div>
            <div className="ml-auto"><LanguageSwitcher /></div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Summary Card */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-white mb-8">
          <h2 className="text-2xl font-bold mb-2">{t.bestForYou}</h2>
          <p className="text-green-100">{t.aiCount(recommendations.length)}</p>
        </div>

        {/* Weather Information */}
        {weatherData && (
          <div className="bg-blue-50 rounded-2xl p-6 mb-6 border border-blue-200">
            <div className="flex items-center space-x-3 mb-4">
              <Cloud className="w-6 h-6 text-blue-600" />
              <h3 className="text-lg font-semibold text-blue-800">{t.weatherInfo}</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center space-x-2">
                <Thermometer className="w-4 h-4 text-red-500" />
                <span className="text-sm text-gray-700">{weatherData.temperature}°C</span>
              </div>
              <div className="flex items-center space-x-2">
                <Droplets className="w-4 h-4 text-blue-500" />
                <span className="text-sm text-gray-700">{weatherData.humidity}%</span>
              </div>
              <div className="flex items-center space-x-2">
                <Cloud className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-700">{weatherData.description}</span>
              </div>
              <div className="text-sm text-gray-700">{weatherData.location}</div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">{t.loading}</p>
          </div>
        ) : (
          /* Recommendations */
          <div className="space-y-6">
            {recommendations.map((rec, index) => {
              // Handle both new AI format and old mock format
              const cropData = rec.cropName ? {
                crop: rec.cropName,
                yield: rec.yield,
                season: rec.season || 'N/A',
                duration: rec.duration || 'N/A',
                water: rec.waterRequirement || 'N/A',
                description: rec.reason,
                benefits: rec.careInstructions || [],
                challenges: rec.riskFactors || []
              } : (language === 'english' ? rec.en : rec.hi);
              
              return (
              <div key={rec.id || index} className="bg-white rounded-2xl p-6 shadow-sm border">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="bg-green-100 p-3 rounded-xl">
                    <Sprout className="w-8 h-8 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">{cropData.crop}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="flex items-center space-x-1">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-600">{rec.matchScore || rec.confidence || 85}% {t.confidence}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">
                    {cropData.yield.includes('quintals') || cropData.yield.includes('क्विंटल') ? 
                      cropData.yield : 
                      `${cropData.yield.split(' ')[0]} ${t.quintalsPerHectare}`
                    }
                  </div>
                  <div className="text-sm text-gray-600">{t.estYield}</div>
                </div>
              </div>

              <p className="text-gray-700 mb-6">{cropData.description}</p>

              {/* Details Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-1">
                    <Calendar className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-medium text-gray-700">{t.season}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {cropData.season === 'kharif' ? t.kharif :
                     cropData.season === 'rabi' ? t.rabi :
                     cropData.season === 'zaid' ? t.zaid :
                     cropData.season}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-1">
                    <Calendar className="w-4 h-4 text-purple-500" />
                    <span className="text-sm font-medium text-gray-700">{t.duration}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {cropData.duration.includes('days') || cropData.duration.includes('दिन') ? 
                      cropData.duration : 
                      `${cropData.duration} ${t.days}`}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-1">
                    <Droplets className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-medium text-gray-700">{t.water}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {cropData.water === 'high' ? t.high :
                     cropData.water === 'medium' ? t.medium :
                     cropData.water === 'low' ? t.low :
                     cropData.water}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-1">
                    <Sun className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-medium text-gray-700">{t.temp}</span>
                  </div>
                  <div className="text-sm text-gray-600">{weatherData?.temperature || '20-30'}°C</div>
                </div>
              </div>

              {/* Benefits and Challenges */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-green-700 mb-3">✅ {t.benefits}</h4>
                  <ul className="space-y-2">
                    {cropData.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-center space-x-2 text-sm text-gray-700">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-orange-700 mb-3">⚠️ {t.challenges}</h4>
                  <ul className="space-y-2">
                    {cropData.challenges.map((challenge, idx) => (
                      <li key={idx} className="flex items-center space-x-2 text-sm text-gray-700">
                        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                        <span>{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => navigate(`/crop-detail/${rec.id || index}`)}
                  className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  {t.viewDetail}
                </button>
                <button className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                  {t.save}
                </button>
              </div>
            </div>
            );
          })}
          </div>
        )}

        {/* Get New Recommendation */}
        <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm border">
          <h3 className="text-xl font-bold text-gray-800 mb-4">{t.needNew}</h3>
          <p className="text-gray-600 mb-4">{t.newHint}</p>
          <button
            onClick={() => navigate('/recommendation-input')}
            className="bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            {t.getNew}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecommendationResult;

import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useDiagnosis } from '../context/DiagnosisContext';
import ImageUploader from './ImageUploader';
import DiagnosisHistory from './DiagnosisHistory';
import { 
  ArrowLeft, 
  Loader2, 
  AlertCircle, 
  CheckCircle, 
  Droplets, 
  Thermometer, 
  Cloud, 
  Sun,
  History,
  Lightbulb,
  AlertTriangle,
  SearchCheck
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';

// Form validation schema
const diagnosisSchema = yup.object().shape({
  cropType: yup.string().required('Crop type is required'),
  growthStage: yup.string().required('Growth stage is required'),
  soilType: yup.string().required('Soil type is required'),
  location: yup.string().required('Location is required')
});

const CropDiagnosis = () => {
  const { language, user } = useUser();
  const { addDiagnosis, findSimilar } = useDiagnosis();
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [similarDiagnoses, setSimilarDiagnoses] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(diagnosisSchema)
  });

  // Load weather data on component mount
  useEffect(() => {
    const loadWeatherData = async () => {
      try {
        // In a real app, you would call a weather API here
        setWeatherData({
          temperature: '25°C',
          humidity: '65%',
          conditions: 'Partly Cloudy',
          uvIndex: '5'
        });
      } catch (error) {
        console.error('Error loading weather data:', error);
      }
    };
    
    loadWeatherData();
  }, []);

  const handleImageUpload = (file) => {
    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setPreviewUrl('');
  };

  const analyzeImage = async (data) => {
    if (!imageFile) {
      toast.error('Please upload an image first');
      return;
    }

    setIsAnalyzing(true);
    setError('');

    try {
      // In a real app, you would call your API here
      // For now, we'll use a mock response
      const mockResult = {
        id: Date.now(),
        disease: 'Leaf Rust',
        confidence: '85%',
        description: 'A fungal disease that affects the leaves of the plant.',
        treatment: 'Apply fungicide and remove affected leaves.',
        severity: 'Moderate',
        timestamp: new Date().toISOString(),
        imageUrl: previewUrl,
        cropType: data.cropType,
        growthStage: data.growthStage
      };

      setResult(mockResult);
      
      // Add to diagnosis history
      if (user) {
        await addDiagnosis({
          ...mockResult,
          userId: user.id,
          location: data.location,
          soilType: data.soilType
        });
      }
      
      // Find similar diagnoses
      const similar = await findSimilar({
        disease: mockResult.disease,
        cropType: data.cropType
      });
      setSimilarDiagnoses(similar || []);
      
    } catch (err) {
      console.error('Error analyzing image:', err);
      setError('Failed to analyze image. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFeedback = async (diagnosisId, isHelpful) => {
    try {
      // In a real app, you would send this feedback to your backend
      console.log(`Feedback for diagnosis ${diagnosisId}:`, isHelpful ? 'helpful' : 'not helpful');
      toast.success('Thank you for your feedback!');
    } catch (err) {
      console.error('Error submitting feedback:', err);
      toast.error('Failed to submit feedback. Please try again.');
    }
  };

  const toggleHistory = () => {
    setShowHistory(!showHistory);
  };

  // Translation function
  const t = (key) => {
    const translations = {
      // Navigation
      'diagnosis': {
        english: 'Diagnosis',
        hindi: 'निदान',
        marathi: 'निदान',
        gujarati: 'રોગનિદાન'
      },
      'history': {
        english: 'History',
        hindi: 'इतिहास',
        marathi: 'इतिहास',
        gujarati: 'ઇતિહાસ'
      },
      'viewHistory': {
        english: 'View History',
        hindi: 'इतिहास देखें',
        marathi: 'इतिहास पहा',
        gujarati: 'ઇતિહાસ જુઓ'
      },
      'newDiagnosis': {
        english: 'New Diagnosis',
        hindi: 'नया निदान',
        marathi: 'नवीन निदान',
        gujarati: 'નવું નિદાન'
      },
      'result': {
        english: 'Result',
        hindi: 'परिणाम',
        marathi: 'परिणाम',
        gujarati: 'પરિણામ'
      },
      'identifiedIssue': {
        english: 'Identified Issue',
        hindi: 'पहचानी गई समस्या',
        marathi: 'ओळखलेली समस्या',
        gujarati: 'ઓળખાયેલી સમસ્યા'
      },
      'similarPastCases': {
        english: 'Similar Past Cases',
        hindi: 'पिछले समान मामले',
        marathi: 'मागील तत्सम प्रकरणे',
        gujarati: 'સમાન ભૂતકાળના કેસો'
      },
      'recommendations': {
        english: 'Recommendations',
        hindi: 'सिफारिशें',
        marathi: 'शिफारसी',
        gujarati: 'ભલામણો'
      },
      'severity': {
        english: 'Severity',
        hindi: 'गंभीरता',
        marathi: 'गंभीरता',
        gujarati: 'ગંભીરતા'
      },
      'treatment': {
        english: 'Treatment',
        hindi: 'उपचार',
        marathi: 'उपचार',
        gujarati: 'ઉપચાર'
      },
      'confidence': {
        english: 'Confidence',
        hindi: 'विश्वास',
        marathi: 'आत्मविश्वास',
        gujarati: 'આત્મવિશ્વાસ'
      },
      'weatherConditions': {
        english: 'Weather Conditions',
        hindi: 'मौसम की स्थिति',
        marathi: 'हवामान परिस्थिती',
        gujarati: 'હવામાનની સ્થિતિ'
      },
      'temperature': {
        english: 'Temperature',
        hindi: 'तापमान',
        marathi: 'तापमान',
        gujarati: 'તાપમાન'
      },
      'humidity': {
        english: 'Humidity',
        hindi: 'नमी',
        marathi: 'आर्द्रता',
        gujarati: 'આર્દ્રતા'
      },
      'conditions': {
        english: 'Conditions',
        hindi: 'स्थितियां',
        marathi: 'परिस्थिती',
        gujarati: 'પરિસ્થિતિઓ'
      },
      'uvIndex': {
        english: 'UV Index',
        hindi: 'यूवी सूचकांक',
        marathi: 'यूव्ही निर्देशांक',
        gujarati: 'યુવી ઇન્ડેક્સ'
      },
      'weatherDataNotAvailable': {
        english: 'Weather data not available',
        hindi: 'मौसम का डेटा उपलब्ध नहीं है',
        marathi: 'हवामान डेटा उपलब्ध नाही',
        gujarati: 'હવામાનનો ડેટા ઉપલબ્ધ નથી'
      },
      'title': {
        english: 'Crop Health Diagnosis',
        hindi: 'फसल स्वास्थ्य निदान',
        marathi: 'पीक आरोग्य निदान',
        gujarati: 'કર્પ સ્વાસ્થ્ય નિદાન'
      },
      'subtitle': {
        english: 'Upload an image of your crop to diagnose any health issues.',
        hindi: 'किसी भी स्वास्थ्य समस्या का निदान करने के लिए अपनी फसल की एक छवि अपलोड करें।',
        marathi: 'कोणत्याही आरोग्य समस्येचे निदान करण्यासाठी आपल्या पिकाची प्रतिमा अपलोड करा.',
        gujarati: 'કોઈપણ આરોગ્ય સમસ્યાનું નિદાન કરવા માટે તમારી પાકની છબી અપલોડ કરો.'
      },
      'formTitle': {
        english: 'Crop Information',
        hindi: 'फसल की जानकारी',
        marathi: 'पीक माहिती',
        gujarati: 'પાકની માહિતી'
      },
      'cropType': {
        english: 'Crop Type',
        hindi: 'फसल का प्रकार',
        marathi: 'पिकाचा प्रकार',
        gujarati: 'પાકનો પ્રકાર'
      },
      'growthStage': {
        english: 'Growth Stage',
        hindi: 'विकास का चरण',
        marathi: 'वाढीचा टप्पा',
        gujarati: 'વિકાસનો તબક્કો'
      },
      'soilType': {
        english: 'Soil Type',
        hindi: 'मिट्टी का प्रकार',
        marathi: 'मातीचा प्रकार',
        gujarati: 'માટીનો પ્રકાર'
      },
      'location': {
        english: 'Location',
        hindi: 'स्थान',
        marathi: 'स्थान',
        gujarati: 'સ્થાન'
      },
      'submit': {
        english: 'Submit',
        hindi: 'जमा करें',
        marathi: 'सबमिट करा',
        gujarati: 'સબમિટ કરો'
      },
      'analyzing': {
        english: 'Analyzing...',
        hindi: 'विश्लेषण किया जा रहा है...',
        marathi: 'विश्लेषण करत आहे...',
        gujarati: 'વિશ્લેષણ થાય છે...'
      },
      'helpful': {
        english: 'Helpful',
        hindi: 'मददगार',
        marathi: 'उपयुक्त',
        gujarati: 'મદદરૂપ'
      },
      'notHelpful': {
        english: 'Not Helpful',
        hindi: 'मददगार नहीं',
        marathi: 'उपयुक्त नाही',
        gujarati: 'મદદરૂપ નથી'
      }
    };

    const keys = key.split('.');
    let value = translations;
    
    for (const k of keys) {
      if (value[k] === undefined) return key;
      value = value[k];
    }
    
    return value[language] || value.english || key;
  };

  // Crop options
  const cropOptions = {
    english: ['Wheat', 'Rice', 'Corn', 'Soybean', 'Cotton', 'Potato', 'Tomato', 'Other'],
    hindi: ['गेहूं', 'चावल', 'मक्का', 'सोयाबीन', 'कपास', 'आलू', 'टमाटर', 'अन्य'],
    marathi: ['गहू', 'तांदूळ', 'मका', 'सोयाबीन', 'कापूस', 'बटाटा', 'टोमॅटो', 'इतर'],
    gujarati: ['ઘઉં', 'ચોખા', 'મકાઈ', 'સોયાબીન', 'કપાસ', 'બટાટા', 'ટામેટા', 'અન્ય']
  };

  // Growth stage options
  const growthStageOptions = {
    english: ['Seedling', 'Vegetative', 'Flowering', 'Fruiting', 'Mature', 'Harvest'],
    hindi: ['अंकुरण', 'वानस्पतिक', 'फूल आना', 'फल लगना', 'परिपक्व', 'कटाई'],
    marathi: ['अंकुरण', 'वनस्पतीची वाढ', 'फुलोरा', 'फळे येणे', 'परिपक्व', 'कापणी'],
    gujarati: ['અંકુરણ', 'વનસ્પતિ', 'ફૂલો આવવા', 'ફળ આવવું', 'પરિપક્વ', 'કાપણી']
  };

  // Soil type options
  const soilTypeOptions = {
    english: ['Loamy', 'Sandy', 'Clay', 'Silt', 'Peaty', 'Chalky', 'Saline'],
    hindi: ['दोमट', 'बलुई', 'चिकनी', 'गाद', 'पीट', 'चूना युक्त', 'नमकीन'],
    marathi: ['चिकणमाती', 'वाळूची जमीन', 'चिकणमाती', 'गाळ', 'पीट', 'खडूदार', 'खारट'],
    gujarati: ['ચિકણી', 'રેતાળ', 'માટી', 'ગાદી', 'પીટ', 'ચૂનાળા', 'ખારા']
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-5 w-5 mr-1" />
            Back
          </button>
          
          <button
            onClick={toggleHistory}
            className={`flex items-center px-4 py-2 rounded-md ${
              showHistory 
                ? 'bg-green-100 text-green-800' 
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            <History className="h-5 w-5 mr-2" />
            {showHistory ? t('diagnosis') : t('history')}
          </button>
        </div>
        
        {showHistory ? (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                <History className="inline-block h-5 w-5 mr-2 text-green-600" />
                {t('history')}
              </h2>
              <DiagnosisHistory />
            </div>
          </div>
        ) : (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">
                <SearchCheck className="inline-block h-6 w-6 mr-2 text-green-600" />
                {t('diagnosis')}
              </h1>
              
              {!result ? (
                <div className="space-y-6">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">{t('title')}</h1>
                    <p className="text-gray-600">{t('subtitle')}</p>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <ImageUploader
                      onImageUpload={handleImageUpload}
                      onRemoveImage={handleRemoveImage}
                      previewUrl={previewUrl}
                      className="w-full h-64 mb-6"
                    />
                    
                    <form onSubmit={handleSubmit(analyzeImage)} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {t('cropType')} <span className="text-red-500">*</span>
                        </label>
                        <select
                          {...register('cropType')}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                        >
                          <option value="">-- {t('select')} --</option>
                          {cropOptions[language]?.map((crop, index) => (
                            <option key={index} value={crop}>
                              {crop} ({cropOptions.english[index]})
                            </option>
                          ))}
                        </select>
                        {errors.cropType && (
                          <p className="mt-1 text-sm text-red-600">{errors.cropType.message}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {t('growthStage')} <span className="text-red-500">*</span>
                        </label>
                        <select
                          {...register('growthStage')}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                        >
                          <option value="">-- {t('select')} --</option>
                          {growthStageOptions[language]?.map((stage, index) => (
                            <option key={index} value={stage}>
                              {stage} ({growthStageOptions.english[index]})
                            </option>
                          ))}
                        </select>
                        {errors.growthStage && (
                          <p className="mt-1 text-sm text-red-600">{errors.growthStage.message}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {t('soilType')} <span className="text-red-500">*</span>
                        </label>
                        <select
                          {...register('soilType')}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                        >
                          <option value="">-- {t('select')} --</option>
                          {soilTypeOptions[language]?.map((soil, index) => (
                            <option key={index} value={soil}>
                              {soil} ({soilTypeOptions.english[index]})
                            </option>
                          ))}
                        </select>
                        {errors.soilType && (
                          <p className="mt-1 text-sm text-red-600">{errors.soilType.message}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {t('location')} <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          {...register('location')}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                          placeholder={language === 'hindi' ? 'आपका स्थान' : language === 'marathi' ? 'तुमचे स्थान' : language === 'gujarati' ? 'તમારું સ્થાન' : 'Your location'}
                        />
                        {errors.location && (
                          <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
                        )}
                      </div>
                      
                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={isAnalyzing}
                          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isAnalyzing ? (
                            <>
                              <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" />
                              {t('analyzing')}
                            </>
                          ) : (
                            t('submit')
                          )}
                        </button>
                      </div>
                    </form>
                    
                    {error && (
                      <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-500">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <AlertCircle className="h-5 w-5 text-red-500" />
                          </div>
                          <div className="ml-3">
                            <p className="text-sm text-red-700">{error}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="px-6 py-5 border-b border-gray-200">
                      <h2 className="text-xl font-semibold text-gray-900">
                        {t('diagnosis')} {t('result')}
                      </h2>
                    </div>
                    
                    <div className="p-6">
                      <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6 rounded-r">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          </div>
                          <div className="ml-3">
                            <h3 className="text-sm font-medium text-green-800">
                              {t('identifiedIssue')}: {result.disease}
                            </h3>
                            <div className="mt-2 text-sm text-green-700">
                              <p>{result.description}</p>
                            </div>
                            <div className="mt-4">
                              <div className="text-sm text-green-700">
                                <p className="font-medium">{t('severity')}: {result.severity}</p>
                                <p className="mt-1">{t('confidence')}: {result.confidence}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-3">{t('treatment')}</h3>
                        <div className="bg-gray-50 p-4 rounded-md">
                          <p className="text-gray-700">{result.treatment}</p>
                        </div>
                      </div>
                      
                      {similarDiagnoses.length > 0 && (
                        <div className="mb-6">
                          <h3 className="text-lg font-medium text-gray-900 mb-3">
                            {t('similarPastCases')}
                          </h3>
                          <div className="space-y-3">
                            {similarDiagnoses.map((diagnosis, index) => (
                              <div key={index} className="bg-gray-50 p-4 rounded-md border border-gray-200">
                                <p className="font-medium text-gray-900">{diagnosis.disease}</p>
                                <p className="text-sm text-gray-600">{diagnosis.description}</p>
                                <p className="text-xs text-gray-500 mt-1">
                                  {new Date(diagnosis.timestamp).toLocaleDateString()}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div className="mt-8 pt-6 border-t border-gray-200">
                        <h3 className="text-sm font-medium text-gray-900 mb-3">
                          {t('wasThisHelpful')}
                        </h3>
                        <div className="flex space-x-3">
                          <button
                            type="button"
                            onClick={() => handleFeedback(result.id, true)}
                            className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                          >
                            <CheckCircle className="-ml-0.5 mr-1.5 h-4 w-4" />
                            {t('helpful')}
                          </button>
                          <button
                            type="button"
                            onClick={() => handleFeedback(result.id, false)}
                            className="inline-flex items-center px-3 py-1.5 border border-gray-300 bg-white text-sm font-medium rounded-md text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                          >
                            <AlertTriangle className="-ml-0.5 mr-1.5 h-4 w-4 text-yellow-500" />
                            {t('notHelpful')}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="px-6 py-5 border-b border-gray-200">
                      <h2 className="text-lg font-medium text-gray-900">
                        {t('weatherConditions')}
                      </h2>
                    </div>
                    
                    <div className="p-6">
                      {weatherData ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center">
                              <Thermometer className="h-5 w-5 text-red-400 mr-2" />
                              <span className="text-sm font-medium text-gray-900">
                                {t('temperature')}
                              </span>
                            </div>
                            <p className="mt-1 text-2xl font-semibold text-gray-900">
                              {weatherData.temperature}
                            </p>
                          </div>
                          
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center">
                              <Droplets className="h-5 w-5 text-blue-400 mr-2" />
                              <span className="text-sm font-medium text-gray-900">
                                {t('humidity')}
                              </span>
                            </div>
                            <p className="mt-1 text-2xl font-semibold text-gray-900">
                              {weatherData.humidity}
                            </p>
                          </div>
                          
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center">
                              <Cloud className="h-5 w-5 text-gray-400 mr-2" />
                              <span className="text-sm font-medium text-gray-900">
                                {t('conditions')}
                              </span>
                            </div>
                            <p className="mt-1 text-lg font-medium text-gray-900">
                              {weatherData.conditions}
                            </p>
                          </div>
                          
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center">
                              <Sun className="h-5 w-5 text-yellow-400 mr-2" />
                              <span className="text-sm font-medium text-gray-900">
                                {t('uvIndex')}
                              </span>
                            </div>
                            <p className="mt-1 text-2xl font-semibold text-gray-900">
                              {weatherData.uvIndex}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500">{t('weatherDataNotAvailable')}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={toggleHistory}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      <History className="-ml-1 mr-2 h-5 w-5 text-gray-500" />
                      {t('viewHistory')}
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => {
                        setResult(null);
                        setImageFile(null);
                        setPreviewUrl('');
                        setSimilarDiagnoses([]);
                      }}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      {t('newDiagnosis')}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CropDiagnosis;

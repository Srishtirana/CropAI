import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDiagnosis } from '../context/DiagnosisContext';
import { CheckCircle, AlertTriangle, ChevronLeft, Download } from 'lucide-react';
import { format } from 'date-fns';
import { saveAs } from 'file-saver';

const DetailedRecommendation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getDiagnosisById } = useDiagnosis();
  const [diagnosis, setDiagnosis] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    // Update time every minute
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    
    // Fetch diagnosis data
    const fetchData = async () => {
      try {
        const data = await getDiagnosisById(id);
        setDiagnosis(data);
        await fetchWeatherData(data?.location);
      } catch (error) {
        console.error('Error fetching diagnosis:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    return () => clearInterval(timer);
  }, [id, getDiagnosisById]);

  const fetchWeatherData = async (location) => {
    try {
      // Replace with actual weather API call
      // const response = await fetch(`/api/weather?location=${location}`);
      // const data = await response.json();
      // setWeather(data);
      
      // Mock data for now
      setWeather({
        temperature: 28,
        condition: 'Sunny',
        humidity: 65,
        windSpeed: 12,
        icon: '☀️'
      });
    } catch (error) {
      console.error('Error fetching weather:', error);
    }
  };

  const handleDownload = () => {
    const content = `Crop Diagnosis Report\n\n` +
      `Date: ${format(new Date(diagnosis.timestamp), 'PPpp')}\n` +
      `Crop: ${diagnosis.cropType}\n` +
      `Issue: ${diagnosis.issue}\n\n` +
      `Recommendations:\n${diagnosis.recommendations.map((r, i) => `${i + 1}. ${r}`).join('\n')}\n\n` +
      `Prevention Tips:\n${diagnosis.preventionTips?.join('\n') || 'N/A'}`;
    
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, `crop-diagnosis-${diagnosis.id}.txt`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (!diagnosis) {
    return (
      <div className="p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Diagnosis not found
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-green-600 hover:text-green-800 mb-6"
      >
        <ChevronLeft className="mr-1" /> Back to History
      </button>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Diagnosis Details</h1>
            <p className="text-gray-600">
              {format(new Date(diagnosis.timestamp), 'PPPPpppp')}
            </p>
          </div>
          <button
            onClick={handleDownload}
            className="flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            <Download className="mr-2 h-4 w-4" />
            Download Report
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-700 mb-2">Crop Information</h3>
            <p><span className="font-medium">Type:</span> {diagnosis.cropType || 'N/A'}</p>
            <p><span className="font-medium">Variety:</span> {diagnosis.variety || 'N/A'}</p>
            <p><span className="font-medium">Growth Stage:</span> {diagnosis.growthStage || 'N/A'}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-700 mb-2">Current Conditions</h3>
            {weather ? (
              <>
                <div className="flex items-center text-2xl mb-2">
                  <span className="mr-2">{weather.icon}</span>
                  <span>{weather.temperature}°C</span>
                </div>
                <p>{weather.condition}</p>
                <p>Humidity: {weather.humidity}%</p>
                <p>Wind: {weather.windSpeed} km/h</p>
              </>
            ) : (
              <p>Loading weather data...</p>
            )}
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-700 mb-2">Diagnosis Summary</h3>
            <div className="flex items-center mb-2">
              {diagnosis.confidence > 70 ? (
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
              )}
              <span>Confidence: {diagnosis.confidence}%</span>
            </div>
            <p className="font-medium">Identified Issue:</p>
            <p>{diagnosis.issue || 'No specific issue detected'}</p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Recommendations</h2>
          <div className="space-y-4">
            {diagnosis.recommendations?.length > 0 ? (
              diagnosis.recommendations.map((rec, index) => (
                <div key={index} className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-full mr-3 mt-1">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <p className="text-gray-700">{rec}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No specific recommendations available.</p>
            )}
          </div>
        </div>

        {diagnosis.preventionTips?.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Prevention Tips</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              {diagnosis.preventionTips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailedRecommendation;

import { useState, useEffect } from 'react';
import { getWeatherByCoords, getLocationName } from '../services/weather/weatherService';

const useLocation = () => {
  const [location, setLocation] = useState({
    coords: null,
    placeName: '',
    weather: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;

    const fetchLocationAndWeather = async (position) => {
      try {
        const { latitude, longitude } = position.coords;
        const [weatherData, placeName] = await Promise.all([
          getWeatherByCoords(latitude, longitude),
          getLocationName(latitude, longitude),
        ]);

        if (isMounted) {
          setLocation({
            coords: { latitude, longitude },
            placeName,
            weather: weatherData,
            isLoading: false,
            error: null,
          });
        }
      } catch (error) {
        if (isMounted) {
          setLocation(prev => ({
            ...prev,
            isLoading: false,
            error: 'Failed to fetch weather data',
          }));
        }
      }
    };

    const handleError = (error) => {
      if (isMounted) {
        setLocation(prev => ({
          ...prev,
          isLoading: false,
          error: 'Unable to retrieve your location. Please enable location services.',
        }));
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        fetchLocationAndWeather,
        handleError,
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      setLocation(prev => ({
        ...prev,
        isLoading: false,
        error: 'Geolocation is not supported by your browser',
      }));
    }

    return () => {
      isMounted = false;
    };
  }, []);

  const refreshLocation = () => {
    setLocation(prev => ({ ...prev, isLoading: true, error: null }));
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        Promise.all([
          getWeatherByCoords(latitude, longitude),
          getLocationName(latitude, longitude),
        ]).then(([weatherData, placeName]) => {
          setLocation({
            coords: { latitude, longitude },
            placeName,
            weather: weatherData,
            isLoading: false,
            error: null,
          });
        });
      },
      (error) => {
        setLocation(prev => ({
          ...prev,
          isLoading: false,
          error: 'Unable to refresh location',
        }));
      }
    );
  };

  return { ...location, refreshLocation };
};

export default useLocation;

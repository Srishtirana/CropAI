import axios from 'axios';

const OPENWEATHER_API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;

const getWeatherByCoords = async (lat, lon) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=metric&appid=${OPENWEATHER_API_KEY}`
    );
    return {
      current: {
        temp: response.data.current.temp,
        humidity: response.data.current.humidity,
        windSpeed: response.data.current.wind_speed,
        weather: response.data.current.weather[0],
      },
      daily: response.data.daily.slice(0, 5).map(day => ({
        dt: day.dt,
        temp: day.temp,
        humidity: day.humidity,
        rain: day.rain || 0,
        weather: day.weather[0],
      })),
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

const getLocationName = async (lat, lon) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${OPENWEATHER_API_KEY}`
    );
    return response.data[0]?.name || 'Unknown Location';
  } catch (error) {
    console.error('Error fetching location name:', error);
    return 'Unknown Location';
  }
};

export { getWeatherByCoords, getLocationName };

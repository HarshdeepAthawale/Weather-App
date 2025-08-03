interface WeatherData {
  location: {
    name: string;
    country: string;
  };
  current: {
    temp_c: number;
    temp_f: number;
    condition: {
      text: string;
      icon: string;
    };
    humidity: number;
    wind_kph: number;
    feelslike_c: number;
    feelslike_f: number;
  };
}

interface ForecastData {
  forecast: {
    forecastday: Array<{
      date: string;
      day: {
        maxtemp_c: number;
        maxtemp_f: number;
        mintemp_c: number;
        mintemp_f: number;
        condition: {
          text: string;
          icon: string;
        };
      };
    }>;
  };
}

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const BASE_URL = 'https://api.weatherapi.com/v1';

export const fetchCurrentWeather = async (city: string): Promise<WeatherData> => {
  if (!API_KEY) {
    throw new Error('Weather API key is not configured');
  }

  const response = await fetch(
    `${BASE_URL}/current.json?key=${API_KEY}&q=${encodeURIComponent(city)}&aqi=no`
  );

  if (!response.ok) {
    if (response.status === 400) {
      throw new Error('City not found. Please check the spelling and try again.');
    }
    throw new Error('Failed to fetch weather data');
  }

  return response.json();
};

export const fetchWeatherForecast = async (city: string, days: number = 5): Promise<ForecastData> => {
  if (!API_KEY) {
    throw new Error('Weather API key is not configured');
  }

  const response = await fetch(
    `${BASE_URL}/forecast.json?key=${API_KEY}&q=${encodeURIComponent(city)}&days=${days}&aqi=no&alerts=no`
  );

  if (!response.ok) {
    if (response.status === 400) {
      throw new Error('City not found. Please check the spelling and try again.');
    }
    throw new Error('Failed to fetch forecast data');
  }

  return response.json();
};

export type { WeatherData, ForecastData };

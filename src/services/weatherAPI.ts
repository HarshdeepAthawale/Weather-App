interface WeatherData {
  name: string;
  sys: {
    country: string;
  };
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
}

interface ForecastData {
  list: Array<{
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      humidity: number;
    };
    weather: Array<{
      main: string;
      description: string;
      icon: string;
    }>;
    wind: {
      speed: number;
    };
    dt_txt: string;
  }>;
  city: {
    name: string;
    country: string;
  };
}

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchCurrentWeather = async (city: string): Promise<WeatherData> => {
  if (!API_KEY) {
    throw new Error('OpenWeather API key is not configured');
  }

  const response = await fetch(
    `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
  );

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('City not found. Please check the spelling and try again.');
    }
    throw new Error('Failed to fetch weather data');
  }

  return response.json();
};

export const fetchWeatherForecast = async (city: string, days: number = 5): Promise<ForecastData> => {
  if (!API_KEY) {
    throw new Error('OpenWeather API key is not configured');
  }

  const response = await fetch(
    `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&cnt=${days * 8}`
  );

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('City not found. Please check the spelling and try again.');
    }
    throw new Error('Failed to fetch forecast data');
  }

  return response.json();
};

export type { WeatherData, ForecastData };

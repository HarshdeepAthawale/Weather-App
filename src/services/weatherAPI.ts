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

const RAPIDAPI_KEY = process.env.NEXT_PUBLIC_RAPIDAPI_KEY;
const RAPIDAPI_HOST = process.env.NEXT_PUBLIC_RAPIDAPI_HOST;
const BASE_URL = `https://${RAPIDAPI_HOST}/api/weather`;

export const fetchCurrentWeather = async (city: string): Promise<WeatherData> => {
  if (!RAPIDAPI_KEY || !RAPIDAPI_HOST) {
    throw new Error('RapidAPI credentials are not configured');
  }

  const response = await fetch(
    `${BASE_URL}/current?place=${encodeURIComponent(city)}&units=metric&mode=json&lang=en`,
    {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'x-rapidapi-host': RAPIDAPI_HOST,
        'x-rapidapi-key': RAPIDAPI_KEY
      }
    }
  );

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('City not found. Please check the spelling and try again.');
    }
    throw new Error('Failed to fetch weather data');
  }

  const data = await response.json();
  
  // Transform RapidAPI response to match our WeatherData interface
  return {
    name: data.name || city,
    sys: {
      country: data.sys?.country || data.country || 'Unknown'
    },
    main: {
      temp: data.main?.temp || data.temp || 0,
      feels_like: data.main?.feels_like || data.feels_like || 0,
      humidity: data.main?.humidity || data.humidity || 0
    },
    weather: data.weather || [{
      main: data.weather?.[0]?.main || 'Unknown',
      description: data.weather?.[0]?.description || 'No description',
      icon: data.weather?.[0]?.icon || '01d'
    }],
    wind: {
      speed: data.wind?.speed || 0
    }
  };
};

export const fetchWeatherForecast = async (city: string, days: number = 5): Promise<ForecastData> => {
  if (!RAPIDAPI_KEY || !RAPIDAPI_HOST) {
    throw new Error('RapidAPI credentials are not configured');
  }

  const cnt = Math.min(days * 8, 40); // RapidAPI typically limits forecast entries
  const response = await fetch(
    `${BASE_URL}/forecast?place=${encodeURIComponent(city)}&cnt=${cnt}&units=metric&type=three_hour&mode=json&lang=en`,
    {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'x-rapidapi-host': RAPIDAPI_HOST,
        'x-rapidapi-key': RAPIDAPI_KEY
      }
    }
  );

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('City not found. Please check the spelling and try again.');
    }
    throw new Error('Failed to fetch forecast data');
  }

  const data = await response.json();
  
  // Transform RapidAPI response to match our ForecastData interface
  return {
    list: data.list?.map((item: any) => ({
      dt: item.dt || Date.now() / 1000,
      main: {
        temp: item.main?.temp || item.temp || 0,
        feels_like: item.main?.feels_like || item.feels_like || 0,
        humidity: item.main?.humidity || item.humidity || 0
      },
      weather: item.weather || [{
        main: item.weather?.[0]?.main || 'Unknown',
        description: item.weather?.[0]?.description || 'No description',
        icon: item.weather?.[0]?.icon || '01d'
      }],
      wind: {
        speed: item.wind?.speed || 0
      },
      dt_txt: item.dt_txt || new Date(item.dt * 1000).toISOString()
    })) || [],
    city: {
      name: data.city?.name || city,
      country: data.city?.country || 'Unknown'
    }
  };
};

export type { WeatherData, ForecastData };

import { useState, useCallback } from 'react';
import { fetchCurrentWeather, fetchWeatherForecast, WeatherData, ForecastData } from '@/services/weatherAPI';

interface UseWeatherReturn {
  weatherData: WeatherData | null;
  forecastData: ForecastData | null;
  loading: boolean;
  error: string | null;
  fetchWeather: (city: string) => Promise<void>;
  clearError: () => void;
}

export const useWeather = (): UseWeatherReturn => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = useCallback(async (city: string) => {
    if (!city.trim()) {
      setError('Please enter a city name');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const [currentWeather, forecast] = await Promise.all([
        fetchCurrentWeather(city),
        fetchWeatherForecast(city, 5)
      ]);

      setWeatherData(currentWeather);
      setForecastData(forecast);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    weatherData,
    forecastData,
    loading,
    error,
    fetchWeather,
    clearError,
  };
};

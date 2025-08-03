'use client';

import { useState } from 'react';
import SearchBar from '@/components/SearchBar';
import WeatherCard from '@/components/WeatherCard';
import ForecastList from '@/components/ForecastList';
import { useWeather } from '@/hooks/useWeather';

export default function Home() {
  const { weatherData, forecastData, loading, error, fetchWeather, clearError } = useWeather();
  const [unit, setUnit] = useState<'C' | 'F'>('C');

  const handleSearch = (city: string) => {
    clearError();
    fetchWeather(city);
  };

  const toggleUnit = () => {
    setUnit(unit === 'C' ? 'F' : 'C');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Weather App</h1>
          <p className="text-gray-600">Get current weather and 5-day forecast for any city</p>
        </div>

        {/* Search Bar */}
        <SearchBar onSearch={handleSearch} loading={loading} />

        {/* Unit Toggle */}
        {weatherData && (
          <div className="flex justify-center mb-6">
            <button
              onClick={toggleUnit}
              className="px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            >
              Switch to °{unit === 'C' ? 'F' : 'C'}
            </button>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="max-w-md mx-auto mb-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <span className="ml-3 text-gray-600">Loading weather data...</span>
          </div>
        )}

        {/* Weather Content */}
        {weatherData && !loading && (
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <WeatherCard weatherData={weatherData} unit={unit} />
              </div>
              <div>
                {forecastData && (
                  <ForecastList forecastData={forecastData} unit={unit} />
                )}
              </div>
            </div>
          </div>
        )}

        {/* Welcome Message */}
        {!weatherData && !loading && !error && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="text-6xl mb-4">🌤️</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome to Weather App</h2>
                <p className="text-gray-600 mb-4">
                  Enter a city name above to get current weather conditions and a 5-day forecast.
                </p>
                <div className="text-sm text-gray-500">
                  Try searching for cities like "London", "New York", or "Tokyo"
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

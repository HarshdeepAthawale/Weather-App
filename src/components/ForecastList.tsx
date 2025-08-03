import Image from 'next/image';
import { ForecastData } from '@/services/weatherAPI';
import { formatDate, formatTemperature, getWeatherIconUrl } from '@/utils/formatDate';

interface ForecastListProps {
  forecastData: ForecastData;
  unit: 'C' | 'F';
}

export default function ForecastList({ forecastData, unit }: ForecastListProps) {
  const { list } = forecastData;

  // Group forecast data by day and get the noon forecast for each day
  const dailyForecasts = list.reduce((acc, item) => {
    const date = new Date(item.dt * 1000);
    const dayKey = date.toISOString().split('T')[0];
    
    if (!acc[dayKey]) {
      acc[dayKey] = item;
    } else {
      // Prefer noon forecasts (around 12:00)
      const currentHour = date.getHours();
      const existingHour = new Date(acc[dayKey].dt * 1000).getHours();
      if (Math.abs(currentHour - 12) < Math.abs(existingHour - 12)) {
        acc[dayKey] = item;
      }
    }
    
    return acc;
  }, {} as Record<string, typeof list[0]>);

  const forecastDays = Object.values(dailyForecasts).slice(0, 5);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">5-Day Forecast</h3>
      <div className="space-y-3">
        {forecastDays.map((day, index) => {
          const date = new Date(day.dt * 1000);
          const weatherCondition = day.weather[0];

          return (
            <div
              key={day.dt}
              className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Image
                  src={getWeatherIconUrl(weatherCondition.icon)}
                  alt={weatherCondition.description}
                  width={40}
                  height={40}
                  className="w-10 h-10"
                />
                <div>
                  <p className="font-medium text-gray-800">
                    {index === 0 ? 'Today' : formatDate(date.toISOString())}
                  </p>
                  <p className="text-sm text-gray-600">{weatherCondition.description}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <span className="font-semibold text-gray-800">
                  {formatTemperature(day.main.temp, unit)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

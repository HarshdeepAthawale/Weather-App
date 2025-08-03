import Image from 'next/image';
import { ForecastData } from '@/services/weatherAPI';
import { formatDate, formatTemperature, getWeatherIconUrl } from '@/utils/formatDate';

interface ForecastListProps {
  forecastData: ForecastData;
  unit: 'C' | 'F';
}

export default function ForecastList({ forecastData, unit }: ForecastListProps) {
  const { forecast } = forecastData;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">5-Day Forecast</h3>
      <div className="space-y-3">
        {forecast.forecastday.map((day, index) => {
          const maxTemp = unit === 'C' ? day.day.maxtemp_c : day.day.maxtemp_f;
          const minTemp = unit === 'C' ? day.day.mintemp_c : day.day.mintemp_f;

          return (
            <div
              key={day.date}
              className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Image
                  src={getWeatherIconUrl(day.day.condition.icon)}
                  alt={day.day.condition.text}
                  width={40}
                  height={40}
                  className="w-10 h-10"
                />
                <div>
                  <p className="font-medium text-gray-800">
                    {index === 0 ? 'Today' : formatDate(day.date)}
                  </p>
                  <p className="text-sm text-gray-600">{day.day.condition.text}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <span className="font-semibold text-gray-800">
                  {formatTemperature(maxTemp, unit)}
                </span>
                <span className="text-gray-500">
                  {formatTemperature(minTemp, unit)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

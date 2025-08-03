import Image from 'next/image';
import { WeatherData } from '@/services/weatherAPI';
import { formatTemperature, getWeatherIconUrl } from '@/utils/formatDate';

interface WeatherCardProps {
  weatherData: WeatherData;
  unit: 'C' | 'F';
}

export default function WeatherCard({ weatherData, unit }: WeatherCardProps) {
  const { location, current } = weatherData;
  const temperature = unit === 'C' ? current.temp_c : current.temp_f;
  const feelsLike = unit === 'C' ? current.feelslike_c : current.feelslike_f;

  return (
    <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl shadow-lg p-6 text-white mb-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold">{location.name}</h2>
          <p className="text-blue-100">{location.country}</p>
        </div>
        <div className="text-right">
          <div className="text-4xl font-bold">{formatTemperature(temperature, unit)}</div>
          <p className="text-blue-100">Feels like {formatTemperature(feelsLike, unit)}</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Image
            src={getWeatherIconUrl(current.condition.icon)}
            alt={current.condition.text}
            width={64}
            height={64}
            className="w-16 h-16"
          />
          <div>
            <p className="text-lg font-medium">{current.condition.text}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="text-center">
            <p className="text-blue-100">Humidity</p>
            <p className="font-semibold">{current.humidity}%</p>
          </div>
          <div className="text-center">
            <p className="text-blue-100">Wind</p>
            <p className="font-semibold">{current.wind_kph} km/h</p>
          </div>
        </div>
      </div>
    </div>
  );
}

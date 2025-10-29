import React from 'react';
import { Wind, Droplets, Gauge, Eye, Sunrise, Sunset, Thermometer, CloudRain } from 'lucide-react';
import { formatTime } from '../utils/weatherHelpers';

const WeatherDetails = ({ weatherData }) => {
  const metrics = [
    {
      icon: Wind,
      label: 'Wind Speed',
      value: Math.round(weatherData.current.wind_speed_10m),
      unit: 'km/h',
      bgColor: 'bg-gradient-to-br from-cyan-50 to-blue-50',
      iconBg: 'bg-cyan-100',
      iconColor: 'text-cyan-600',
      accentColor: 'text-cyan-600'
    },
    {
      icon: Droplets,
      label: 'Humidity',
      value: weatherData.current.relative_humidity_2m,
      unit: '%',
      bgColor: 'bg-gradient-to-br from-blue-50 to-indigo-50',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      accentColor: 'text-blue-600'
    },
    {
      icon: Gauge,
      label: 'Pressure',
      value: Math.round(weatherData.current.pressure_msl),
      unit: 'hPa',
      bgColor: 'bg-gradient-to-br from-purple-50 to-pink-50',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      accentColor: 'text-purple-600'
    },
    {
      icon: Eye,
      label: 'Visibility',
      value: (weatherData.current.visibility / 1000).toFixed(1),
      unit: 'km',
      bgColor: 'bg-gradient-to-br from-teal-50 to-emerald-50',
      iconBg: 'bg-teal-100',
      iconColor: 'text-teal-600',
      accentColor: 'text-teal-600'
    }
  ];

  return (
    <div className="space-y-6 mt-8">
      {/* Section Title */}
      <div className="flex items-center gap-3">
        <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
        <h2 className="text-xl font-bold text-gray-800 drop-shadow-sm">Weather Details</h2>
      </div>

      {/* Weather Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div
              key={index}
              className={`${metric.bgColor} rounded-2xl p-5 shadow-lg hover:shadow-xl 
                transition-all duration-300 hover:scale-105 border border-white border-opacity-50`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`${metric.iconBg} p-2.5 rounded-xl shadow-sm`}>
                  <Icon className={`w-5 h-5 ${metric.iconColor}`} />
                </div>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-600">{metric.label}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-gray-800">
                    {metric.value}
                  </span>
                  <span className="text-sm font-semibold text-gray-500">
                    {metric.unit}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Sun Times Section */}
      <div className="pt-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-1 w-12 bg-gradient-to-r from-orange-500 to-purple-500 rounded-full"></div>
          <h2 className="text-xl font-bold text-gray-800 drop-shadow-sm">Sun Times</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Sunrise Card */}
          <div className="bg-white bg-opacity-95 backdrop-blur-lg rounded-2xl shadow-xl p-6 
            hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-white">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-orange-100 to-amber-100 p-4 rounded-2xl shadow-md">
                <Sunrise className="w-8 h-8 text-orange-500" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-500 mb-1">Sunrise</div>
                <div className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 
                  bg-clip-text text-transparent">
                  {formatTime(weatherData.daily.sunrise[0])}
                </div>
                <div className="text-xs text-gray-500 mt-1">Start your day</div>
              </div>
            </div>
          </div>

          {/* Sunset Card */}
          <div className="bg-white bg-opacity-95 backdrop-blur-lg rounded-2xl shadow-xl p-6 
            hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-white">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-4 rounded-2xl shadow-md">
                <Sunset className="w-8 h-8 text-purple-500" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-500 mb-1">Sunset</div>
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 
                  bg-clip-text text-transparent">
                  {formatTime(weatherData.daily.sunset[0])}
                </div>
                <div className="text-xs text-gray-500 mt-1">Golden hour</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Info Bar */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-4 shadow-lg">
        <div className="flex items-center justify-center gap-6 text-white text-sm flex-wrap">
          <div className="flex items-center gap-2">
            <Thermometer className="w-4 h-4" />
            <span className="font-medium">Feels like:</span>
            <span className="font-bold">{Math.round(weatherData.current.apparent_temperature)}°C</span>
          </div>
          <div className="hidden sm:block w-px h-6 bg-white bg-opacity-40"></div>
          <div className="flex items-center gap-2">
            <CloudRain className="w-4 h-4" />
            <span className="font-medium">Precipitation:</span>
            <span className="font-bold">{weatherData.current.precipitation || 0} mm</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDetails;
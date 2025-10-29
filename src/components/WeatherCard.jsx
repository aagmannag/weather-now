import React from 'react';
import { MapPin, Cloud, Sun, CloudRain, CloudSnow, CloudDrizzle, CloudFog, CloudLightning, Wind, Thermometer, TrendingUp, TrendingDown, Calendar, Clock } from 'lucide-react';

const WeatherCard = ({ weatherData }) => {
  if (!weatherData || !weatherData.current) return null;

  // Enhanced weather icon logic
  const getWeatherIcon = (code, isDay = 1) => {
    const iconClass = "w-20 h-20 drop-shadow-lg";
    
    if (code === 0) {
      return <Sun className={`${iconClass} text-yellow-400 animate-pulse-slow`} />;
    }
    if (code === 1) {
      return <Sun className={`${iconClass} text-yellow-300`} />;
    }
    if (code === 2 || code === 3) {
      return <Cloud className={`${iconClass} text-gray-400`} />;
    }
    if (code >= 45 && code <= 48) {
      return <CloudFog className={`${iconClass} text-gray-400`} />;
    }
    if (code >= 51 && code <= 57) {
      return <CloudDrizzle className={`${iconClass} text-blue-400`} />;
    }
    if (code >= 61 && code <= 67) {
      return <CloudRain className={`${iconClass} text-blue-500 animate-bounce-slow`} />;
    }
    if (code >= 71 && code <= 77) {
      return <CloudSnow className={`${iconClass} text-blue-200`} />;
    }
    if (code >= 80 && code <= 82) {
      return <CloudRain className={`${iconClass} text-blue-600`} />;
    }
    if (code >= 85 && code <= 86) {
      return <CloudSnow className={`${iconClass} text-blue-300`} />;
    }
    if (code >= 95) {
      return <CloudLightning className={`${iconClass} text-purple-500 animate-pulse`} />;
    }
    return <Cloud className={`${iconClass} text-gray-500`} />;
  };

  const getWeatherDescription = (code) => {
    const descriptions = {
      0: 'Clear Sky',
      1: 'Mainly Clear',
      2: 'Partly Cloudy',
      3: 'Overcast',
      45: 'Foggy',
      48: 'Depositing Rime Fog',
      51: 'Light Drizzle',
      53: 'Moderate Drizzle',
      55: 'Dense Drizzle',
      56: 'Light Freezing Drizzle',
      57: 'Dense Freezing Drizzle',
      61: 'Slight Rain',
      63: 'Moderate Rain',
      65: 'Heavy Rain',
      66: 'Light Freezing Rain',
      67: 'Heavy Freezing Rain',
      71: 'Slight Snow',
      73: 'Moderate Snow',
      75: 'Heavy Snow',
      77: 'Snow Grains',
      80: 'Slight Rain Showers',
      81: 'Moderate Rain Showers',
      82: 'Violent Rain Showers',
      85: 'Slight Snow Showers',
      86: 'Heavy Snow Showers',
      95: 'Thunderstorm',
      96: 'Thunderstorm with Slight Hail',
      99: 'Thunderstorm with Heavy Hail'
    };
    return descriptions[code] || 'Unknown';
  };

  // Get background gradient based on weather
  const getWeatherGradient = (code, temp) => {
    if (code === 0) return 'from-yellow-50 via-orange-50 to-red-50';
    if (code >= 61 && code <= 67) return 'from-blue-100 via-blue-200 to-cyan-100';
    if (code >= 71 && code <= 86) return 'from-blue-50 via-cyan-50 to-white';
    if (code >= 95) return 'from-purple-100 via-indigo-100 to-blue-100';
    if (temp > 25) return 'from-orange-50 via-yellow-50 to-amber-50';
    if (temp < 10) return 'from-blue-50 via-cyan-50 to-sky-50';
    return 'from-blue-50 via-white to-purple-50';
  };

  const temp = weatherData.current.temperature_2m;
  const feelsLike = weatherData.current.apparent_temperature;
  const highTemp = weatherData.daily.temperature_2m_max[0];
  const lowTemp = weatherData.daily.temperature_2m_min[0];
  const weatherCode = weatherData.current.weather_code;
  const isDay = weatherData.current.is_day;

  // Get current date and time
  const now = new Date();
  const timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const dateString = now.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

  // Temperature trend
  const tempDiff = temp - lowTemp;
  const tempRange = highTemp - lowTemp;
  const tempPercentage = tempRange > 0 ? (tempDiff / tempRange) * 100 : 50;

  return (
    <div className={`relative overflow-hidden bg-gradient-to-br ${getWeatherGradient(weatherCode, temp)} rounded-3xl shadow-2xl`}>
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: Math.random() * 100 + 50,
                height: Math.random() * 100 + 50,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.3,
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative bg-white bg-opacity-90 backdrop-blur-xl rounded-3xl p-8">
        {/* Header with Location and DateTime */}
        <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 text-gray-700 mb-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <MapPin className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-xl font-bold text-gray-800">
                  {weatherData.location.name}
                </div>
                <div className="text-sm text-gray-600">
                  {weatherData.location.admin1 && `${weatherData.location.admin1}, `}
                  {weatherData.location.country}
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
              <Calendar className="w-4 h-4" />
              <span>{dateString}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <Clock className="w-4 h-4" />
              <span>{timeString}</span>
            </div>
          </div>
        </div>

        {/* Main Temperature Display */}
        <div className="flex items-start justify-between gap-8 mb-8">
          {/* Temperature Section */}
          <div className="flex-1">
            <div className="flex items-baseline gap-2 mb-3">
              <div className="text-8xl font-bold bg-gradient-to-br from-gray-800 to-gray-600 bg-clip-text text-transparent">
                {Math.round(temp)}
              </div>
              <div className="text-5xl font-light text-gray-600">°C</div>
            </div>
            
            <div className="space-y-2">
              <div className="text-3xl font-semibold text-gray-700">
                {getWeatherDescription(weatherCode)}
              </div>
              
              <div className="flex items-center gap-2 text-gray-600">
                <Thermometer className="w-5 h-5" />
                <span className="text-lg">
                  Feels like <span className="font-semibold text-gray-800">{Math.round(feelsLike)}°C</span>
                </span>
              </div>
            </div>
          </div>

          {/* Weather Icon */}
          <div className="flex flex-col items-center">
            <div className="bg-gradient-to-br from-white to-blue-50 p-6 rounded-3xl shadow-xl">
              {getWeatherIcon(weatherCode, isDay)}
            </div>
            <div className="mt-3 text-center">
              <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                isDay ? 'bg-yellow-100 text-yellow-700' : 'bg-indigo-100 text-indigo-700'
              }`}>
                {isDay ? '☀️ Day' : '🌙 Night'}
              </div>
            </div>
          </div>
        </div>

        {/* Temperature Range Bar */}
        <div className="mb-6 bg-gradient-to-r from-blue-100 via-yellow-100 to-red-100 rounded-full h-3 overflow-hidden shadow-inner">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-red-500 rounded-full transition-all duration-1000 relative"
            style={{ width: `${tempPercentage}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg border-2 border-gray-800"></div>
          </div>
        </div>

        {/* High/Low Temperature Cards */}
        <div className="grid grid-cols-2 gap-4">
          {/* High Temperature */}
          <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-4 border-2 border-red-200 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-red-700 uppercase tracking-wide mb-1">
                  High
                </div>
                <div className="text-3xl font-bold text-red-600 flex items-baseline gap-1">
                  {Math.round(highTemp)}
                  <span className="text-xl">°C</span>
                </div>
              </div>
              <div className="bg-red-200 p-3 rounded-xl">
                <TrendingUp className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>

          {/* Low Temperature */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-4 border-2 border-blue-200 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-blue-700 uppercase tracking-wide mb-1">
                  Low
                </div>
                <div className="text-3xl font-bold text-blue-600 flex items-baseline gap-1">
                  {Math.round(lowTemp)}
                  <span className="text-xl">°C</span>
                </div>
              </div>
              <div className="bg-blue-200 p-3 rounded-xl">
                <TrendingDown className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Weather Info Footer */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <Wind className="w-4 h-4" />
            <span>Last updated: {timeString}</span>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default WeatherCard;
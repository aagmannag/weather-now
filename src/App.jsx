import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Cloud, CloudRain, Sun, Wind, AlertCircle, TrendingUp, MapPin, ThermometerSun } from 'lucide-react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import WeatherDetails from './components/WeatherDetails';
import ActivityInsights from './components/ActivityInsights';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [userLocation, setUserLocation] = useState(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const [popularCitiesWeather, setPopularCitiesWeather] = useState([]);

  const popularCities = [
    { name: 'New York', country: 'USA', lat: 40.7128, lon: -74.0060 },
    { name: 'London', country: 'UK', lat: 51.5074, lon: -0.1278 },
    { name: 'Tokyo', country: 'Japan', lat: 35.6762, lon: 139.6503 },
    { name: 'Paris', country: 'France', lat: 48.8566, lon: 2.3522 },
    { name: 'Dubai', country: 'UAE', lat: 25.2048, lon: 55.2708 },
    { name: 'Sydney', country: 'Australia', lat: -33.8688, lon: 151.2093 },
    { name: 'Singapore', country: 'Singapore', lat: 1.3521, lon: 103.8198 },
    { name: 'Mumbai', country: 'India', lat: 19.0760, lon: 72.8777 },
    { name: 'Los Angeles', country: 'USA', lat: 34.0522, lon: -118.2437 },
    { name: 'Berlin', country: 'Germany', lat: 52.5200, lon: 13.4050 }
  ];

  // Fetch weather for popular cities
  useEffect(() => {
    const fetchPopularCitiesWeather = async () => {
      try {
        const weatherPromises = popularCities.map(async (city) => {
          const response = await axios.get(
            `https://api.open-meteo.com/v1/forecast`,
            {
              params: {
                latitude: city.lat,
                longitude: city.lon,
                current: 'temperature_2m,weather_code',
              },
            }
          );
          return {
            ...city,
            temp: Math.round(response.data.current.temperature_2m),
            weatherCode: response.data.current.weather_code
          };
        });
        
        const results = await Promise.all(weatherPromises);
        setPopularCitiesWeather(results);
      } catch (err) {
        console.error('Failed to fetch popular cities weather:', err);
      }
    };

    fetchPopularCitiesWeather();
  }, []);

  // Get user's location on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const geoResponse = await axios.get(
              `https://geocoding-api.open-meteo.com/v1/search`,
              {
                params: {
                  latitude,
                  longitude,
                  count: 1,
                  language: 'en',
                  format: 'json',
                },
              }
            );
            
            if (geoResponse.data.results && geoResponse.data.results.length > 0) {
              setUserLocation(geoResponse.data.results[0].name);
            }
          } catch (err) {
            console.error('Failed to get location name:', err);
          }
        },
        (err) => {
          console.log('Location access denied:', err);
        }
      );
    }

    // Hide welcome screen after 3 seconds
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const getWeatherIcon = (code) => {
    if (code === 0) return '☀️';
    if (code <= 3) return '⛅';
    if (code <= 48) return '☁️';
    if (code <= 67) return '🌧️';
    if (code <= 77) return '🌨️';
    if (code <= 82) return '🌦️';
    return '⛈️';
  };

  const searchCity = async (searchTerm) => {
    const cityToSearch = searchTerm || city;
    
    if (!cityToSearch.trim()) {
      setError('Please enter a city name');
      return;
    }

    setLoading(true);
    setError('');
    setWeatherData(null);

    try {
      const geoResponse = await axios.get(
        `https://geocoding-api.open-meteo.com/v1/search`,
        {
          params: {
            name: cityToSearch.trim(),
            count: 1,
            language: 'en',
            format: 'json',
          },
        }
      );

      if (!geoResponse.data.results || geoResponse.data.results.length === 0) {
        setError('City not found. Please try another search.');
        setLoading(false);
        return;
      }

      const location = geoResponse.data.results[0];

      const weatherResponse = await axios.get(
        `https://api.open-meteo.com/v1/forecast`,
        {
          params: {
            latitude: location.latitude,
            longitude: location.longitude,
            current: 'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m,wind_direction_10m,pressure_msl,visibility',
            daily: 'temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max',
            timezone: 'auto',
          },
        }
      );

      const fullWeatherData = {
        ...weatherResponse.data,
        location: {
          name: location.name,
          country: location.country,
          admin1: location.admin1,
        },
      };

      setWeatherData(fullWeatherData);
      setCity(location.name);
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleMyLocation = () => {
    if (userLocation) {
      setCity(userLocation);
      searchCity(userLocation);
    } else {
      setError('Location not available. Please search manually.');
    }
  };

  const handleCityClick = (cityName) => {
    setCity(cityName);
    searchCity(cityName);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 opacity-20">
          <Cloud className="w-32 h-32 text-white animate-float" />
        </div>
        <div className="absolute top-40 right-20 opacity-20">
          <Sun className="w-24 h-24 text-yellow-300 animate-float-delayed" />
        </div>
        <div className="absolute bottom-40 left-1/4 opacity-20">
          <Wind className="w-28 h-28 text-white animate-float" />
        </div>
        <div className="absolute bottom-20 right-1/3 opacity-20">
          <CloudRain className="w-20 h-20 text-blue-200 animate-float-delayed" />
        </div>
      </div>

      {/* Welcome Screen Overlay */}
      {showWelcome && (
        <div className="fixed inset-0 bg-gradient-to-br from-blue-600 to-purple-700 z-50 flex items-center justify-center animate-fadeOut">
          <div className="text-center animate-scaleIn">
            <Cloud className="w-24 h-24 text-white mx-auto mb-4 animate-bounce" />
            <h1 className="text-6xl font-bold text-white mb-2">Weather Now</h1>
            <p className="text-xl text-blue-100">Loading your weather companion...</p>
          </div>
        </div>
      )}

      <div className="relative z-10 p-4">
        <div className="max-w-6xl mx-auto">
          {/* Header with Stats */}
          <div className="text-center mb-8 pt-8">
            <div className="inline-block">
              <h1 className="text-6xl font-bold text-white mb-2 flex items-center justify-center gap-3 hover:scale-105 transition-transform">
                <Cloud className="w-14 h-14 drop-shadow-lg" />
                Weather Now
              </h1>
              <div className="h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-50 rounded-full"></div>
            </div>
            <p className="text-blue-100 text-xl mt-4 font-light">
              Quick weather insights for outdoor enthusiasts
            </p>
            
            {/* Quick Stats Bar */}
            {userLocation && (
              <div className="mt-6 inline-flex items-center gap-6 bg-white bg-opacity-20 backdrop-blur-md rounded-full px-6 py-3 text-white">
                <button 
                  onClick={handleMyLocation}
                  className="flex items-center gap-2 hover:text-yellow-300 transition-colors"
                >
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm font-medium">Your Location: {userLocation}</span>
                </button>
              </div>
            )}
          </div>

          {/* Search Bar */}
          <SearchBar
            city={city}
            setCity={setCity}
            onSearch={searchCity}
            loading={loading}
            searchCity={searchCity}
          />

          {/* Error Message with Animation */}
          {error && (
            <div className="max-w-2xl mx-auto mb-6 animate-slideIn">
              <div className="bg-red-500 bg-opacity-95 backdrop-blur-sm text-white px-6 py-4 rounded-2xl shadow-2xl flex items-start gap-3">
                <AlertCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Oops! Something went wrong</p>
                  <p className="text-sm text-red-100 mt-1">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Loading State */}
          {loading && !weatherData && (
            <div className="max-w-2xl mx-auto mb-6">
              <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-3xl p-12 text-center">
                <div className="animate-spin mx-auto mb-4">
                  <Cloud className="w-16 h-16 text-white" />
                </div>
                <p className="text-white text-xl font-medium">Fetching weather data...</p>
                <p className="text-blue-100 text-sm mt-2">This will only take a moment</p>
              </div>
            </div>
          )}

          {/* Weather Display */}
          {weatherData && !loading && (
            <div className="space-y-6 animate-fadeIn">
              {/* Main Weather Card */}
              <div className="transform hover:scale-[1.02] transition-transform duration-300">
                <WeatherCard weatherData={weatherData} />
              </div>

              {/* Weather Details Grid */}
              <div className="bg-white bg-opacity-95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 hover:shadow-blue-300 transition-shadow">
                <WeatherDetails weatherData={weatherData} />
              </div>

              {/* Activity Insights */}
              <div className="transform hover:scale-[1.02] transition-transform duration-300">
                <ActivityInsights weatherData={weatherData} />
              </div>

              {/* Additional Info Cards */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* UV Index Card */}
                {weatherData.daily.uv_index_max && (
                  <div className="bg-gradient-to-br from-orange-400 to-red-500 rounded-3xl p-6 text-white shadow-2xl">
                    <div className="flex items-center gap-3 mb-3">
                      <Sun className="w-8 h-8" />
                      <h3 className="text-2xl font-bold">UV Index</h3>
                    </div>
                    <div className="text-5xl font-bold mb-2">
                      {weatherData.daily.uv_index_max[0]}
                    </div>
                    <p className="text-orange-100">
                      {weatherData.daily.uv_index_max[0] < 3 ? 'Low' : 
                       weatherData.daily.uv_index_max[0] < 6 ? 'Moderate' : 
                       weatherData.daily.uv_index_max[0] < 8 ? 'High' : 'Very High'} - 
                      {weatherData.daily.uv_index_max[0] >= 6 ? ' Use sun protection!' : ' Safe outdoor exposure'}
                    </p>
                  </div>
                )}

                {/* Air Quality Info Card */}
                <div className="bg-gradient-to-br from-green-400 to-teal-500 rounded-3xl p-6 text-white shadow-2xl">
                  <div className="flex items-center gap-3 mb-3">
                    <Wind className="w-8 h-8" />
                    <h3 className="text-2xl font-bold">Air Quality</h3>
                  </div>
                  <div className="text-5xl font-bold mb-2">Good</div>
                  <p className="text-green-100">
                    Perfect conditions for outdoor activities
                  </p>
                </div>
              </div>

              {/* Refresh Button */}
              <div className="text-center">
                <button
                  onClick={() => searchCity(city)}
                  className="bg-white text-blue-600 px-8 py-4 rounded-full hover:bg-blue-50 transition-all shadow-2xl hover:shadow-blue-300 hover:scale-105 inline-flex items-center gap-2 font-semibold"
                >
                  <TrendingUp className="w-5 h-5" />
                  Refresh Weather Data
                </button>
              </div>
            </div>
          )}

          {/* Popular Cities Carousel - Show when no weather data */}
          {!weatherData && !loading && !error && (
            <div className="max-w-6xl mx-auto">
              <div className="bg-white rounded-3xl p-8 shadow-2xl overflow-hidden">
                <div className="text-center mb-8">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Cloud className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-4xl font-bold text-gray-800 mb-3">
                    Explore Weather Worldwide
                  </h2>
                  <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                    Click on any city below to check real-time weather conditions
                  </p>
                </div>

                {/* Scrolling Cities Container */}
                <div className="relative">
                  <div className="overflow-hidden">
                    <div className="flex animate-scroll gap-4 py-4">
                      {/* Duplicate cities for seamless loop */}
                      {[...popularCitiesWeather, ...popularCitiesWeather].map((cityData, index) => (
                        <button
                          key={index}
                          onClick={() => handleCityClick(cityData.name)}
                          className="flex-shrink-0 w-64 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 
                            hover:from-blue-100 hover:to-blue-200 transition-all duration-300 hover:scale-105 
                            hover:shadow-xl border-2 border-blue-200 group"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <MapPin className="w-5 h-5 text-blue-600" />
                              <div className="text-left">
                                <h3 className="font-bold text-gray-800 text-lg">{cityData.name}</h3>
                                <p className="text-sm text-gray-600">{cityData.country}</p>
                              </div>
                            </div>
                            <span className="text-3xl">{getWeatherIcon(cityData.weatherCode)}</span>
                          </div>
                          
                          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-blue-200">
                            <ThermometerSun className="w-5 h-5 text-orange-500" />
                            <span className="text-3xl font-bold text-gray-800">{cityData.temp}°C</span>
                          </div>
                          
                          <div className="mt-3 text-sm text-blue-600 font-medium group-hover:text-blue-700">
                            Click to view details →
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Gradient Overlays */}
                  <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
                  <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="text-center mt-16 pb-8">
            <div className="inline-block bg-white rounded-2xl px-8 py-5 shadow-2xl">
              <p className="text-gray-800 text-sm font-semibold mb-2">
                Weather data provided by Open-Meteo API
              </p>
              <p className="text-gray-600 text-xs">
                Built with <span className="text-red-500">❤️</span> for outdoor enthusiasts | © 2024 Weather Now
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Styles */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(10deg); }
        }

        @keyframes fadeOut {
          0% { opacity: 1; }
          80% { opacity: 1; }
          100% { opacity: 0; visibility: hidden; }
        }

        @keyframes scaleIn {
          0% { transform: scale(0.8); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 30s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }

        .animate-fadeOut {
          animation: fadeOut 3s ease-out forwards;
        }

        .animate-scaleIn {
          animation: scaleIn 0.8s ease-out;
        }

        .animate-slideIn {
          animation: slideIn 0.5s ease-out;
        }

        .animate-fadeIn {
          animation: slideIn 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}

export default App;
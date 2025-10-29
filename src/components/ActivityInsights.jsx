import React from 'react';
import { Sun, Wind, CloudRain, CloudSnow, Droplets, Thermometer, Activity, AlertTriangle, CheckCircle, Umbrella, Shirt, Zap } from 'lucide-react';

const ActivityInsights = ({ weatherData }) => {
  if (!weatherData || !weatherData.current) return null;

  const temp = weatherData.current.temperature_2m;
  const wind = weatherData.current.wind_speed_10m;
  const humidity = weatherData.current.relative_humidity_2m;
  const precipitation = weatherData.current.precipitation || 0;
  const visibility = weatherData.current.visibility;

  // Generate comprehensive recommendations
  const recommendations = [];

  // Temperature-based recommendations
  if (temp > 30) {
    recommendations.push({
      type: 'hot',
      severity: 'warning',
      icon: <Sun className="w-6 h-6" />,
      title: 'Very Hot Weather',
      message: 'Stay hydrated and avoid prolonged sun exposure. Seek shade during peak hours (11 AM - 3 PM).',
      color: 'from-red-500 to-orange-500',
      bgColor: 'bg-red-50',
      activities: ['Swimming', 'Indoor Activities', 'Early Morning Walks']
    });
  } else if (temp > 25) {
    recommendations.push({
      type: 'warm',
      severity: 'good',
      icon: <Sun className="w-6 h-6" />,
      title: 'Perfect Warm Weather',
      message: 'Ideal conditions for outdoor activities. Stay hydrated and use sunscreen.',
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-50',
      activities: ['Hiking', 'Cycling', 'Beach Activities', 'Picnic']
    });
  } else if (temp < 5) {
    recommendations.push({
      type: 'freezing',
      severity: 'warning',
      icon: <CloudSnow className="w-6 h-6" />,
      title: 'Freezing Conditions',
      message: 'Bundle up in multiple layers. Limit outdoor exposure and watch for ice.',
      color: 'from-blue-600 to-cyan-600',
      bgColor: 'bg-blue-50',
      activities: ['Indoor Sports', 'Ice Skating', 'Winter Photography']
    });
  } else if (temp < 15) {
    recommendations.push({
      type: 'cold',
      severity: 'moderate',
      icon: <Thermometer className="w-6 h-6" />,
      title: 'Cool Weather',
      message: 'Dress in warm layers. Perfect for brisk outdoor activities.',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      activities: ['Jogging', 'Hiking', 'Outdoor Sports']
    });
  }

  // Wind-based recommendations
  if (wind > 30) {
    recommendations.push({
      type: 'strongwind',
      severity: 'warning',
      icon: <Wind className="w-6 h-6" />,
      title: 'Strong Winds',
      message: 'Exercise caution outdoors. Secure loose items and avoid tall structures.',
      color: 'from-gray-600 to-blue-600',
      bgColor: 'bg-gray-50',
      activities: ['Kite Flying', 'Wind Surfing']
    });
  } else if (wind > 20) {
    recommendations.push({
      type: 'windy',
      severity: 'moderate',
      icon: <Wind className="w-6 h-6" />,
      title: 'Windy Conditions',
      message: 'Great for wind sports! Secure loose items and be mindful of gusts.',
      color: 'from-cyan-500 to-blue-500',
      bgColor: 'bg-cyan-50',
      activities: ['Sailing', 'Paragliding', 'Kite Sports']
    });
  }

  // Precipitation-based recommendations
  if (precipitation > 5) {
    recommendations.push({
      type: 'heavyrain',
      severity: 'warning',
      icon: <CloudRain className="w-6 h-6" />,
      title: 'Heavy Rain',
      message: 'Stay indoors if possible. If going out, use waterproof gear and be cautious.',
      color: 'from-blue-600 to-indigo-600',
      bgColor: 'bg-blue-50',
      activities: ['Indoor Activities', 'Museum Visits', 'Movie Time']
    });
  } else if (precipitation > 0) {
    recommendations.push({
      type: 'rain',
      severity: 'moderate',
      icon: <Umbrella className="w-6 h-6" />,
      title: 'Light Rain Expected',
      message: 'Pack an umbrella and wear waterproof clothing.',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      activities: ['Indoor Climbing', 'Shopping', 'Café Hopping']
    });
  }

  // Humidity-based recommendations
  if (humidity > 80) {
    recommendations.push({
      type: 'humid',
      severity: 'moderate',
      icon: <Droplets className="w-6 h-6" />,
      title: 'High Humidity',
      message: 'Air feels muggy. Stay hydrated and take breaks in air-conditioned spaces.',
      color: 'from-teal-500 to-cyan-500',
      bgColor: 'bg-teal-50',
      activities: ['Swimming', 'Water Sports', 'Light Activities']
    });
  }

  // Visibility-based recommendations
  if (visibility < 5000) {
    recommendations.push({
      type: 'lowvisibility',
      severity: 'warning',
      icon: <AlertTriangle className="w-6 h-6" />,
      title: 'Low Visibility',
      message: 'Reduced visibility due to fog or weather. Drive carefully and use headlights.',
      color: 'from-yellow-600 to-orange-600',
      bgColor: 'bg-yellow-50',
      activities: ['Indoor Activities', 'Careful Driving Only']
    });
  }

  // Ideal conditions
  if (temp >= 15 && temp <= 25 && wind < 20 && precipitation === 0 && humidity < 70) {
    recommendations.push({
      type: 'perfect',
      severity: 'excellent',
      icon: <CheckCircle className="w-6 h-6" />,
      title: 'Perfect Outdoor Conditions!',
      message: 'Excellent weather for any outdoor activity. Make the most of it!',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      activities: ['All Outdoor Activities', 'Hiking', 'Sports', 'Picnic', 'Photography']
    });
  }

  // Clothing recommendations
  const getClothingAdvice = () => {
    if (temp > 25) {
      return { icon: <Shirt className="w-5 h-5" />, text: 'Light, breathable clothing', color: 'text-orange-600' };
    } else if (temp < 10) {
      return { icon: <Shirt className="w-5 h-5" />, text: 'Warm layers, jacket required', color: 'text-blue-600' };
    }
    return { icon: <Shirt className="w-5 h-5" />, text: 'Comfortable casual wear', color: 'text-gray-600' };
  };

  const clothingAdvice = getClothingAdvice();

  // Severity badge
  const getSeverityBadge = (severity) => {
    const badges = {
      excellent: { text: 'Excellent', color: 'bg-green-500', icon: <CheckCircle className="w-4 h-4" /> },
      good: { text: 'Good', color: 'bg-blue-500', icon: <Activity className="w-4 h-4" /> },
      moderate: { text: 'Moderate', color: 'bg-yellow-500', icon: <AlertTriangle className="w-4 h-4" /> },
      warning: { text: 'Caution', color: 'bg-orange-500', icon: <AlertTriangle className="w-4 h-4" /> }
    };
    return badges[severity] || badges.good;
  };

  if (recommendations.length === 0) {
    return (
      <div className="bg-white bg-opacity-95 backdrop-blur-lg rounded-3xl shadow-2xl p-8">
        <div className="text-center">
          <Activity className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            Weather Analysis
          </h3>
          <p className="text-gray-600">
            Conditions are normal. Enjoy your day!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white bg-opacity-95 backdrop-blur-lg rounded-3xl shadow-2xl p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <Activity className="w-8 h-8 text-blue-600" />
            Activity Insights
          </h3>
          <p className="text-gray-600 mt-1">Personalized recommendations for outdoor enthusiasts</p>
        </div>
      </div>

      {/* Main Recommendations */}
      <div className="space-y-4 mb-6">
        {recommendations.map((rec, index) => {
          const badge = getSeverityBadge(rec.severity);
          return (
            <div
              key={index}
              className={`relative overflow-hidden rounded-2xl ${rec.bgColor} border-2 border-transparent hover:border-opacity-50 transition-all duration-300 hover:shadow-lg`}
            >
              <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${rec.color}`}></div>
              <div className="p-5 pl-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${rec.color} text-white shadow-lg`}>
                      {rec.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-lg font-bold text-gray-800">{rec.title}</h4>
                        <span className={`${badge.color} text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1`}>
                          {badge.icon}
                          {badge.text}
                        </span>
                      </div>
                      <p className="text-gray-700 mb-3 leading-relaxed">{rec.message}</p>
                      {rec.activities && rec.activities.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          <span className="text-xs font-semibold text-gray-600">Recommended:</span>
                          {rec.activities.map((activity, idx) => (
                            <span
                              key={idx}
                              className="text-xs bg-white bg-opacity-70 px-3 py-1 rounded-full text-gray-700 font-medium border border-gray-200"
                            >
                              {activity}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Tips Section */}
      <div className="grid md:grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-200">
        {/* Clothing Advice */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
          <div className="flex items-center gap-3">
            <div className={`p-2 bg-white rounded-lg ${clothingAdvice.color}`}>
              {clothingAdvice.icon}
            </div>
            <div>
              <div className="text-xs font-semibold text-gray-600 uppercase">What to Wear</div>
              <div className="text-sm font-bold text-gray-800">{clothingAdvice.text}</div>
            </div>
          </div>
        </div>

        {/* Energy Level */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-lg text-green-600">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-semibold text-gray-600 uppercase">Energy Level</div>
              <div className="text-sm font-bold text-gray-800">
                {temp >= 15 && temp <= 25 && wind < 20 ? 'High - Great for activities!' : 
                 temp > 30 || temp < 5 ? 'Low - Take it easy' : 
                 'Moderate - Pace yourself'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Tip */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-500 text-center">
          💡 <span className="font-medium">Pro Tip:</span> Always check weather updates before heading out for extended activities
        </p>
      </div>
    </div>
  );
};

export default ActivityInsights;
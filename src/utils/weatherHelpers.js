// Weather code descriptions
export const getWeatherDescription = (code) => {
    const descriptions = {
      0: 'Clear sky',
      1: 'Mainly clear',
      2: 'Partly cloudy',
      3: 'Overcast',
      45: 'Foggy',
      48: 'Depositing rime fog',
      51: 'Light drizzle',
      53: 'Moderate drizzle',
      55: 'Dense drizzle',
      61: 'Slight rain',
      63: 'Moderate rain',
      65: 'Heavy rain',
      71: 'Slight snow',
      73: 'Moderate snow',
      75: 'Heavy snow',
      95: 'Thunderstorm',
    };
    return descriptions[code] || 'Unknown';
  };
  
  // Format time
  export const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };
  
  // Get activity recommendations
  export const getActivityRecommendations = (weatherData) => {
    const recommendations = [];
    const temp = weatherData.current.temperature_2m;
    const wind = weatherData.current.wind_speed_10m;
    const precipitation = weatherData.current.precipitation;
  
    if (temp > 25) {
      recommendations.push({
        type: 'warm',
        title: 'Warm weather',
        message: 'Perfect for swimming, light hiking. Stay hydrated!'
      });
    }
  
    if (temp < 10) {
      recommendations.push({
        type: 'cold',
        title: 'Cold weather',
        message: 'Dress warmly in layers for outdoor activities.'
      });
    }
  
    if (wind > 20) {
      recommendations.push({
        type: 'windy',
        title: 'Windy conditions',
        message: 'Great for wind sports, but secure loose items.'
      });
    }
  
    if (precipitation > 0) {
      recommendations.push({
        type: 'rain',
        title: 'Precipitation detected',
        message: 'Pack rain gear for outdoor activities.'
      });
    }
  
    return recommendations;
  };
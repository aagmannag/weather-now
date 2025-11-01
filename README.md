# 🌤️ Weather Now

A modern weather application for outdoor enthusiasts with real-time data, smart search, and activity recommendations.

**Live Demo**: https://weather-now-plum-three.vercel.app/

## ✨ Features

- 🔍 **Smart Search** - Real-time city autocomplete with recent searches
- 🌡️ **Live Weather Data** - Temperature, humidity, wind, visibility, UV index
- 🎯 **Activity Insights** - Personalized recommendations for outdoor activities
- 📍 **Auto Location** - Detects your location automatically
- 🎨 **Beautiful UI** - Dynamic backgrounds and smooth animations
- 📱 **Responsive** - Works on mobile, tablet, and desktop

## 🚀 Quick Start

### Installation
```bash
# Clone the repository
git clone https://github.com/your-username/weather-now.git
cd weather-now

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` to see the app.

### Build for Production
```bash
npm run build
```

## 🛠️ Tech Stack

- **React 18** - Frontend framework
- **Tailwind CSS** - Styling
- **Axios** - API requests
- **Lucide React** - Icons
- **Vite** - Build tool

## 📦 APIs Used

- [Open-Meteo Weather API](https://open-meteo.com/) - Weather data 
- [Open-Meteo Geocoding API](https://open-meteo.com/) - City search

## 📁 Project Structure
```
src/
├── components/
│   ├── SearchBar.jsx          # Search with autocomplete
│   ├── WeatherCard.jsx        # Main weather display
│   ├── WeatherDetails.jsx     # Detailed metrics
│   └── ActivityInsights.jsx   # Activity recommendations
├── utils/
│   └── weatherHelpers.js      # Helper functions
├── App.jsx                    # Main component
└── main.jsx                   # Entry point
```

## 🌟 Key Features Explained

### Smart Search
- Type any city name to get instant suggestions
- Click popular cities for quick access
- Recent searches saved automatically

### Weather Display
- Current temperature with "feels like" reading
- High/Low temperature with visual indicator
- Animated weather icons (30+ conditions)
- Day/Night detection

### Activity Insights
- Temperature-based recommendations
- Wind, rain, and visibility alerts
- Clothing advice
- Suitable outdoor activities

## 👨‍💻 Author

GitHub: [@aagmannag](https://github.com/aagmannag)

---

**Built with ❤️ for outdoor enthusiasts**

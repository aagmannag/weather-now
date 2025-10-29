import React, { useState, useRef, useEffect } from 'react';
import { Search, Loader, MapPin, Clock, X } from 'lucide-react';

const SearchBar = ({ city, setCity, onSearch, loading }) => {
  const triggerSearch = (searchCity) => {
    // If a specific city is provided, use it; otherwise use current city state
    const cityToSearch = searchCity || city;
    if (cityToSearch && cityToSearch.trim()) {
      onSearch(cityToSearch.trim());
    }
  };
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const inputRef = useRef(null);

  // Popular cities for quick access
  const popularCities = [
    { name: 'New York', country: 'USA' },
    { name: 'London', country: 'UK' },
    { name: 'Tokyo', country: 'Japan' },
    { name: 'Paris', country: 'France' },
    { name: 'Dubai', country: 'UAE' },
    { name: 'Sydney', country: 'Australia' }
  ];

  // Load recent searches from memory on mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('recentSearches') || '[]');
    setRecentSearches(saved);
  }, []);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
    if (e.key === 'Escape') {
      setShowSuggestions(false);
      inputRef.current?.blur();
    }
  };

  const handleSearch = () => {
    if (city.trim()) {
      // Add to recent searches
      const newRecent = [
        city.trim(),
        ...recentSearches.filter(s => s.toLowerCase() !== city.trim().toLowerCase())
      ].slice(0, 5);
      
      setRecentSearches(newRecent);
      localStorage.setItem('recentSearches', JSON.stringify(newRecent));
      
      triggerSearch(city);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (selectedCity) => {
    // Set the city first
    setCity(selectedCity);
    
    // Add to recent searches
    const newRecent = [
      selectedCity,
      ...recentSearches.filter(s => s.toLowerCase() !== selectedCity.toLowerCase())
    ].slice(0, 5);
    
    setRecentSearches(newRecent);
    localStorage.setItem('recentSearches', JSON.stringify(newRecent));
    
    // Close suggestions
    setShowSuggestions(false);
    
    // Trigger search immediately with the selected city
    triggerSearch(selectedCity);
  };

  const clearInput = () => {
    setCity('');
    inputRef.current?.focus();
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  return (
    <div className="mb-8 relative">
      <div className="max-w-2xl mx-auto">
        {/* Search Input Container */}
        <div 
          className={`relative transition-all duration-300 ${
            isFocused ? 'scale-105' : 'scale-100'
          }`}
        >
          {/* Search Icon (Left) */}
          <div className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400">
            <Search className="w-5 h-5" />
          </div>

          {/* Input Field */}
          <input
            ref={inputRef}
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyPress={handleKeyPress}
            onFocus={() => {
              setIsFocused(true);
              setShowSuggestions(true);
            }}
            onBlur={() => {
              setIsFocused(false);
              // Delay hiding suggestions to allow click events to register
              setTimeout(() => setShowSuggestions(false), 200);
            }}
            placeholder="Search for any city..."
            className={`w-full pl-14 pr-32 py-5 rounded-2xl text-lg shadow-2xl 
              focus:outline-none transition-all duration-300 bg-white
              ${isFocused 
                ? 'ring-4 ring-blue-400 ring-opacity-50 shadow-blue-200' 
                : 'ring-2 ring-gray-100'
              }`}
          />

          {/* Clear Button */}
          {city && (
            <button
              onClick={clearInput}
              className="absolute right-20 top-1/2 transform -translate-y-1/2 
                text-gray-400 hover:text-gray-600 transition-colors p-2"
              type="button"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          {/* Search Button */}
          <button
            onClick={handleSearch}
            disabled={loading || !city.trim()}
            className={`absolute right-2 top-1/2 transform -translate-y-1/2 
              px-6 py-3 rounded-xl font-medium transition-all duration-300
              ${loading || !city.trim()
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl active:scale-95'
              }`}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <Loader className="w-5 h-5 animate-spin" />
                <span className="hidden sm:inline">Searching...</span>
              </div>
            ) : (
              <span>Search</span>
            )}
          </button>
        </div>

        {/* Suggestions Dropdown */}
        {showSuggestions && (isFocused || city) && (
          <div className="absolute z-50 w-full mt-2 bg-white rounded-2xl shadow-2xl 
            border border-gray-100 overflow-hidden animate-slideDown max-w-2xl mx-auto">
            
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <div className="border-b border-gray-100">
                <div className="flex items-center justify-between px-5 py-3 bg-gray-50">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                    <Clock className="w-4 h-4" />
                    Recent Searches
                  </div>
                  <button
                    onMouseDown={(e) => {
                      e.preventDefault();
                      clearRecentSearches();
                    }}
                    className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Clear all
                  </button>
                </div>
                <div className="py-2">
                  {recentSearches.map((search, idx) => (
                    <button
                      key={idx}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        handleSuggestionClick(search);
                      }}
                      className="w-full px-5 py-3 flex items-center gap-3 
                        hover:bg-blue-50 transition-colors text-left group"
                    >
                      <MapPin className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
                      <span className="text-gray-700 group-hover:text-blue-600">
                        {search}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Popular Cities */}
            <div>
              <div className="px-5 py-3 bg-gray-50">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                  <MapPin className="w-4 h-4" />
                  Popular Cities
                </div>
              </div>
              <div className="py-2">
                {popularCities.map((cityItem, idx) => (
                  <button
                    key={idx}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      handleSuggestionClick(cityItem.name);
                    }}
                    className="w-full px-5 py-3 flex items-center justify-between 
                      hover:bg-blue-50 transition-colors text-left group"
                  >
                    <span className="text-gray-700 group-hover:text-blue-600 font-medium">
                      {cityItem.name}
                    </span>
                    <span className="text-sm text-gray-500 group-hover:text-blue-500">
                      {cityItem.country}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Helper Text */}
      <div className="max-w-2xl mx-auto mt-3 px-2">
        <p className="text-sm text-blue-100 text-center">
          💡 Tip: Press Enter to search or click on suggestions below
        </p>
      </div>

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default SearchBar;
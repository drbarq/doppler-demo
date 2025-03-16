"use client";

import { useState, useEffect } from "react";

interface WeatherData {
  main: {
    temp: number;
    humidity: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  name: string;
}

export const WeatherWidget = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [city, setCity] = useState("London");
  const [searchTerm, setSearchTerm] = useState(city);

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/weather?city=${encodeURIComponent(searchTerm)}`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch weather data");
      }

      setWeatherData(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setCity(searchTerm);
    fetchWeather();
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  useEffect(() => {
    fetchWeather();
    // Only run on mount to fetch initial weather data
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="max-w-md mx-auto">
      <h3 className="text-xl font-semibold mb-4">
        Test Weather API Integration
      </h3>

      <div className="space-y-4">
        <div className="flex gap-2">
          <div className="flex-1">
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700"
            >
              City
            </label>
            <input
              id="city"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter city name"
            />
          </div>
          <button
            onClick={handleSearch}
            disabled={loading}
            className={`mt-7 px-4 py-2 text-white rounded-md ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            Search
          </button>
        </div>

        {loading && (
          <div className="text-gray-500">Loading weather data...</div>
        )}
        {error && <div className="text-red-600 text-sm">{error}</div>}

        {weatherData && !loading && !error && (
          <div className="bg-white rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-medium">{weatherData.name}</h4>
                <p className="text-gray-500">
                  {weatherData.weather[0].description}
                </p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">
                  {Math.round(weatherData.main.temp)}°C
                </div>
                <div className="text-gray-500">
                  Humidity: {weatherData.main.humidity}%
                </div>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={fetchWeather}
          disabled={loading}
          className={`w-full px-4 py-2 text-white rounded-md ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Refreshing..." : "Refresh Weather"}
        </button>
      </div>
    </div>
  );
};

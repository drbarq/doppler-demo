"use client";

import { useState, useEffect } from "react";

interface WeatherData {
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
  name: string;
  sys: {
    country: string;
  };
}

export const WeatherWidget = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [city] = useState("Denver");
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Failed to fetch weather data");
        setWeatherData(data);
        setLastUpdated(new Date().toLocaleTimeString());
      } catch (error) {
        setError(error instanceof Error ? error.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, [city]);

  if (loading) {
    return (
      <div className="flex items-center bg-white rounded-lg border p-4 shadow-sm max-w-xs min-w-[220px]">
        <div className="animate-pulse w-10 h-10 bg-gray-200 rounded-full mr-3" />
        <div>
          <div className="font-semibold text-gray-400">Loading...</div>
        </div>
      </div>
    );
  }
  if (error || !weatherData) {
    return (
      <div className="flex items-center bg-white rounded-lg border p-4 shadow-sm max-w-xs min-w-[220px]">
        <div className="w-10 h-10 mr-3 flex items-center justify-center text-red-500 text-2xl">☁️</div>
        <div>
          <div className="font-semibold">Weather</div>
          <div className="text-xs text-red-500 mt-1">{error || "No data"}</div>
        </div>
      </div>
    );
  }

  const iconUrl = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
  const desc = weatherData.weather[0].description;
  const temp = Math.round(weatherData.main.temp * 9 / 5 + 32); // Convert C to F
  const feelsLike = Math.round(weatherData.main.feels_like * 9 / 5 + 32); // Convert C to F
  const humidity = weatherData.main.humidity;
  const cityName = `${weatherData.name}, ${weatherData.sys.country}`;

  return (
    <div className="flex items-center bg-white rounded-lg border p-4 shadow-sm max-w-xs min-w-[220px]">
      <img
        src={iconUrl}
        alt={desc}
        className="w-10 h-10 mr-3"
        style={{ flexShrink: 0 }}
      />
      <div>
        <div className="font-semibold">{cityName}</div>
        <div className="text-xs text-gray-500 capitalize">{desc}</div>
        <div className="text-2xl">{temp}°F</div>
        <div className="text-xs text-gray-500">
          Feels like: {feelsLike}°F · Humidity: {humidity}%
        </div>
        <div className="text-xs text-gray-500 mt-1">
          <span role="img" aria-label="lock">🔒</span> API key from Secrets Manager
        </div>
        {lastUpdated && (
          <div className="text-[10px] text-gray-400 mt-1">
            Last updated: {lastUpdated}
          </div>
        )}
      </div>
    </div>
  );
};

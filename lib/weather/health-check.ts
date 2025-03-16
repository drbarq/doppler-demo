export const checkWeatherApiConnection = async () => {
  try {
    const apiKey = process.env.OPENWEATHER_API_KEY;

    if (!apiKey) {
      return {
        isConnected: false,
        error: "OpenWeatherMap API key is missing",
      };
    }

    // Make a simple API call to verify the key works
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}`
    );

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    return {
      isConnected: true,
    };
  } catch (error) {
    return {
      isConnected: false,
      error: `Failed to connect to OpenWeatherMap: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
    };
  }
};

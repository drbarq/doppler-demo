export const checkWeatherApiConnection = async () => {
  try {
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;

    if (!apiKey) {
      return {
        isConnected: false,
        error: "OpenWeatherMap API key is missing",
        type: "env_missing",
        message: "No .env file needed - run with Doppler instead!",
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
      message: "Connected to OpenWeatherMap without an .env file! ✨",
    };
  } catch (error) {
    return {
      isConnected: false,
      error: error instanceof Error ? error.message : "Unknown error",
      type: "connection_error",
    };
  }
};

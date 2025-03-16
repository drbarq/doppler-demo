import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.OPENWEATHERMAP_API_KEY;

  console.log("Checking OpenWeatherMap environment variables...");

  if (!apiKey) {
    console.log("Missing OpenWeatherMap API key");
    return NextResponse.json({
      isConnected: false,
      error: "Missing required environment variable: OPENWEATHERMAP_API_KEY",
      type: "env_missing",
      message: "No .env file needed - run with Doppler instead!",
    });
  }

  try {
    console.log("Attempting OpenWeatherMap API connection...");
    // Test the API with a simple request to London weather
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}`
    );

    if (!response.ok) {
      console.error("OpenWeatherMap API error:", response.status);
      throw new Error(
        `OpenWeatherMap API responded with status: ${response.status}`
      );
    }

    console.log("OpenWeatherMap connection successful!");
    return NextResponse.json({
      isConnected: true,
      message: "Connected to OpenWeatherMap without an .env file! ✨",
    });
  } catch (error) {
    console.error("Health check error:", error);
    return NextResponse.json({
      isConnected: false,
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
      type: "connection_error",
    });
  }
}

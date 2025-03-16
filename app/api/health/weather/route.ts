import { NextResponse } from "next/server";

export async function GET() {
  try {
    const apiKey = process.env.OPENWEATHER_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        isConnected: false,
        error: "Missing OpenWeatherMap API key",
      });
    }

    // Test the API with a simple request
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}`
    );

    if (!response.ok) {
      throw new Error(
        `OpenWeatherMap API responded with status: ${response.status}`
      );
    }

    return NextResponse.json({ isConnected: true });
  } catch (error) {
    return NextResponse.json({
      isConnected: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to connect to OpenWeatherMap",
    });
  }
}

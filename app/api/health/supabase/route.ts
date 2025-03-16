import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  console.log("Checking Supabase environment variables...");

  // Check for missing environment variables
  if (!supabaseUrl || !supabaseKey) {
    console.log("Missing Supabase environment variables:", {
      url: !supabaseUrl ? "NEXT_PUBLIC_SUPABASE_URL is missing" : "present",
      key: !supabaseKey
        ? "NEXT_PUBLIC_SUPABASE_ANON_KEY is missing"
        : "present",
    });

    return NextResponse.json({
      isConnected: false,
      error:
        "Missing required environment variables: " +
        [
          !supabaseUrl && "NEXT_PUBLIC_SUPABASE_URL",
          !supabaseKey && "NEXT_PUBLIC_SUPABASE_ANON_KEY",
        ]
          .filter(Boolean)
          .join(", "),
      type: "env_missing",
      message: "No .env file needed - run with Doppler instead!",
    });
  }

  try {
    console.log(`Attempting Supabase connection with URL: ${supabaseUrl}`);
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Try a simple query to verify connection
    const { data, error } = await supabase
      .from("products")
      .select("count")
      .limit(1);

    if (error) {
      console.error("Health check error:", error);
      throw error;
    }

    console.log("Supabase connection successful!");
    return NextResponse.json({
      isConnected: true,
      message: "Connected to Supabase without an .env file! ✨",
    });
  } catch (err: any) {
    console.error("Health check error:", err);
    return NextResponse.json({
      isConnected: false,
      error: err instanceof Error ? err.message : "An unknown error occurred",
      type: "connection_error",
    });
  }
}

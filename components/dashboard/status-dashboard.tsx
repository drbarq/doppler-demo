"use client";

import { ServiceStatusCard } from "./service-status-card";

async function checkSupabaseConnection() {
  try {
    const response = await fetch("/api/health/supabase");
    if (!response.ok) {
      throw new Error("Failed to fetch Supabase health status");
    }
    const data = await response.json();
    return {
      isConnected: data.isConnected,
      error: data.error,
      type: data.type,
      message: data.message,
    };
  } catch (error) {
    return {
      isConnected: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to check Supabase connection",
      type: "connection_error",
    };
  }
}

async function checkStripeConnection() {
  try {
    const response = await fetch("/api/health/stripe", {
      method: "POST",
    });
    const data = await response.json();
    return {
      isConnected: data.isConnected,
      stripeConnected: data.stripeConnected,
      error: data.error,
      type: data.type,
      message: data.message,
    };
  } catch (error) {
    return {
      isConnected: false,
      stripeConnected: false,
      error: "Failed to check Stripe connection",
      type: "connection_error",
    };
  }
}

async function checkWeatherApiConnection() {
  try {
    const response = await fetch("/api/health/weather");
    const data = await response.json();
    return {
      isConnected: data.isConnected,
      error: data.error,
      type: data.type,
      message: data.message,
    };
  } catch (error) {
    return {
      isConnected: false,
      error: "Failed to check OpenWeatherMap connection",
      type: "connection_error",
    };
  }
}

export const StatusDashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
      <ServiceStatusCard
        serviceName="Supabase"
        logoSrc="/images/service-logos/supabase.svg"
        checkStatus={checkSupabaseConnection}
      />
      <ServiceStatusCard
        serviceName="Stripe"
        logoSrc="/images/service-logos/stripe.svg"
        checkStatus={checkStripeConnection}
      />
      <ServiceStatusCard
        serviceName="OpenWeatherMap"
        logoSrc="/images/service-logos/openweathermap.svg"
        checkStatus={checkWeatherApiConnection}
      />
    </div>
  );
};

"use client";

import { ServiceStatusCard } from "./service-status-card";

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

async function checkAwsConnection() {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_AWS_HEALTH_URL!, {
      headers: {
        'x-health-secret': process.env.NEXT_PUBLIC_AWS_HEALTH_SECRET!,
      },
    });
    const data = await response.json();
    return {
      isConnected: data.awsConnected,
      error: data.message,
      type: data.awsConnected ? 'success' : 'connection_error',
      message: data.message,
    };
  } catch (error) {
    return {
      isConnected: false,
      error: 'Failed to check AWS connection',
      type: 'connection_error',
    };
  }
}

export const StatusDashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
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
      <ServiceStatusCard
        serviceName="AWS"
        logoSrc="/images/service-logos/aws.svg"
        checkStatus={checkAwsConnection}
      />
    </div>
  );
};

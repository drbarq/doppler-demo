"use client";

import { useEffect, useState } from "react";

interface ServiceStatusCardProps {
  serviceName: string;
  logoSrc: string;
  checkStatus: () => Promise<{
    isConnected: boolean;
    error?: string;
    type?: string;
    message?: string;
  }>;
}

export const ServiceStatusCard = ({
  serviceName,
  logoSrc,
  checkStatus,
}: ServiceStatusCardProps) => {
  const [status, setStatus] = useState<"checking" | "connected" | "error">(
    "checking"
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errorType, setErrorType] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const result = await checkStatus();
        setStatus(result.isConnected ? "connected" : "error");
        setErrorMessage(result.error || null);
        setErrorType(result.type || null);
        setStatusMessage(result.message || null);
      } catch (error) {
        setStatus("error");
        setErrorMessage(
          error instanceof Error ? error.message : "An unknown error occurred"
        );
        setErrorType("unknown");
      }
    };

    checkConnection();
  }, [serviceName, checkStatus]);

  return (
    <div className="rounded-lg border p-4 shadow-sm">
      <div className="flex items-center space-x-4">
        <div className="h-10 w-10 flex items-center justify-center">
          <img
            src={logoSrc}
            alt={serviceName}
            className="max-h-full max-w-full"
          />
        </div>
        <div>
          <h3 className="font-semibold">{serviceName}</h3>
          <div className="flex items-center mt-1">
            {status === "checking" && (
              <span className="flex items-center text-gray-500">
                <div className="w-2 h-2 rounded-full bg-gray-400 mr-2"></div>
                Checking...
              </span>
            )}
            {status === "connected" && (
              <span className="flex items-center text-green-600">
                <div className="w-2 h-2 rounded-full bg-green-600 mr-2"></div>
                Connected
              </span>
            )}
            {status === "error" && (
              <span className="flex items-center text-red-600">
                <div className="w-2 h-2 rounded-full bg-red-600 mr-2"></div>
                Connection Error
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Show error message with appropriate styling */}
      {status === "error" && errorMessage && (
        <div
          className={`mt-2 text-sm ${
            errorType === "env_missing"
              ? "text-amber-600 bg-amber-50"
              : "text-red-600 bg-red-50"
          } rounded p-2`}
        >
          {errorMessage}
          {errorType === "env_missing" && (
            <div className="mt-1 text-xs text-amber-700">
              💡 Tip: Run with Doppler to inject environment variables without
              an .env file
            </div>
          )}
        </div>
      )}

      {/* Show success message when connected */}
      {status === "connected" && statusMessage && (
        <div className="mt-2 text-sm text-green-600 bg-green-50 rounded p-2">
          ✨ {statusMessage}
        </div>
      )}
    </div>
  );
};

function getMissingEnvVars(serviceName: string): string[] {
  const requiredVars: Record<string, string[]> = {
    Supabase: ["NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY"],
    Stripe: ["NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY", "STRIPE_SECRET_KEY"],
    SendGrid: ["SENDGRID_API_KEY", "SENDGRID_SENDER_EMAIL"],
    OpenWeatherMap: ["OPENWEATHER_API_KEY"],
  };

  const vars = requiredVars[serviceName] || [];
  return vars.filter((varName) => !process.env[varName]);
}

"use client";

import { useEffect, useState } from "react";

interface ServiceStatusCardProps {
  serviceName: string;
  logoSrc: string;
  checkStatus: () => Promise<{
    isConnected: boolean;
    stripeConnected?: boolean;
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
  const [status, setStatus] = useState<
    "checking" | "connected" | "error" | "partial"
  >("checking");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errorType, setErrorType] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const result = await checkStatus();

        // Special handling for Stripe Edge Function
        if (serviceName === "Stripe") {
          if (result.stripeConnected) {
            setStatus("connected");
          } else if (result.isConnected) {
            setStatus("partial");
            setErrorMessage(result.error || "Failed to connect to Stripe");
            setErrorType(result.type || null);
          } else {
            setStatus("error");
            setErrorMessage(
              result.error || "Failed to connect to Edge Function"
            );
            setErrorType(result.type || null);
          }
          setStatusMessage(result.message || null);
        } else {
          setStatus(result.isConnected ? "connected" : "error");
          setErrorMessage(result.error || null);
          setErrorType(result.type || null);
          setStatusMessage(result.message || null);
        }
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
            {status === "partial" && (
              <span className="flex items-center text-amber-600">
                <div className="w-2 h-2 rounded-full bg-amber-600 mr-2"></div>
                Partially Connected
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
      {(status === "error" || status === "partial") && errorMessage && (
        <div className="mt-2">
          <div className="text-red-600">{errorMessage}</div>
        </div>
      )}

      {/* Show success message when connected */}
      {status === "connected" && statusMessage && (
        <div className="mt-2 text-sm text-green-600 bg-green-50 rounded p-2">
          {statusMessage}
        </div>
      )}
    </div>
  );
};

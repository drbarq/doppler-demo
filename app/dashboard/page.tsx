import { Suspense } from "react";
import { StatusDashboard } from "../../components/dashboard/status-dashboard";
import { WeatherWidget } from "../../components/dashboard/weather-widget";
import { StripeDataTables } from "../../components/dashboard/stripe-data-tables";

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Service Status Dashboard</h1>

      <div className="space-y-10">
        <div className="flex flex-col md:flex-row md:space-x-4 md:space-y-0 space-y-4">
          <div className="flex-1">
            <Suspense fallback={<div>Loading service status...</div>}>
              <StatusDashboard />
            </Suspense>
          </div>
          <WeatherWidget />
        </div>

        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6">Stripe Dashboard</h2>
          <StripeDataTables />
        </div>
      </div>
    </div>
  );
}

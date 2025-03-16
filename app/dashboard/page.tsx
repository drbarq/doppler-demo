import { Suspense } from "react";
import { StatusDashboard } from "../../components/dashboard/status-dashboard";
import { PaymentForm } from "../../components/dashboard/payment-form";
import { WeatherWidget } from "../../components/dashboard/weather-widget";
import { StripeDataTables } from "../../components/dashboard/stripe-data-tables";

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Service Status Dashboard</h1>

      <div className="space-y-10">
        <Suspense fallback={<div>Loading service status...</div>}>
          <StatusDashboard />
        </Suspense>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <PaymentForm />
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <WeatherWidget />
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6">Stripe Dashboard</h2>
          <StripeDataTables />
        </div>
      </div>
    </div>
  );
}

import React from 'react';

export default function ArchitecturePage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Application Architecture</h1>
      
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">System Components and Connections</h2>
          <p className="text-gray-600 mb-4">
            This diagram shows the detailed connections between the Next.js frontend, API routes, Supabase Edge Functions, and external services, with a focus on Stripe integration.
          </p>
        </div>

        <div className="border border-gray-200 p-6 rounded-lg">
          <pre className="text-sm whitespace-pre overflow-x-auto">
{`
Frontend Components                API Routes                    Edge Functions               External Services
┌─────────────────┐            ┌─────────────────┐         ┌─────────────────┐          ┌─────────────────┐
│  StatusDashboard │──────────▶│/api/health/     │───────▶│stripe-health    │─────────▶│     Stripe      │
│                 │            │stripe           │         │-check           │          │     API         │
└─────────────────┘            └─────────────────┘         └─────────────────┘          └─────────────────┘
        ▲                             ▲                            ▲                             │
        │                             │                            │                             │
        │                             │                            │                             ▼
┌─────────────────┐            ┌─────────────────┐         ┌─────────────────┐          ┌─────────────────┐
│StripeDataTables │◀──────────│/api/health/     │◀────────│stripe-data      │◀─────────│  Stripe Data    │
│                 │            │stripe/[endpoint] │         │                 │          │  (Payments,     │
└─────────────────┘            └─────────────────┘         └─────────────────┘          │  Customers,     │
        │                             │                            │                     │  Products)      │
        │                             │                            │                     └─────────────────┘
        ▼                             ▼                            │                             ▲
┌─────────────────┐            ┌─────────────────┐               │                             │
│ServiceStatusCard│            │/api/health/     │               │                             │
│                 │            │supabase         │               │                             │
└─────────────────┘            └─────────────────┘               │                             │
        │                             │                          │                             │
        │                             ▼                          │                             │
        │                     ┌─────────────────┐               │                             │
        └────────────────────▶│   Supabase      │◀──────────────┘                             │
                             │   Database       │                                             │
                             └─────────────────┘                                             │
                                     │                                                       │
                                     └───────────────────────────────────────────────────────┘

Data Flow:

1. Frontend to API:
   StatusDashboard ──▶ /api/health/stripe ──▶ stripe-health-check
   StripeDataTables ──▶ /api/health/stripe/[endpoint] ──▶ stripe-data

2. Edge Functions:
   stripe-health-check:
   - Verifies Stripe API connection
   - Uses STRIPE_SECRET_KEY from environment
   
   stripe-data:
   - Handles Stripe operations (payments, customers, products)
   - Manages data retrieval and manipulation

3. Database Integration:
   - Supabase stores application data
   - Edge Functions can access both Stripe and Database
   - API routes can directly query Database when needed

4. Security Flow:
   - Stripe secret keys stored only in Edge Function environment
   - API routes act as secure middleware
   - Frontend components never have direct access to sensitive credentials
   - All Stripe operations are proxied through Edge Functions
`}
          </pre>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Component Details</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-medium mb-2">Frontend Components</h3>
              <ul className="list-disc pl-6 text-gray-600">
                <li>StatusDashboard - Displays health status of services</li>
                <li>StripeDataTables - Shows Stripe data (payments, customers, products)</li>
                <li>ServiceStatusCard - Individual service status indicators</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-medium mb-2">API Routes</h3>
              <ul className="list-disc pl-6 text-gray-600">
                <li>/api/health/supabase - Checks Supabase connection</li>
                <li>/api/health/stripe - Manages Stripe operations and health checks</li>
                <li>/api/health/stripe/[endpoint] - Dynamic endpoints for Stripe data operations</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-medium mb-2">Edge Functions</h3>
              <ul className="list-disc pl-6 text-gray-600">
                <li>stripe-health-check - Verifies Stripe API connection using secure credentials</li>
                <li>stripe-data - Handles Stripe data operations with secure access to Stripe API</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-medium mb-2">Security Features</h3>
              <ul className="list-disc pl-6 text-gray-600">
                <li>Stripe secret keys isolated in Edge Function environment</li>
                <li>API routes act as secure middleware</li>
                <li>Frontend components never have direct access to sensitive credentials</li>
                <li>All Stripe operations are proxied through Edge Functions</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-medium mb-2">External Services</h3>
              <ul className="list-disc pl-6 text-gray-600">
                <li>Supabase - Database and authentication</li>
                <li>Stripe - Payment processing and data management</li>
                <li>OpenWeatherMap - Weather data (configured but not implemented)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
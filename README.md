# Doppler Demo Dashboard

This project is a demonstration dashboard that showcases the integration of multiple services using Doppler for secrets management. The dashboard includes status monitoring, payment processing, email testing, and weather information features.

## Features

- Service Status Dashboard
  - Real-time health checks for Supabase, Stripe, SendGrid, and OpenWeatherMap
  - Visual status indicators with service logos
- Stripe Payment Integration
  - Test payment form with credit card processing
  - Real-time validation and error handling
- Weather Information Widget
  - City-based weather data display
  - Real-time weather updates from OpenWeatherMap

## Prerequisites

Before running this project, make sure you have:

- Node.js (v18 or later)
- npm or yarn
- Accounts and API keys for:
  - Supabase
  - Stripe
  - OpenWeatherMap

## Setup

1. Clone the repository:

```bash
git clone <repository-url>
cd doppler-demo
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your API keys and configuration values.

4. Run the development server:

```bash
npm run dev
# or
yarn dev
```
```
doppler run --project doppler-demo --config dev -- npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the dashboard.

## Environment Variables

The following environment variables are required:




- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase service role key
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Your Stripe publishable key
- `STRIPE_SECRET_KEY`: Your Stripe secret key
- `SENDGRID_API_KEY`: Your SendGrid API key
- `SENDGRID_FROM_EMAIL`: Your verified sender email for SendGrid
- `OPENWEATHERMAP_API_KEY`: Your OpenWeatherMap API key

## Project Structure

```
doppler-demo/
├── app/
│   ├── api/
│   │   ├── email/
│   │   └── weather/
│   └── dashboard/
├── components/
│   └── dashboard/
│       ├── email-tester.tsx
│       ├── payment-form.tsx
│       ├── status-dashboard.tsx
│       └── weather-widget.tsx
├── public/
│   └── images/
│       └── service-logos/
├── .env.example
├── package.json
└── README.md
```

## Contributing

Feel free to submit issues and enhancement requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

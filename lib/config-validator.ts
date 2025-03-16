export interface ConfigError {
  key: string;
  message: string;
  serviceName: string;
}

export const validateConfig = (): ConfigError[] => {
  const errors: ConfigError[] = [];

  // Supabase validation
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    errors.push({
      key: "NEXT_PUBLIC_SUPABASE_URL",
      message: "Supabase URL is required",
      serviceName: "Supabase",
    });
  }
  if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    errors.push({
      key: "NEXT_PUBLIC_SUPABASE_ANON_KEY",
      message: "Supabase anonymous key is required",
      serviceName: "Supabase",
    });
  }
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    errors.push({
      key: "SUPABASE_SERVICE_ROLE_KEY",
      message: "Supabase service role key is required",
      serviceName: "Supabase",
    });
  }

  // Stripe validation
  if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
    errors.push({
      key: "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY",
      message: "Stripe publishable key is required",
      serviceName: "Stripe",
    });
  }
  if (!process.env.STRIPE_SECRET_KEY) {
    errors.push({
      key: "STRIPE_SECRET_KEY",
      message: "Stripe secret key is required",
      serviceName: "Stripe",
    });
  }
  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    errors.push({
      key: "STRIPE_WEBHOOK_SECRET",
      message: "Stripe webhook secret is required",
      serviceName: "Stripe",
    });
  }

  // SendGrid validation
  if (!process.env.SENDGRID_API_KEY) {
    errors.push({
      key: "SENDGRID_API_KEY",
      message: "SendGrid API key is required",
      serviceName: "SendGrid",
    });
  }
  if (!process.env.SENDGRID_FROM_EMAIL) {
    errors.push({
      key: "SENDGRID_FROM_EMAIL",
      message: "SendGrid sender email is required",
      serviceName: "SendGrid",
    });
  }

  // OpenWeatherMap validation
  if (!process.env.OPENWEATHER_API_KEY) {
    errors.push({
      key: "OPENWEATHER_API_KEY",
      message: "OpenWeatherMap API key is required",
      serviceName: "OpenWeatherMap",
    });
  }

  // Application validation
  if (!process.env.NEXT_PUBLIC_APP_URL) {
    errors.push({
      key: "NEXT_PUBLIC_APP_URL",
      message: "Application URL is required",
      serviceName: "Application",
    });
  }

  return errors;
};

export const getServiceStatus = (serviceName: string): boolean => {
  const errors = validateConfig();
  return !errors.some((error) => error.serviceName === serviceName);
};

export const getMissingVariables = (): string[] => {
  const errors = validateConfig();
  return errors.map((error) => error.key);
};

export const getServiceErrors = (serviceName: string): ConfigError[] => {
  const errors = validateConfig();
  return errors.filter((error) => error.serviceName === serviceName);
};

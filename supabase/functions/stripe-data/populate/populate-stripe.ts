import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16' as Stripe.LatestApiVersion,
});

async function createTestCustomers() {
  const customers = [
    {
      email: 'customer1@example.com',
      name: 'John Doe',
      description: 'Test Customer 1',
    },
    {
      email: 'customer2@example.com',
      name: 'Jane Smith',
      description: 'Test Customer 2',
    },
    {
      email: 'customer3@example.com',
      name: 'Bob Johnson',
      description: 'Test Customer 3',
    },
  ];

  console.log('Creating test customers...');
  const createdCustomers = await Promise.all(
    customers.map(customer => stripe.customers.create(customer))
  );
  console.log('Created customers:', createdCustomers.map(c => c.id));
  return createdCustomers;
}

async function createTestProducts() {
  const products = [
    {
      name: 'Basic Plan',
      description: 'Basic subscription plan',
      default_price_data: {
        currency: 'usd',
        unit_amount: 999, // $9.99
        recurring: {
          interval: 'month' as const,
        },
      },
    },
    {
      name: 'Premium Plan',
      description: 'Premium subscription plan',
      default_price_data: {
        currency: 'usd',
        unit_amount: 1999, // $19.99
        recurring: {
          interval: 'month' as const,
        },
      },
    },
    {
      name: 'Enterprise Plan',
      description: 'Enterprise subscription plan',
      default_price_data: {
        currency: 'usd',
        unit_amount: 4999, // $49.99
        recurring: {
          interval: 'month' as const,
        },
      },
    },
  ];

  console.log('Creating test products...');
  const createdProducts = await Promise.all(
    products.map(product => stripe.products.create(product))
  );
  console.log('Created products:', createdProducts.map(p => p.id));
  return createdProducts;
}

async function createTestPayments(customers: Stripe.Customer[]) {
  const payments = customers.map(customer => ({
    amount: 1999,
    currency: 'usd',
    customer: customer.id,
    automatic_payment_methods: {
      enabled: true,
      allow_redirects: 'never' as const
    },
    confirm: true,
    payment_method: 'pm_card_visa', // Use a test payment method
    return_url: 'http://localhost:3000/return', // Required for some payment methods
  }));

  console.log('Creating test payments...');
  const createdPayments = await Promise.all(
    payments.map(payment => stripe.paymentIntents.create(payment))
  );
  console.log('Created payments:', createdPayments.map(p => p.id));
  return createdPayments;
}

async function populateStripeData() {
  try {
    const customers = await createTestCustomers();
    const products = await createTestProducts();
    const payments = await createTestPayments(customers);

    console.log('\nSuccessfully populated Stripe with test data!');
    console.log('Summary:');
    console.log(`- Created ${customers.length} customers`);
    console.log(`- Created ${products.length} products`);
    console.log(`- Created ${payments.length} payments`);
  } catch (error) {
    console.error('Error populating Stripe data:', error);
  }
}

// Run the population script
populateStripeData(); 
"use client";

import { useEffect, useState } from "react";

interface Payment {
  id: string;
  amount: number;
  currency: string;
  status: string;
  created: number;
  customerEmail?: string;
}

interface Customer {
  id: string;
  email?: string;
  name?: string;
  created: number;
  subscriptionStatus: string;
}

interface Product {
  id: string;
  name: string;
  description?: string;
  active: boolean;
  defaultPrice?: number;
  currency?: string;
}

interface DataTableProps<T> {
  data: T[];
  isLoading: boolean;
  error?: string;
  title: string;
}

function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount / 100);
}

function formatDate(timestamp: number) {
  return new Date(timestamp * 1000).toLocaleDateString();
}

function DataTable<T>({ data, isLoading, error, title }: DataTableProps<T>) {
  if (isLoading) {
    return (
      <div className="p-4 bg-white rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-full mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-full mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-white rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="p-4 bg-white rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <p className="text-gray-500">No data available</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow overflow-x-auto">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {Object.keys(data[0]).map((key) => (
              <th
                key={key}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {key.replace(/([A-Z])/g, " $1").trim()}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item, index) => (
            <tr key={index}>
              {Object.values(item).map((value, i) => (
                <td
                  key={i}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                >
                  {value?.toString() || "-"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function StripeDataTables() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>();

  const fetchStripeData = async () => {
    try {
      setIsLoading(true);
      setError(undefined);

      const endpoints = ["payments", "customers", "products"];
      const responses = await Promise.all(
        endpoints.map((endpoint) =>
          fetch(
            `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/stripe-data`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ endpoint }),
            }
          ).then((res) => res.json())
        )
      );

      const [paymentsRes, customersRes, productsRes] = responses;

      if (paymentsRes.success) {
        setPayments(
          paymentsRes.data.map((payment: Payment) => ({
            ...payment,
            amount: formatCurrency(payment.amount, payment.currency),
            created: formatDate(payment.created),
          }))
        );
      }

      if (customersRes.success) {
        setCustomers(
          customersRes.data.map((customer: Customer) => ({
            ...customer,
            created: formatDate(customer.created),
          }))
        );
      }

      if (productsRes.success) {
        setProducts(
          productsRes.data.map((product: Product) => ({
            ...product,
            defaultPrice:
              product.defaultPrice && product.currency
                ? formatCurrency(product.defaultPrice, product.currency)
                : undefined,
          }))
        );
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch Stripe data"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStripeData();
  }, []);

  return (
    <div className="space-y-8">
      <DataTable<Payment>
        title="Recent Payments"
        data={payments}
        isLoading={isLoading}
        error={error}
      />
      <DataTable<Customer>
        title="Customers"
        data={customers}
        isLoading={isLoading}
        error={error}
      />
      <DataTable<Product>
        title="Products"
        data={products}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
}

"use client";

import { useState } from "react";

export const EmailTester = () => {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSending(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch("/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send email");
      }

      setSuccess(true);
      setEmail("");
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h3 className="text-xl font-semibold mb-4">Test SendGrid Integration</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter your email"
            required
          />
        </div>

        {error && <div className="text-red-600 text-sm">{error}</div>}
        {success && (
          <div className="text-green-600 text-sm">Email sent successfully!</div>
        )}

        <button
          type="submit"
          disabled={sending || success}
          className={`w-full px-4 py-2 text-white rounded-md ${
            sending || success
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {sending ? "Sending..." : success ? "Email Sent!" : "Send Test Email"}
        </button>
      </form>
    </div>
  );
};

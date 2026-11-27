'use client'

import {
  CheckCircle2,
  ArrowRight,
  CalendarCheck,
  CreditCard,
  Home,
  Loader2,
  ShieldCheck,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface PaymentDetails {
  success: boolean;
  paid: boolean;
  sessionId: string;
  amount: number;
  currency: string;
  customerEmail?: string;
  paymentStatus: string;
  status: string;
}

export default function PaymentSuccessClient({
  sessionId,
}: {
  sessionId: string;
}) {

  const [payment, setPayment] = useState<PaymentDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const verifyPayment = async () => {
      if (!sessionId) {
        setError("Payment session ID is missing.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/payments/verify-session?sessionId=${encodeURIComponent(sessionId)}`
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || "Payment verification failed.");
        }

        setPayment(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong."
        );
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [sessionId]);

  const formatAmount = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.toUpperCase(),
    }).format(amount);
  };

  // Loading state
  if (loading) {
    return (
      <main className="min-h-screen bg-[#f6faf7] flex items-center justify-center px-4">
        <div className="text-center">
          <Loader2 className="mx-auto mb-5 h-12 w-12 animate-spin text-green-600" />
          <h2 className="text-xl font-bold text-gray-900">
            Verifying your payment
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Please wait while we confirm your transaction...
          </p>
        </div>
      </main>
    );
  }

  // Error state
  if (error || !payment) {
    return (
      <main className="min-h-screen bg-[#f6faf7] flex items-center justify-center px-4">
        <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-lg">
          <XCircle className="mx-auto h-16 w-16 text-red-500" />
          <h1 className="mt-5 text-2xl font-bold text-gray-900">
            Verification Failed
          </h1>
          <p className="mt-3 text-gray-500">
            {error || "We couldn't verify your payment."}
          </p>
          <Link
            href="/dashboard/customer/bookings"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-green-700 px-6 py-3 font-semibold text-white hover:bg-green-800"
          >
            View My Bookings
            <ArrowRight size={18} />
          </Link>
        </div>
      </main>
    );
  }

  // Payment pending
  if (!payment.paid) {
    return (
      <main className="min-h-screen bg-[#f6faf7] flex items-center justify-center px-4">
        <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-lg">
          <CreditCard className="mx-auto h-16 w-16 text-amber-500" />
          <h1 className="mt-5 text-2xl font-bold text-gray-900">
            Payment Processing
          </h1>
          <p className="mt-3 text-gray-500">
            Your payment is not confirmed yet. Please check your bookings
            again shortly.
          </p>
          <Link
            href="/dashboard/customer/bookings"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-green-700 px-6 py-3 font-semibold text-white hover:bg-green-800"
          >
            View My Bookings
            <ArrowRight size={18} />
          </Link>
        </div>
      </main>
    );
  }

  // Successful payment
  return (
    <main className="min-h-screen bg-[#f6faf7] px-4 py-12 flex items-center justify-center">
      <div className="w-full max-w-xl">

        <div className="rounded-3xl border border-green-100 bg-white p-7 shadow-xl sm:p-10">

          {/* Success Icon */}
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2
              size={58}
              className="text-green-600"
              strokeWidth={1.8}
            />
          </div>

          {/* Heading */}
          <div className="mt-7 text-center">
            <span className="rounded-full bg-green-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-green-700">
              Payment Confirmed
            </span>

            <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Payment Successful!
            </h1>

            <p className="mt-3 text-gray-500">
              Thank you for choosing FixMate. Your payment has been
              successfully received.
            </p>
          </div>

          {/* Amount */}
          <div className="mt-8 rounded-2xl bg-green-50 p-6 text-center">
            <p className="text-sm font-medium text-gray-500">
              Total Amount Paid
            </p>

            <h2 className="mt-2 text-4xl font-extrabold text-green-700">
              {formatAmount(payment.amount, payment.currency)}
            </h2>

            <div className="mt-3 flex items-center justify-center gap-2 text-sm text-green-700">
              <ShieldCheck size={17} />
              <span>Secure payment verified by Stripe</span>
            </div>
          </div>

          {/* Transaction Details */}
          <div className="mt-8 space-y-4">

            <h3 className="font-bold text-gray-900">
              Transaction Details
            </h3>

            <div className="flex items-start justify-between gap-4 border-b border-gray-100 pb-4">
              <span className="text-sm text-gray-500">
                Transaction ID
              </span>
              <span className="max-w-[65%] break-all text-right text-xs font-semibold text-gray-800">
                {payment.sessionId}
              </span>
            </div>

            <div className="flex justify-between border-b border-gray-100 pb-4">
              <span className="text-sm text-gray-500">
                Payment Status
              </span>
              <span className="text-sm font-semibold capitalize text-green-600">
                {payment.paymentStatus}
              </span>
            </div>

            {payment.customerEmail && (
              <div className="flex justify-between gap-4 border-b border-gray-100 pb-4">
                <span className="text-sm text-gray-500">
                  Email
                </span>
                <span className="break-all text-right text-sm font-medium text-gray-800">
                  {payment.customerEmail}
                </span>
              </div>
            )}

            <div className="flex justify-between">
              <span className="text-sm text-gray-500">
                Payment Provider
              </span>
              <span className="text-sm font-semibold text-gray-800">
                Stripe
              </span>
            </div>
          </div>

          {/* Next Steps */}
          <div className="mt-8 rounded-2xl border border-green-100 p-5">
            <div className="flex gap-3">
              <CalendarCheck
                className="shrink-0 text-green-600"
                size={22}
              />
              <div>
                <h3 className="font-bold text-gray-900">
                  What's Next?
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-gray-500">
                  You can check your booking details and payment
                  information from your customer dashboard.
                </p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <Link
              href="/dashboard/customer/bookings"
              className="flex items-center justify-center gap-2 rounded-xl bg-green-700 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-green-800"
            >
              <CalendarCheck size={18} />
              My Bookings
            </Link>

            <Link
              href="/"
              className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-5 py-3.5 text-sm font-bold text-gray-700 transition hover:bg-gray-50"
            >
              <Home size={18} />
              Back to Home
            </Link>
          </div>

          <p className="mt-7 text-center text-xs text-gray-400">
            Thank you for trusting FixMate for your service needs.
          </p>
        </div>
      </div>
    </main>
  );
}

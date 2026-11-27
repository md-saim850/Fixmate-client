
import {
  ArrowLeft,
  Wrench,
  CheckIcon,
  CreditCard,
  ShieldCheck,
  LockKeyhole,
} from "lucide-react";
import Link from "next/link";
import CheckoutButton from "./CheckoutButton";
import { getToken } from "@/lib/getToken";

interface CheckoutPageProps {
  searchParams: Promise<{
    bookingId?: string;
    canceled?: string;
  }>;
}

async function getBooking(bookingId: string) {
  const token = await getToken();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/bookings/${bookingId}`,
    {
      cache: "no-store",
      headers:{
        "Authorization": `Bearer ${token}`
      }
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch booking");
  }

  const data = await response.json();

  return data.booking;
}

export default async function CheckoutPage({
  searchParams,
}: CheckoutPageProps) {
  const { bookingId, canceled } = await searchParams;

  if (!bookingId) {
    return <div>Booking ID is required.</div>;
  }

  const booking = await getBooking(bookingId);

  return (
    <main className="min-h-screen bg-[#f8faf9] px-4 py-10">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <Link
          href="/dashboard/customer/bookings"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-green-700"
        >
          <ArrowLeft size={17} />
          Back to bookings
        </Link>

        <div className="mb-10">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex size-9 items-center justify-center rounded-xl bg-green-600 text-white">
              <Wrench size={19} />
            </div>

            <span className="text-xl font-bold tracking-tight text-gray-900">
              Fix<span className="text-green-600">Mate</span>
            </span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Complete your payment
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            You're one step away from completing your service booking.
          </p>
        </div>

        <div className="grid max-w-5xl gap-8 lg:grid-cols-5">

          {/* Checkout Information */}
          <section className="lg:col-span-3">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">

              <div className="flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-xl bg-green-50 text-green-700">
                  <CreditCard size={22} />
                </div>

                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    Payment method
                  </h2>
                  <p className="text-sm text-gray-500">
                    Secure payment powered by Stripe
                  </p>
                </div>
              </div>

              <div className="mt-7 rounded-xl border border-green-200 bg-green-50 p-5">
                <div className="flex items-start gap-3">
                  <ShieldCheck
                    size={22}
                    className="mt-0.5 shrink-0 text-green-700"
                  />

                  <div>
                    <h3 className="font-semibold text-green-900">
                      Secure Stripe Checkout
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-green-800">
                      Your payment information is securely processed
                      through Stripe. FixMate never stores your card details.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-7 space-y-4">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <CheckIcon size={17} className="text-green-600" />
                  Secure and encrypted payment
                </div>

                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <CheckIcon size={17} className="text-green-600" />
                  Payment confirmation
                </div>

                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <CheckIcon size={17} className="text-green-600" />
                  Protected booking transaction
                </div>
              </div>

              {canceled && (
                <div className="mt-6 rounded-xl bg-yellow-50 p-4 text-sm text-yellow-800">
                  Your payment was canceled. You can try again whenever
                  you're ready.
                </div>
              )}

            </div>
          </section>

          {/* Order Summary */}
          <aside className="lg:col-span-2">
            <div className="sticky top-8 rounded-2xl border border-gray-200 bg-white p-6 sm:p-7">

              <h2 className="text-lg font-bold text-gray-900">
                Order summary
              </h2>

              <div className="mt-6 rounded-xl bg-green-50 p-4">
                <div className="flex items-center justify-between">
                  <span className="rounded-md bg-green-100 px-2.5 py-1 text-xs font-bold text-green-700">
                    SERVICE BOOKING
                  </span>

                  <span className="text-xs font-medium text-green-700">
                    FixMate
                  </span>
                </div>

                <h3 className="mt-4 text-xl font-bold text-gray-900">
                  Service Payment
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Payment for your completed FixMate service.
                </p>
              </div>

              <div className="my-6 space-y-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    Booking ID
                  </p>

                  <p className="mt-2 break-all text-sm font-semibold text-gray-800">
                    {bookingId || "Booking ID missing"}
                  </p>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Payment amount</span>

                  <span className="font-semibold text-gray-900">
                    ৳{booking.finalAmount}
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-5">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-700">
                    Total
                  </span>

                  <span className="text-lg font-bold text-green-700">
                    ৳{booking.finalAmount}
                  </span>
                </div>

                {/* Stripe Checkout Button */}
                <form action="/api/checkout_sessions" method="POST">
                  <section>
                    <CheckoutButton bookingId={booking._id} />
                  </section>
                </form>

                <div className="mt-5 flex items-center justify-center gap-2 text-xs text-gray-500">
                  <LockKeyhole size={15} className="text-green-600" />
                  Secure and encrypted checkout
                </div>
              </div>
            </div>
          </aside>
        </div>

        <footer className="mt-10 text-center text-xs text-gray-400">
          © 2026 FixMate. All rights reserved.
        </footer>
      </div>
    </main>
  );
}

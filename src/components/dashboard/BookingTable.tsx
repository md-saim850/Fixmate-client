
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { CreditCard, XCircle } from "lucide-react";

import type { Booking } from "@/types/dashboard";
import {
  BookingStatus,
  PaymentStatusBadge,
} from "./BookingStatus";
import CancelBookingModal from "./CancelBookingModal";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function BookingTable() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch(
          `${API_URL}/bookings/customer`,
          { credentials: "include" }
        );

        if (!res.ok) throw new Error("Failed to load bookings");

        const data = await res.json();
        setBookings(data.bookings ?? data);
      } catch {
        toast.error("Unable to load bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const cancelBooking = async () => {
    if (!selected) return;

    setActionLoading(true);

    try {
      const res = await fetch(
        `${API_URL}/bookings/${selected}/cancel`,
        {
          method: "PATCH",
          credentials: "include",
        }
      );

      if (!res.ok) throw new Error("Cancellation failed");

      setBookings((previous) =>
        previous.map((booking) =>
          booking._id === selected
            ? { ...booking, status: "cancelled" }
            : booking
        )
      );

      toast.success("Booking cancelled successfully");
      setSelected(null);
    } catch {
      toast.error("Could not cancel this booking");
    } finally {
      setActionLoading(false);
    }
  };

  const payNow = async (bookingId: string) => {
    try {
      setActionLoading(true);

      const res = await fetch(
        `${API_URL}/payments/create-checkout-session`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ bookingId }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Payment failed");
      }

      if (!data.url) throw new Error("Checkout URL missing");

      window.location.href = data.url;
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to start payment"
      );
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-10 text-center text-gray-500">
        Loading your bookings...
      </div>
    );
  }

  if (!bookings.length) {
    return (
      <div className="rounded-2xl border border-gray-100 bg-white p-12 text-center">
        <CreditCard className="mx-auto size-10 text-emerald-500" />
        <h3 className="mt-4 font-bold text-gray-900">
          No bookings yet
        </h3>
        <p className="mt-2 text-sm text-gray-500">
          Your service bookings will appear here.
        </p>
      </div>
    );
  }

  const renderActions = (booking: Booking) => (
    <div className="flex flex-wrap items-center gap-2">
      {booking.status === "requested" && (
        <button
          onClick={() => setSelected(booking._id)}
          className="inline-flex items-center gap-1 rounded-lg border border-red-100 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50"
        >
          <XCircle size={14} />
          Cancel
        </button>
      )}

      {booking.status === "completed" &&
        booking.paymentStatus === "unpaid" && (
          <button
            disabled={actionLoading}
            onClick={() => payNow(booking._id)}
            className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
          >
            <CreditCard size={14} />
            Pay Now
          </button>
        )}

      {booking.status === "completed" &&
        booking.paymentStatus === "paid" && (
          <PaymentStatusBadge status="paid" />
        )}
    </div>
  );

  return (
    <>
      {/* Desktop table */}
      <div className="hidden overflow-x-auto rounded-2xl border border-gray-100 bg-white md:block">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-xs font-semibold uppercase text-gray-500">
            <tr>
              <th className="px-5 py-4">Service</th>
              <th className="px-5 py-4">Technician</th>
              <th className="px-5 py-4">Date</th>
              <th className="px-5 py-4">Amount</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4">Payment</th>
              <th className="px-5 py-4">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {bookings.map((booking) => (
              <tr key={booking._id} className="text-sm">
                <td className="px-5 py-4">
                  <div className="flex min-w-48 items-center gap-3">
                    <Image
                      src={booking.service.image}
                      alt={booking.service.title}
                      width={48}
                      height={48}
                      className="size-12 rounded-lg object-cover"
                    />
                    <span className="font-semibold text-gray-900">
                      {booking.service.title}
                    </span>
                  </div>
                </td>

                <td className="px-5 py-4 text-gray-600">
                  {booking.technician.name}
                </td>

                <td className="px-5 py-4 text-gray-600">
                  {new Date(booking.preferredDate).toLocaleDateString()}
                </td>

                <td className="px-5 py-4 font-semibold text-gray-900">
                  ৳{booking.finalAmount.toLocaleString()}
                </td>

                <td className="px-5 py-4">
                  <BookingStatus status={booking.status} />
                </td>

                <td className="px-5 py-4">
                  <PaymentStatusBadge status={booking.paymentStatus} />
                </td>

                <td className="px-5 py-4">
                  {renderActions(booking)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile booking cards */}
      <div className="space-y-4 md:hidden">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="rounded-2xl border border-gray-100 bg-white p-4"
          >
            <div className="flex gap-3">
              <Image
                src={booking.service.image}
                alt={booking.service.title}
                width={64}
                height={64}
                className="size-16 rounded-xl object-cover"
              />

              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-gray-900">
                  {booking.service.title}
                </h3>
                <p className="mt-1 text-xs text-gray-500">
                  {booking.technician.name}
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  {new Date(booking.preferredDate).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="my-4 flex flex-wrap gap-2">
              <BookingStatus status={booking.status} />
              <PaymentStatusBadge status={booking.paymentStatus} />
            </div>

            <div className="flex items-center justify-between border-t border-gray-100 pt-4">
              <div>
                <p className="text-xs text-gray-400">Final Amount</p>
                <p className="font-bold text-gray-900">
                  ৳{booking.finalAmount.toLocaleString()}
                </p>
              </div>

              {renderActions(booking)}
            </div>
          </div>
        ))}
      </div>

      <CancelBookingModal
        open={!!selected}
        loading={actionLoading}
        onClose={() => setSelected(null)}
        onConfirm={cancelBooking}
      />
    </>
  );
}

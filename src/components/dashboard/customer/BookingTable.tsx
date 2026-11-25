
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { CreditCard } from "lucide-react";

import type { Booking } from "@/types/dashboard";
import { BookingStatus, PaymentStatusBadge } from "./BookingStatus";
import { getClientToken } from "@/lib/get-client-token";
import RenderActions from "./RenderAction";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function BookingTable() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch customer bookings
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = await getClientToken();

        const res = await fetch(`${API_URL}/bookings/my`, {
          cache: "no-store",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to load bookings");
        }

        setBookings(data.bookings ?? data);
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Unable to load bookings"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Update bookings after successful cancellation
  const handleCancelBooking = (bookingId: string) => {
    setBookings((previous) =>
      previous.filter((booking) => booking._id !== bookingId)
    );
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
                      src={booking.serviceImage?.[0] || "/placeholder.png"}
                      alt={booking.serviceTitle}
                      width={48}
                      height={48}
                      className="size-12 rounded-lg object-cover"
                    />

                    <span className="font-semibold text-gray-900">
                      {booking.serviceTitle}
                    </span>
                  </div>
                </td>

                <td className="px-5 py-4 text-gray-600">
                  {booking.technician?.name || "Not assigned"}
                </td>

                <td className="px-5 py-4 text-gray-600">
                  {new Date(booking.serviceDate).toLocaleDateString()}
                </td>

                <td className="px-5 py-4 font-semibold text-gray-900">
                  ৳{booking.finalAmount?.toLocaleString() ?? 0}
                </td>

                <td className="px-5 py-4">
                  <BookingStatus status={booking.status} />
                </td>

                <td className="px-5 py-4">
                  <PaymentStatusBadge status={booking.paymentStatus} />
                </td>

                <td className="px-5 py-4">
                  <RenderActions
                    booking={booking}
                    onCancel={handleCancelBooking}
                  />
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
                src={booking.serviceImage?.[0] || "/placeholder.png"}
                alt={booking.serviceTitle}
                width={64}
                height={64}
                className="size-16 rounded-xl object-cover"
              />

              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-gray-900">
                  {booking.serviceTitle}
                </h3>

                <p className="mt-1 text-xs text-gray-500">
                  {booking.technician?.name || "Not assigned"}
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  {new Date(booking.serviceDate).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="my-4 flex flex-wrap gap-2">
              <BookingStatus status={booking.status} />
              <PaymentStatusBadge status={booking.paymentStatus} />
            </div>

            <div className="flex items-center justify-between border-t border-gray-100 pt-4">
              <div>
                <p className="text-xs text-gray-400">
                  Final Amount
                </p>

                <p className="font-bold text-gray-900">
                  ৳{booking.finalAmount?.toLocaleString() ?? 0}
                </p>
              </div>

              <RenderActions
                booking={booking}
                onCancel={handleCancelBooking}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

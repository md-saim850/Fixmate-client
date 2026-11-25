
"use client";

import { useState } from "react";
import { CreditCard, XCircle } from "lucide-react";
import { toast } from "sonner";
import type { Booking } from "@/types/dashboard";
import { PaymentStatusBadge } from "./BookingStatus";
import { getClientToken } from "@/lib/get-client-token";
import CancelBookingModal from "./CancelBookingModal";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface RenderActionsProps {
  booking: Booking;
  onCancel: (bookingId: string) => void;
}

export default function RenderActions({
  booking,
  onCancel,
}: RenderActionsProps) {
  const [actionLoading, setActionLoading] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  // Payment
  const payNow = async (bookingId: string) => {
    try {
      setActionLoading(true);

      const token = await getClientToken();

      const res = await fetch(
        `${API_URL}/payments/create-checkout-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ bookingId }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Payment failed");
      }

      if (!data.url) {
        throw new Error("Checkout URL missing");
      }

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

  // Cancel booking
  const cancelBooking = async () => {
    if (!selected) return;

    try {
      setActionLoading(true);

      const token = await getClientToken();

      const response = await fetch(
        `${API_URL}/bookings/${selected}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Cancellation failed");
      }

      toast.success(data.message || "Booking cancelled successfully");

      // Notify parent component to update booking list
      onCancel(selected);

      setSelected(null);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Could not cancel this booking"
      );
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      {booking.status === "requested" ? (
        <button
          onClick={() => setSelected(booking._id)}
          disabled={actionLoading}
          className="inline-flex items-center gap-1 rounded-lg border border-red-100 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50"
        >
          <XCircle size={14} />
          Cancel
        </button>
      ) : (
        <button
          disabled
          className="inline-flex cursor-not-allowed items-center gap-1 rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-400"
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

      <CancelBookingModal
        open={!!selected}
        loading={actionLoading}
        onClose={() => setSelected(null)}
        onConfirm={cancelBooking}
      />
    </div>
  );
}


"use client";

import { useState } from "react";
import { CreditCard, XCircle } from "lucide-react";
import { toast } from "sonner";
import type { Booking } from "@/types/dashboard";
import { PaymentStatusBadge } from "./BookingStatus";
import { getClientToken } from "@/lib/get-client-token";
import CancelBookingModal from "./CancelBookingModal";
import Link from "next/link";

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
  const [loading, setLoading] = useState("");

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
          <Link
            href={`/checkout?bookingId=${booking._id}`}
            className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700"
          >
            <CreditCard size={16} />
            Pay Now
          </Link>
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

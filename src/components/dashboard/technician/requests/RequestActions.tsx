
"use client";

import {
  Check,
  X,
  Play,
  CheckCircle,
  CreditCard,
} from "lucide-react";

import { Booking, BookingStatus } from "@/types/booking";

interface RequestActionsProps {
  booking: Booking;
  loading: boolean;
  onUpdate: (status: BookingStatus) => void;
  onComplete: () => void;
}

export default function RequestActions({
  booking,
  loading,
  onUpdate,
  onComplete,
}: RequestActionsProps) {
  const buttonStyle =
    "flex items-center gap-1 rounded-lg px-3 py-2 text-xs font-semibold disabled:opacity-50";

  if (booking.status === "requested") {
    return (
      <div className="flex gap-2">
        <button
          disabled={loading}
          onClick={() => onUpdate("accepted")}
          className={`${buttonStyle} bg-green-600 text-white hover:bg-green-700`}
        >
          <Check size={14} />
          Accept
        </button>

        <button
          disabled={loading}
          onClick={() => onUpdate("rejected")}
          className={`${buttonStyle} bg-red-100 text-red-700 hover:bg-red-200`}
        >
          <X size={14} />
          Reject
        </button>
      </div>
    );
  }

  if (booking.status === "accepted") {
    return (
      <button
        disabled={loading}
        onClick={() => onUpdate("in-progress")}
        className={`${buttonStyle} bg-blue-600 text-white hover:bg-blue-700`}
      >
        <Play size={14} />
        Start Work
      </button>
    );
  }

  if (booking.status === "in-progress") {
    return (
      <button
        disabled={loading}
        onClick={onComplete}
        className={`${buttonStyle} bg-green-600 text-white hover:bg-green-700`}
      >
        <CheckCircle size={14} />
        Mark Completed
      </button>
    );
  }

  if (booking.status === "completed" && booking.paymentStatus === "unpaid") {
    return (
      <button
        disabled={loading}
        onClick={onComplete}
        className={`${buttonStyle} bg-red-600 text-white hover:bg-red-700`}
      >
        <CreditCard size={14} />
        Pay Now
      </button>
    );
  }

  // Completed, rejected and cancelled have no actions
  return (
    <span className="text-xs text-gray-400">
      No action
    </span>
  );
}

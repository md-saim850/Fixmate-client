
"use client";

import { useEffect, useState } from "react";
import { CheckCircle, Loader2, X } from "lucide-react";
import { Booking } from "@/types/booking";

interface CompleteBookingModalProps {
  booking: Booking | null;
  loading: boolean;
  onClose: () => void;
  onConfirm: (amount: number) => void;
}

export default function CompleteBookingModal({
  booking,
  loading,
  onClose,
  onConfirm,
}: CompleteBookingModalProps) {
  const [amount, setAmount] = useState("");

  useEffect(() => {
    setAmount(booking ? String(booking.basePrice) : "");
  }, [booking]);

  if (!booking) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const finalAmount = Number(amount);

    if (
      amount.trim() === "" ||
      !Number.isFinite(finalAmount) ||
      finalAmount < 0
    ) {
      return;
    }

    onConfirm(finalAmount);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">
            Complete Service
          </h2>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-lg p-2 text-gray-400 hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        <p className="mb-5 text-sm text-gray-500">
          Enter the final amount for{" "}
          <span className="font-semibold text-gray-800">
            {booking.serviceTitle}
          </span>.
        </p>

        <div className="mb-5 rounded-xl bg-green-50 p-4">
          <p className="text-sm text-gray-500">
            Original base price
          </p>

          <p className="mt-1 text-xl font-bold text-green-700">
            ৳{booking.basePrice}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <label
            htmlFor="finalAmount"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            Final Amount (৳)
          </label>

          <input
            id="finalAmount"
            type="number"
            min="0"
            step="0.01"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter final amount"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
          />

          <div className="mt-6 flex gap-3">
            <button
              type="button"
              disabled={loading}
              onClick={onClose}
              className="flex-1 rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={
                loading ||
                amount.trim() === "" ||
                !Number.isFinite(Number(amount)) ||
                Number(amount) < 0
              }
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 size={17} className="animate-spin" />
              ) : (
                <CheckCircle size={17} />
              )}

              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

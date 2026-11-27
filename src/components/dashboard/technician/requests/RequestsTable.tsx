
"use client";

import { Loader2, ClipboardList } from "lucide-react";
import { Booking, BookingStatus } from "@/types/booking";
import RequestRow from "./RequestRow";

interface RequestsTableProps {
  bookings: Booking[];
  loading: boolean;
  actionLoading: string | null;
  onUpdate: (
    bookingId: string,
    status: BookingStatus
  ) => void;
  onComplete: (booking: Booking) => void;
}

export default function RequestsTable({
  bookings,
  loading,
  actionLoading,
  onUpdate,
  onComplete,
}: RequestsTableProps) {
  if (loading) {
    return (
      <div className="flex min-h-64 items-center justify-center rounded-xl border bg-white">
        <Loader2 className="animate-spin text-green-600" size={32} />
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="flex min-h-64 flex-col items-center justify-center rounded-xl border bg-white p-6 text-center">
        <ClipboardList size={42} className="mb-3 text-gray-300" />

        <h3 className="font-semibold text-gray-800">
          No requests found
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          You don't have any bookings in this category.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1250px] text-left text-sm">
          <thead className="bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-5 py-4">Customer</th>
              <th className="px-5 py-4">Service</th>
              <th className="px-5 py-4">Address</th>
              <th className="px-5 py-4">Preferred Date</th>
              <th className="px-5 py-4">Problem</th>
              <th className="px-5 py-4">Amount</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4">Payment</th>
              <th className="px-5 py-4">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {bookings.map((booking) => (
              <RequestRow
                key={booking._id}
                booking={booking}
                loading={actionLoading === booking._id}
                onUpdate={(status) =>
                  onUpdate(booking._id, status)
                }
                onComplete={() => onComplete(booking)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { adminFetch } from "@/lib/admin-api";
import type { AdminBooking } from "@/types/admin";
import AdminStatusBadge from "../AdminStatusBadge";

export default function BookingsTable() {
  const [bookings, setBookings] = useState<AdminBooking[]>([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBookings = async () => {
      setLoading(true);

      try {
        const data = await adminFetch<AdminBooking[]>(
          `/admin/bookings?status=${filter}`
        );

        setBookings(data);
      } catch {
        toast.error("Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };

    getBookings();
  }, [filter]);

  return (
    <div>
      <div className="mb-5 flex justify-end">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm"
        >
          <option value="all">All Bookings</option>
          <option value="pending">Pending</option>
          <option value="accepted">Accepted</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">
        <table className="w-full min-w-[1000px] text-left text-sm">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="px-5 py-4">Service</th>
              <th className="px-5 py-4">Customer</th>
              <th className="px-5 py-4">Technician</th>
              <th className="px-5 py-4">Date</th>
              <th className="px-5 py-4">Amount</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4">Payment</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {bookings.map((booking) => (
              <tr key={booking._id} className="hover:bg-gray-50">
                <td className="px-5 py-4 font-medium text-gray-900">
                  {booking.service?.title || "Unknown"}
                </td>

                <td className="px-5 py-4 text-gray-600">
                  {booking.customer?.name || "Unknown"}
                </td>

                <td className="px-5 py-4 text-gray-600">
                  {booking.technician?.name || "Unknown"}
                </td>

                <td className="px-5 py-4 text-gray-600">
                  {new Date(booking.serviceDate).toLocaleDateString()}
                </td>

                <td className="px-5 py-4 font-medium text-gray-900">
                  ৳{booking.amount?.toLocaleString() ?? 0}
                </td>

                <td className="px-5 py-4">
                  <AdminStatusBadge status={booking.status} />
                </td>

                <td className="px-5 py-4">
                  <AdminStatusBadge status={booking.paymentStatus} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {!loading && bookings.length === 0 && (
          <p className="p-8 text-center text-gray-500">
            No bookings found.
          </p>
        )}

        {loading && (
          <p className="p-8 text-center text-gray-500">
            Loading bookings...
          </p>
        )}
      </div>
    </div>
  );
}
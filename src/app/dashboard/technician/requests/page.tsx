
"use client";

import { useCallback, useEffect, useState } from "react";
import { ClipboardList, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { getClientToken } from "@/lib/get-client-token";

import {
  Booking,
  BookingFilter,
  BookingStatus,
} from "@/types/booking";

import RequestFilters from "@/components/dashboard/technician/requests/RequestFilters";
import RequestsTable from "@/components/dashboard/technician/requests/RequestsTable";
import CompleteBookingModal from "@/components/dashboard/technician/requests/CompleteBookingModal";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function TechnicianRequestsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filter, setFilter] = useState<BookingFilter>("all");

  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const [selectedBooking, setSelectedBooking] =
    useState<Booking | null>(null);

  const getRequests = useCallback(async () => {
    try {
      setLoading(true);

      const token = await getClientToken();

      const query = filter === "all" ? "" : `?status=${filter}`;

      const response = await fetch(
        `${API_URL}/technician/${query}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch bookings");
      }

      setBookings(data.bookings || []);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    getRequests();
  }, [getRequests]);

  const updateStatus = async (
    bookingId: string,
    status: BookingStatus,
    finalAmount?: number
  ) => {
    try {
      setActionLoading(bookingId);

      const token = await getClientToken();

      const response = await fetch(
        `${API_URL}/technician/${bookingId}/status`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status,
            ...(status === "completed" && { finalAmount }),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update booking");
      }

      toast.success(data.message || "Booking updated successfully");

      setSelectedBooking(null);

      await getRequests();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );
    } finally {
      setActionLoading(null);
    }
  };

  const handleComplete = async (amount: number) => {
    if (!selectedBooking) return;

    await updateStatus(
      selectedBooking._id,
      "completed",
      amount
    );
  };

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">

      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Manage Requests
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage customer bookings and service requests.
          </p>
        </div>

        <div className="flex items-center gap-3 rounded-xl border border-green-100 bg-green-50 px-5 py-3">
          <ClipboardList size={25} className="text-green-600" />

          <div>
            <p className="text-xs text-gray-500">
              {filter === "all" ? "Total Requests" : "Filtered Requests"}
            </p>

            <p className="text-xl font-bold text-green-700">
              {loading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                bookings.length
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <RequestFilters
        filter={filter}
        onFilterChange={setFilter}
      />

      {/* Bookings table */}
      <RequestsTable
        bookings={bookings}
        loading={loading}
        actionLoading={actionLoading}
        onUpdate={(bookingId, status) =>
          updateStatus(bookingId, status)
        }
        onComplete={setSelectedBooking}
      />

      {/* Complete booking modal */}
      <CompleteBookingModal
        booking={selectedBooking}
        loading={
          selectedBooking
            ? actionLoading === selectedBooking._id
            : false
        }
        onClose={() => setSelectedBooking(null)}
        onConfirm={handleComplete}
      />

    </div>
  );
}

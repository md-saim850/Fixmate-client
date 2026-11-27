
"use client";

import { MapPin, Phone, CalendarDays } from "lucide-react";
import { Booking, BookingStatus } from "@/types/booking";
import RequestActions from "./RequestActions";

interface RequestRowProps {
  booking: Booking;
  loading: boolean;
  onUpdate: (status: BookingStatus) => void;
  onComplete: () => void;
}

const statusStyles: Record<BookingStatus, string> = {
  requested: "bg-amber-100 text-amber-700",
  accepted: "bg-blue-100 text-blue-700",
  "in-progress": "bg-purple-100 text-purple-700",
  completed: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
  cancelled: "bg-gray-100 text-gray-600",
};

export default function RequestRow({
  booking,
  loading,
  onUpdate,
  onComplete,
}: RequestRowProps) {
  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  return (
    <tr className="align-top border-b border-gray-100 hover:bg-gray-50">
      {/* Customer */}
      <td className="px-5 py-4">
        <p className="font-semibold text-gray-900">
          {booking.customerName}
        </p>
        <p className="mt-1 flex items-center gap-1 text-xs text-gray-500">
          <Phone size={13} />
          {booking.customer.phone}
        </p>
      </td>

      {/* Service */}
      <td className="px-5 py-4 font-medium text-gray-800">
        {booking.serviceTitle}
      </td>

      {/* Address */}
      <td className="max-w-48 px-5 py-4">
        <p className="flex gap-1 text-gray-600">
          <MapPin size={14} className="mt-1 shrink-0 text-green-600" />
          {booking.address}
        </p>
      </td>

      {/* Preferred date */}
      <td className="whitespace-nowrap px-5 py-4">
        <p className="flex items-center gap-1 text-gray-600">
          <CalendarDays size={14} />
          {formatDate(booking.serviceDate)}
        </p>
      </td>

      {/* Problem description */}
      <td className="max-w-52 px-5 py-4">
        <p className="line-clamp-3 text-gray-600">
          {booking.problemDescription}
        </p>
      </td>

      {/* Amount */}
      <td className="whitespace-nowrap px-5 py-4 font-semibold text-gray-800">
        ৳{booking.finalAmount ?? booking.basePrice}
      </td>

      {/* Status */}
      <td className="px-5 py-4">
        <span
          className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold capitalize ${
            statusStyles[booking.status]
          }`}
        >
          {booking.status.replace("-", " ")}
        </span>
      </td>

      {/* Payment badge */}
      <td className="px-5 py-4">
        {booking.status === "completed" ? (
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
              booking.paymentStatus  === "paid"
                ? "bg-green-100 text-green-700"
                : "bg-amber-100 text-amber-700"
            }`}
          >
            {booking.paymentStatus}
          </span>
        ) : (
          <span className="text-gray-300">—</span>
        )}
      </td>

      {/* Actions */}
      <td className="px-5 py-4">
        <RequestActions
          booking={booking}
          loading={loading}
          onUpdate={onUpdate}
          onComplete={onComplete}
        />
      </td>
    </tr>
  );
}

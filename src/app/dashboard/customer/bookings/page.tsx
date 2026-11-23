
import BookingTable from "@/components/dashboard/BookingTable";
import { CalendarDays } from "lucide-react";

export default function CustomerBookingsPage() {
  return (
    <div className="space-y-7">
      <div>
        <div className="flex items-center gap-2 text-emerald-600">
          <CalendarDays size={19} />
          <span className="text-sm font-semibold">
            Booking Management
          </span>
        </div>

        <h2 className="mt-2 text-2xl font-bold text-gray-900">
          My Bookings
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          View and manage all your service requests.
        </p>
      </div>

      <BookingTable />
    </div>
  );
}

import AdminHeader from "@/components/dashboard/admin/AdminHeader";
import BookingsTable from "@/components/dashboard/admin/bookings/BookingsTable";

export default function AdminBookingsPage() {
  return (
    <>
      <AdminHeader
        title="All Bookings"
        description="Monitor all customer and technician bookings."
      />

      <BookingsTable />
    </>
  );
}

import type {
  BookingStatus,
  PaymentStatus,
} from "@/types/dashboard";

const statusStyles: Record<BookingStatus, string> = {
  requested: "bg-amber-50 text-amber-700",
  accepted: "bg-blue-50 text-blue-700",
  "in-progress": "bg-purple-50 text-purple-700",
  completed: "bg-emerald-50 text-emerald-700",
  rejected: "bg-red-50 text-red-700",
  cancelled: "bg-gray-100 text-gray-600",
};

const paymentStyles: Record<PaymentStatus, string> = {
  paid: "bg-emerald-50 text-emerald-700",
  unpaid: "bg-orange-50 text-orange-700",
};

export function BookingStatus({
  status,
}: {
  status: BookingStatus;
}) {
  const labels: Record<BookingStatus, string> = {
    requested: "Requested",
    accepted: "Accepted",
    "in-progress": "In Progress",
    completed: "Completed",
    rejected: "Rejected",
    cancelled: "Cancelled",
  };

  return (
    <span className={`rounded-full px-3 py-1.5 text-xs font-semibold ${statusStyles[status]}`}>
      {labels[status]}
    </span>
  );
}

export function PaymentStatusBadge({
  status,
}: {
  status: PaymentStatus;
}) {
  return (
    <span className={`rounded-full px-3 py-1.5 text-xs font-semibold ${paymentStyles[status]}`}>
      {status === "paid" ? "Paid" : "Unpaid"}
    </span>
  );
}

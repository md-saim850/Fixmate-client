interface Props {
  status: string;
}

const statusStyles: Record<string, string> = {
  pending: "bg-yellow-50 text-yellow-700",
  approved: "bg-green-50 text-green-700",
  rejected: "bg-red-50 text-red-700",
  accepted: "bg-blue-50 text-blue-700",
  "in-progress": "bg-indigo-50 text-indigo-700",
  completed: "bg-green-50 text-green-700",
  cancelled: "bg-red-50 text-red-700",
  paid: "bg-green-50 text-green-700",
  failed: "bg-red-50 text-red-700",
  customer: "bg-blue-50 text-blue-700",
  technician: "bg-purple-50 text-purple-700",
  admin: "bg-green-50 text-green-700",
};

export default function AdminStatusBadge({ status }: Props) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
        statusStyles[status] || "bg-gray-100 text-gray-600"
      }`}
    >
      {status.replaceAll("-", " ")}
    </span>
  );
}
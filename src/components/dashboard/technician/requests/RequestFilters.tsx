
"use client";

import { BookingFilter } from "@/types/booking";

interface RequestFiltersProps {
  filter: BookingFilter;
  onFilterChange: (filter: BookingFilter) => void;
}

const filters: { label: string; value: BookingFilter }[] = [
  { label: "All", value: "all" },
  { label: "Requested", value: "requested" },
  { label: "Accepted", value: "accepted" },
  { label: "In Progress", value: "in-progress" },
  { label: "Completed", value: "completed" },
];

export default function RequestFilters({
  filter,
  onFilterChange,
}: RequestFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((item) => (
        <button
          key={item.value}
          onClick={() => onFilterChange(item.value)}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
            filter === item.value
              ? "bg-green-600 text-white"
              : "border border-gray-200 bg-white text-gray-600 hover:bg-green-50 hover:text-green-700"
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

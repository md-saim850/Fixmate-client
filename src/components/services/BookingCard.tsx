
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, ShieldCheck, Wallet } from "lucide-react";
import { toast } from "sonner";
import type { Service } from "@/types/service";

export function BookingCard({ service }: { service: Service }) {
  const router = useRouter();
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  const handleBooking = async () => {
    if (!date) {
      toast.error("Please select a service date.");
      return;
    }

    setLoading(true);

    // Demo navigation. Connect your booking API here.
    router.push(
      `/sign-in?service=${service.id}&date=${date}`
    );

    setLoading(false);
  };

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <p className="text-sm text-gray-500">Starting from</p>

      <div className="mt-1 flex items-baseline gap-1">
        <span className="text-3xl font-extrabold text-gray-900">
          ৳{service.basePrice.toLocaleString("en-BD")}
        </span>
        <span className="text-xs text-gray-500">/ service</span>
      </div>

      <p className="mt-2 text-xs text-gray-500">
        Final price may vary depending on the repair.
      </p>

      <div className="my-6 border-t border-gray-100" />

      <label className="mb-2 block text-sm font-semibold">
        Preferred service date
      </label>

      <div className="relative">
        <CalendarDays
          size={17}
          className="absolute left-3 top-3 text-gray-400"
        />
        <input
          type="date"
          value={date}
          min={new Date().toISOString().split("T")[0]}
          onChange={(e) => setDate(e.target.value)}
          className="h-11 w-full rounded-xl border border-gray-200 pl-10 pr-3 text-sm outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
        />
      </div>

      <button
        onClick={handleBooking}
        disabled={loading}
        className="mt-5 flex h-12 w-full items-center justify-center rounded-xl bg-green-600 px-5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-green-700 hover:shadow-md active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-green-600 disabled:hover:shadow-none"
      >
        {loading ? "Please wait..." : "Book this service"}
      </button>

      <div className="mt-5 space-y-3 text-xs text-gray-500">
        <p className="flex items-center gap-2">
          <ShieldCheck size={16} className="text-green-600" />
          Verified service providers
        </p>

        <p className="flex items-center gap-2">
          <Wallet size={16} className="text-green-600" />
          Pay after service completion
        </p>
      </div>
    </div>
  );
}

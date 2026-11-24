
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, ShieldCheck, Wallet, MapPin } from "lucide-react";
import { toast } from "sonner";
import type { Service } from "@/types/service";
import { getClientToken } from "@/lib/get-client-token";

export function BookingCard({ service }: { service: Service }) {
  const router = useRouter();
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [problemDescription, setProblemDescription] = useState("");
  const [address, setAddress] = useState("");

const handleBooking = async () => {
  if (!date || !problemDescription.trim() || !address.trim()) {
    toast.error("Please fill in all required fields");
    return;
  }

  try {
    setLoading(true);

    const bookingData = {
      serviceId: service._id,
      serviceTitle: service.title,
      serviceDate: date,
      problemDescription,
      address,
      basePrice: service.basePrice,
      status: "pending",
      createdAt: new Date(),
    };

    const token = await getClientToken();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", 
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(bookingData),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to create booking");
    }

    toast.success("Booking request submitted successfully!");

    // Reset form
    setDate("");
    setProblemDescription("");
    setAddress("");

  } catch (error) {
    console.error("Booking error:", error);
    toast.error(
      error instanceof Error
        ? error.message
        : "Something went wrong!"
    );
  } finally {
    setLoading(false);
  }
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

      {/* Preferred Date */}
      <label className="mb-2 block text-sm font-semibold text-gray-800">
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

      {/* Problem Description */}
      <div className="mt-5">
        <label className="mb-2 block text-sm font-semibold text-gray-800">
          Describe your problem
          <span className="ml-1 text-red-500">*</span>
        </label>

        <textarea
          value={problemDescription}
          onChange={(e) => setProblemDescription(e.target.value)}
          placeholder="Describe the issue you're experiencing..."
          rows={4}
          required
          className="w-full resize-none rounded-xl border border-gray-200 p-3 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
        />
        <p className="mt-1 text-xs text-gray-400">
          Provide details to help the technician understand your issue.
        </p>
      </div>

      {/* Service Address */}
      <div className="mt-5">
        <label className="mb-2 block text-sm font-semibold text-gray-800">
          Service address
          <span className="ml-1 text-red-500">*</span>
        </label>

        <div className="relative">
          <MapPin
            size={17}
            className="absolute left-3 top-3 text-gray-400"
          />
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your full address"
            required
            className="h-11 w-full rounded-xl border border-gray-200 pl-10 pr-3 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
          />
        </div>
        <p className="mt-1 text-xs text-gray-400">
          Enter your area, road, house number, and city.
        </p>
      </div>

      {/* Booking Button */}
      <button
        onClick={handleBooking}
        disabled={loading || !date || !problemDescription.trim() || !address.trim()}
        className="mt-6 flex h-12 w-full items-center justify-center rounded-xl bg-green-600 px-5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-green-700 hover:shadow-md active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Please wait..." : "Book this service"}
      </button>

      {/* Trust Indicators */}
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

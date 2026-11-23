
import Link from "next/link";
import {
  CalendarDays,
  ArrowRight,
  Wrench,
  ShieldCheck,
} from "lucide-react";

import DashboardStats from "@/components/dashboard/DashboardStats";

export default function CustomerDashboard() {
  // Replace with statistics from your bookings API.
  const stats = {
    totalRequests: 12,
    activeJobs: 3,
    completedJobs: 8,
  };

  return (
    <div className="space-y-8">
      <section>
        <p className="text-sm font-medium text-emerald-600">
          Customer Workspace
        </p>

        <h2 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
          Welcome back!
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Here's an overview of your service activities.
        </p>
      </section>

      <DashboardStats
        totalRequests={stats.totalRequests}
        activeJobs={stats.activeJobs}
        completedJobs={stats.completedJobs}
      />

      <section className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-2xl bg-emerald-600 p-7 text-white">
          <div className="flex size-12 items-center justify-center rounded-xl bg-white/15">
            <Wrench size={24} />
          </div>

          <h3 className="mt-5 text-xl font-bold">
            Need a home service?
          </h3>

          <p className="mt-2 max-w-sm text-sm leading-6 text-emerald-50">
            Find trusted technicians and book professional
            services for your home.
          </p>

          <Link
            href="/services"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
          >
            Explore Services <ArrowRight size={17} />
          </Link>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-7">
          <div className="flex size-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <ShieldCheck size={24} />
          </div>

          <h3 className="mt-5 text-xl font-bold text-gray-900">
            Your bookings, organized
          </h3>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            Track your requests, check technician updates,
            and manage your payments in one place.
          </p>

          <Link
            href="/dashboard/customer/bookings"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700"
          >
            View My Bookings <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </div>
  );
}

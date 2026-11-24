
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BriefcaseBusiness,
  CheckCircle2,
  Clock,
  Plus,
  ArrowRight,
  Wrench,
} from "lucide-react";
import { toast } from "sonner";

import StatCard from "@/components/dashboard/customer/StatCard";
import type { TechnicianStats } from "@/types/dashboard";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function TechnicianDashboard() {
  const [stats, setStats] = useState<TechnicianStats>({
    totalServices: 0,
    approvedServices: 0,
    pendingRequests: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch(
          `${API_URL}/services/technician/stats`,
          { credentials: "include" }
        );

        if (!res.ok) throw new Error("Failed to fetch statistics");

        const data = await res.json();
        setStats(data);
      } catch {
        toast.error("Unable to load dashboard statistics");
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  return (
    <div className="space-y-8">
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-semibold text-emerald-600">
            Technician Workspace
          </p>

          <h2 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
            Technician Dashboard
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Manage your services and track their approval status.
          </p>
        </div>

        <Link
          href="/dashboard/technician/add-service"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
        >
          <Plus size={18} />
          Add New Service
        </Link>
      </section>

      {loading ? (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-40 animate-pulse rounded-2xl bg-gray-100"
            />
          ))}
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          <StatCard
            title="Total Services"
            value={stats.totalServices}
            description="All services you have created"
            icon={BriefcaseBusiness}
          />

          <StatCard
            title="Approved Services"
            value={stats.approvedServices}
            description="Services visible to customers"
            icon={CheckCircle2}
          />

          <StatCard
            title="Pending Requests"
            value={stats.pendingRequests}
            description="Services waiting for admin approval"
            icon={Clock}
          />
        </div>
      )}

      <section className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-2xl bg-emerald-600 p-7 text-white">
          <div className="flex size-12 items-center justify-center rounded-xl bg-white/15">
            <Wrench size={24} />
          </div>

          <h3 className="mt-5 text-xl font-bold">
            Grow your service business
          </h3>

          <p className="mt-2 text-sm leading-6 text-emerald-50">
            Add your professional services and reach more customers
            through FixMate.
          </p>

          <Link
            href="/dashboard/technician/add-service"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-emerald-700 hover:bg-emerald-50"
          >
            Create Service <ArrowRight size={17} />
          </Link>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-7">
          <div className="flex size-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <BriefcaseBusiness size={24} />
          </div>

          <h3 className="mt-5 text-xl font-bold text-gray-900">
            Manage your services
          </h3>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            Update service information, manage availability, and
            monitor approval status.
          </p>

          <Link
            href="/dashboard/technician/my-services"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700"
          >
            Manage Services <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </div>
  );
}

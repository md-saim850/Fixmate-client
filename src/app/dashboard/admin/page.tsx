import {
  Users,
  Wrench,
  Clock,
} from "lucide-react";

import AdminHeader from "@/components/dashboard/admin/AdminHeader";
import AdminStatCard from "@/components/dashboard/admin/AdminStatCard";
import { adminFetch } from "@/lib/admin-api";

import type { AdminStatus } from "@/types/admin";
const getStatus = async () => {
  try {
    const data = await adminFetch<AdminStatus>("/admin/status");
    return data;
  } catch (error) {
    console.error("Failed to fetch admin status:", error);
  }
};

export default async function AdminDashboard() {
  const status = await getStatus();

  if(!status) return;

  return (
    <>
      <AdminHeader
        title="Dashboard Overview"
        description="Monitor and manage your FixMate platform."
      />

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        <AdminStatCard
          title="Total Users"
          value={status.status.totalUsers}
          icon={Users}
          description="All registered users"
        />

        <AdminStatCard
          title="Total Technicians"
          value={status.status.totalTechnicians}
          icon={Wrench}
          description="Registered technicians"
        />

        <AdminStatCard
          title="Pending Services"
          value={status.status.pendingServices}
          icon={Clock}
          description="Services waiting for approval"
        />
      </div>
      
      <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Admin Control Center
        </h2>

        <p className="mt-2 text-sm leading-6 text-gray-500">
          Manage platform users, review technician services,
          monitor bookings, and track transactions from the
          administration dashboard.
        </p>
      </div>
    </>
  );
}
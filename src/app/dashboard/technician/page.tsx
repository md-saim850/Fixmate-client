import Link from "next/link";
import {
  BriefcaseBusiness,
  CheckCircle2,
  Clock,
  Plus,
  ArrowRight,
  Wrench,
} from "lucide-react";

import StatCard from "@/components/dashboard/customer/StatCard";
import { getToken } from "@/lib/getToken";

const getStatus = async () => {
  try {
    const token = await getToken();
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/technician/status`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch technician status");
    }

    const data = await response.json();;
    return data;

  } catch (error) {
    console.error("Get technician status error:", error);
  }
};

export default async function TechnicianDashboard() {

  const status = await getStatus();

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


      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard
          title="Total Services"
          value={status.totalServices}
          description="All services you have created"
          icon={BriefcaseBusiness}
        />

        <StatCard
          title="Approved Services"
          value={status.approvalServices}
          description="Services visible to customers"
          icon={CheckCircle2}
        />

        <StatCard
          title="Pending Requests"
          value={status.pendingRequests}
          description="Services waiting for admin approval"
          icon={Clock}
        />
      </div>

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

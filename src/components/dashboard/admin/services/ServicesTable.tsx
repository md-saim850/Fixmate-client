"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { adminFetch } from "@/lib/admin-fetch.client";
import type {
  AdminService,
  ApprovalStatus,
} from "@/types/admin";
import AdminStatusBadge from "../AdminStatusBadge";
import Loading from "@/app/dashboard/loading"

export default function ServicesTable() {
  const [services, setServices] = useState<AdminService[]>([]);
  const [filter, setFilter] = useState("pending");
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const getServices = async () => {
    setLoading(true);

    try {
      let data: { services: AdminService[] };
      if(filter === "all"){
        data = await adminFetch<{ services: AdminService[] }>(
          `/admin/services`
        );
      }
      else{
        data = await adminFetch<{ services: AdminService[] }>(
          `/admin/services?approvalStatus=${filter}`
        );
      }

      setServices(data.services);
    } catch {
      toast.error("Failed to load services");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getServices();
  }, [filter]);

  const updateApproval = async (
    id: string,
    approvalStatus: ApprovalStatus
  ) => {
    setActionLoading(id);

    try {
      await adminFetch(`/admin/services/${id}/approval`, {
        method: "PATCH",
        body: JSON.stringify({ approvalStatus }),
      });

      toast.success(
        `Service ${approvalStatus} successfully`
      );

      await getServices();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Update failed"
      );
    } finally {
      setActionLoading(null);
    }
  };

  if(loading){
    return(
      <Loading />
    )
  }
  
  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-gray-500">
          Review services submitted by technicians.
        </p>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm"
        >
          <option value="pending">Pending Services</option>
          <option value="approved">Approved Services</option>
          <option value="rejected">Rejected Services</option>
          <option value="all">All Services</option>
        </select>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">
        <table className="w-full min-w-[850px] text-left text-sm">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="px-5 py-4">Service</th>
              <th className="px-5 py-4">Technician</th>
              <th className="px-5 py-4">Category</th>
              <th className="px-5 py-4">Price</th>
              <th className="px-5 py-4">Approval</th>
              <th className="px-5 py-4">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {services.map((service) => (
              <tr key={service._id} className="hover:bg-gray-50">
                <td className="px-5 py-4 font-medium text-gray-900">
                  {service.title}
                </td>

                <td className="px-5 py-4 text-gray-600">
                  {service.technician?.name || "Unknown"}
                </td>

                <td className="px-5 py-4 text-gray-600">
                  {service.category}
                </td>

                <td className="px-5 py-4 text-gray-700">
                  ৳{service.basePrice.toLocaleString()}
                </td>

                <td className="px-5 py-4">
                  <AdminStatusBadge status={service.approvalStatus} />
                </td>

                <td className="px-5 py-4">
                  <div className="flex gap-2">
                    <button
                      disabled={actionLoading === service._id}
                      onClick={() =>
                        updateApproval(service._id, "approved")
                      }
                      className="rounded-lg bg-green-600 px-3 py-2 text-xs font-medium text-white hover:bg-green-700 disabled:opacity-50"
                    >
                      Approve
                    </button>

                    <button
                      disabled={actionLoading === service._id}
                      onClick={() =>
                        updateApproval(service._id, "rejected")
                      }
                      className="rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-100 disabled:opacity-50"
                    >
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {!loading && services.length === 0 && (
          <p className="p-8 text-center text-gray-500">
            No services found.
          </p>
        )}

        {loading && (
          <p className="p-8 text-center text-gray-500">
            Loading services...
          </p>
        )}
      </div>
    </div>
  );
}
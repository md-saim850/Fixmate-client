
"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import {
  Pencil,
  Trash2,
  Power,
  Loader2,
  BriefcaseBusiness,
} from "lucide-react";
import { toast } from "sonner";

import type {
  TechnicianService,
  DashboardUser,
} from "@/types/dashboard";

import ApprovalBadge from "./ApprovalBadge";
import DeleteServiceModal from "./DeleteServiceModal";
import ServiceForm from "./ServiceForm";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Props {
  technician: Pick<DashboardUser, "name" | "email">;
}

export default function MyServicesTable({ technician }: Props) {
  const [services, setServices] = useState<TechnicianService[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<TechnicianService | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);

  const fetchServices = useCallback(async () => {
    try {
      const res = await fetch(
        `${API_URL}/services/technician/my-services`,
        { credentials: "include", cache: "no-store" }
      );

      if (!res.ok) throw new Error("Failed to fetch services");

      const data = await res.json();
      setServices(data.services ?? data);
    } catch {
      toast.error("Unable to load your services");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  // Delete service
  const deleteService = async () => {
    if (!deleteId) return;

    setActionLoading(true);

    try {
      const res = await fetch(
        `${API_URL}/services/${deleteId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!res.ok) throw new Error("Delete failed");

      setServices((prev) =>
        prev.filter((service) => service._id !== deleteId)
      );

      toast.success("Service deleted successfully");
      setDeleteId(null);
    } catch {
      toast.error("Unable to delete service");
    } finally {
      setActionLoading(false);
    }
  };

  // Toggle availability
  const toggleAvailability = async (service: TechnicianService) => {
    const newValue = !service.isAvailable;

    setBusyId(service._id);

    try {
      const res = await fetch(
        `${API_URL}/services/${service._id}/availability`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isAvailable: newValue }),
        }
      );

      if (!res.ok) throw new Error("Update failed");

      setServices((prev) =>
        prev.map((item) =>
          item._id === service._id
            ? { ...item, isAvailable: newValue }
            : item
        )
      );

      toast.success(
        newValue
          ? "Service is now available"
          : "Service is now unavailable"
      );
    } catch {
      toast.error("Unable to update availability");
    } finally {
      setBusyId(null);
    }
  };

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-12 text-center text-gray-500">
        <Loader2 className="mx-auto animate-spin" />
        <p className="mt-3 text-sm">Loading your services...</p>
      </div>
    );
  }

  return (
    <>
      {services.length === 0 ? (
        <div className="rounded-2xl border border-gray-100 bg-white p-12 text-center">
          <BriefcaseBusiness className="mx-auto size-10 text-emerald-500" />

          <h3 className="mt-4 font-bold text-gray-900">
            No services found
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            You haven't added any services yet.
          </p>
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden overflow-x-auto rounded-2xl border border-gray-100 bg-white md:block">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-xs font-semibold uppercase text-gray-500">
                <tr>
                  <th className="px-5 py-4">Service</th>
                  <th className="px-5 py-4">Category</th>
                  <th className="px-5 py-4">Base Price</th>
                  <th className="px-5 py-4">Approval</th>
                  <th className="px-5 py-4">Availability</th>
                  <th className="px-5 py-4">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {services.map((service) => (
                  <tr key={service._id} className="text-sm">
                    <td className="px-5 py-4">
                      <div className="flex min-w-48 items-center gap-3">
                        <Image
                          src={service.image}
                          alt={service.title}
                          width={48}
                          height={48}
                          className="size-12 rounded-lg object-cover"
                        />

                        <span className="font-semibold text-gray-900">
                          {service.title}
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {service.category}
                    </td>

                    <td className="px-5 py-4 font-semibold text-gray-900">
                      ৳{service.basePrice.toLocaleString()}
                    </td>

                    <td className="px-5 py-4">
                      <ApprovalBadge status={service.approvalStatus} />
                    </td>

                    <td className="px-5 py-4">
                      <button
                        disabled={
                          busyId === service._id ||
                          service.approvalStatus !== "approved"
                        }
                        onClick={() => toggleAvailability(service)}
                        className={`relative h-6 w-11 rounded-full transition disabled:cursor-not-allowed disabled:opacity-50 ${
                          service.isAvailable
                            ? "bg-emerald-500"
                            : "bg-gray-300"
                        }`}
                        title={
                          service.approvalStatus !== "approved"
                            ? "Only approved services can be made available"
                            : "Toggle availability"
                        }
                      >
                        <span
                          className={`absolute top-1 size-4 rounded-full bg-white transition ${
                            service.isAvailable
                              ? "left-6"
                              : "left-1"
                          }`}
                        />
                      </button>

                      <span className="ml-2 text-xs text-gray-500">
                        {service.isAvailable ? "Available" : "Unavailable"}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelected(service)}
                          title="Edit service"
                          className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"
                        >
                          <Pencil size={17} />
                        </button>

                        <button
                          onClick={() => setDeleteId(service._id)}
                          title="Delete service"
                          className="rounded-lg p-2 text-red-500 hover:bg-red-50"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="space-y-4 md:hidden">
            {services.map((service) => (
              <div
                key={service._id}
                className="rounded-2xl border border-gray-100 bg-white p-4"
              >
                <div className="flex gap-3">
                  <Image
                    src={service.image}
                    alt={service.title}
                    width={72}
                    height={72}
                    className="size-[72px] rounded-xl object-cover"
                  />

                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-gray-900">
                      {service.title}
                    </h3>
                    <p className="mt-1 text-xs text-gray-500">
                      {service.category}
                    </p>
                    <p className="mt-2 font-bold text-emerald-600">
                      ৳{service.basePrice.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <ApprovalBadge status={service.approvalStatus} />
                  <span className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                    service.isAvailable
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-gray-100 text-gray-600"
                  }`}>
                    {service.isAvailable ? "Available" : "Unavailable"}
                  </span>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
                  <button
                    disabled={
                      busyId === service._id ||
                      service.approvalStatus !== "approved"
                    }
                    onClick={() => toggleAvailability(service)}
                    className="flex items-center gap-2 text-xs font-semibold text-gray-600 disabled:opacity-50"
                  >
                    <Power size={16} />
                    Toggle availability
                  </button>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelected(service)}
                      className="rounded-lg bg-blue-50 p-2 text-blue-600"
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      onClick={() => setDeleteId(service._id)}
                      className="rounded-lg bg-red-50 p-2 text-red-500"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Edit modal */}
      {selected && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center overflow-y-auto bg-black/50 p-4">
          <div className="my-auto w-full max-w-3xl rounded-2xl bg-white p-5 shadow-xl sm:p-8">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Edit Service
                </h3>
                <p className="mt-1 text-xs text-gray-500">
                  Changes will require admin approval again.
                </p>
              </div>

              <button
                onClick={() => setSelected(null)}
                className="rounded-lg px-3 py-2 text-sm text-gray-500 hover:bg-gray-100"
              >
                Close
              </button>
            </div>

            <ServiceForm
              key={selected._id}
              technician={technician}
              service={selected}
              onCancel={() => setSelected(null)}
              onSuccess={() => {
                setSelected(null);
                fetchServices();
              }}
            />
          </div>
        </div>
      )}

      <DeleteServiceModal
        open={!!deleteId}
        loading={actionLoading}
        onClose={() => setDeleteId(null)}
        onConfirm={deleteService}
      />
    </>
  );
}

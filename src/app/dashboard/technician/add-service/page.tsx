import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { PlusCircle } from "lucide-react";

import { auth } from "@/lib/auth";
import ServiceForm from "@/components/dashboard/technician/ServiceForm";

export default async function AddServicePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/sign-in");

  if ((session.user as any).role !== "technician") {
    redirect("/dashboard");
  }

  const technician = {
    name: session.user.name,
    email: session.user.email,
  };

  return (
    <div className="mx-auto max-w-4xl space-y-7">
      <div>
        <div className="flex items-center gap-2 text-emerald-600">
          <PlusCircle size={19} />
          <span className="text-sm font-semibold">
            Service Management
          </span>
        </div>

        <h2 className="mt-2 text-2xl font-bold text-gray-900">
          Add New Service
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Provide your service details to reach more customers.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-8">
        <ServiceForm
          technician={technician}
        />
      </div>
    </div>
  );
}

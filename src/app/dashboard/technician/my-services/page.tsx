
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { BriefcaseBusiness } from "lucide-react";

import { auth } from "@/lib/auth";
import MyServicesTable from "@/components/dashboard/technician/MyServicesTable";

export default async function MyServicesPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/sign-in");

  if ((session.user as any).role !== "technician") {
    redirect("/dashboard");
  }

  return (
    <div className="space-y-7">
      <div>
        <div className="flex items-center gap-2 text-emerald-600">
          <BriefcaseBusiness size={19} />
          <span className="text-sm font-semibold">
            Service Management
          </span>
        </div>

        <h2 className="mt-2 text-2xl font-bold text-gray-900">
          My Services
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Manage, edit, delete, and control your service availability.
        </p>
      </div>

      <MyServicesTable
        technician={{
          name: session.user.name,
          email: session.user.email,
        }}
      />
    </div>
  );
}

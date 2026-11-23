
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import DashboardShell from "@/components/dashboard/DashboardShell";
import type { DashboardUser } from "@/types/dashboard";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const user = {
    id: session.user.id,
    name: session.user.name,
    email: session.user.email,
    image: session.user.image ?? undefined,
    role: (session.user as typeof session.user & {
      role: DashboardUser["role"];
    }).role,
  };

  if (!["customer", "technician", "admin"].includes(user.role)) {
    redirect("/");
  }

  return (
    <DashboardShell user={user}>
      {children}
    </DashboardShell>
  );
}

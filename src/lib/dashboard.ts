
import {
  LayoutDashboard,
  CalendarDays,
  CreditCard,
  BriefcaseBusiness,
  Users,
  Settings,
} from "lucide-react";

import type { UserRole } from "@/types/dashboard";

export const dashboardMenus = {
  customer: [
    {
      title: "Overview",
      href: "/dashboard/customer",
      icon: LayoutDashboard,
    },
    {
      title: "My Bookings",
      href: "/dashboard/customer/bookings",
      icon: CalendarDays,
    },
    {
      title: "Payments",
      href: "/dashboard/customer/payments",
      icon: CreditCard,
    },
  ],

  technician: [
    {
      title: "Overview",
      href: "/dashboard/technician",
      icon: LayoutDashboard,
    },
    {
      title: "My Jobs",
      href: "/dashboard/technician/jobs",
      icon: BriefcaseBusiness,
    },
  ],

  admin: [
    {
      title: "Overview",
      href: "/dashboard/admin",
      icon: LayoutDashboard,
    },
    {
      title: "Users",
      href: "/dashboard/admin/users",
      icon: Users,
    },
    {
      title: "Settings",
      href: "/dashboard/admin/settings",
      icon: Settings,
    },
  ],
} satisfies Record<UserRole, {
  title: string;
  href: string;
  icon: React.ElementType;
}[]>;

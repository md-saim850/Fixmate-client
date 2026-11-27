
import {
  LayoutDashboard,
  CalendarDays,
  CreditCard,
  BriefcaseBusiness,
  Users,
  PlusCircle,
  ClipboardList,
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
      title: "Add Service",
      href: "/dashboard/technician/add-service",
      icon: PlusCircle,
    },
    {
      title: "My Services",
      href: "/dashboard/technician/my-services",
      icon: BriefcaseBusiness,
    },
    {
      title: "Manage Requests",
      href: "/dashboard/technician/requests",
      icon: ClipboardList,
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
      title: "Services",
      href: "/dashboard/admin/services",
      icon: BriefcaseBusiness,
    },
    {
      title: "Bookings",
      href: "/dashboard/admin/bookings",
      icon: CalendarDays,
    },
    {
      title: "Transactions",
      href: "/dashboard/admin/transactions",
      icon: CreditCard,
    },
  ],
} satisfies Record<UserRole, {
  title: string;
  href: string;
  icon: React.ElementType;
}[]>;

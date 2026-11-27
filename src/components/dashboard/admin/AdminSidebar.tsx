"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Wrench,
  CalendarDays,
  CreditCard,
  ShieldCheck,
  Home,
  LogOut,
  Settings,
} from "lucide-react";
import { toast } from "sonner";

import { signOut } from "@/lib/auth-client";

const navigation = [
  {
    label: "Overview",
    href: "/dashboard/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Manage Users",
    href: "/dashboard/admin/users",
    icon: Users,
  },
  {
    label: "Service Approval",
    href: "/dashboard/admin/services",
    icon: Wrench,
  },
  {
    label: "All Bookings",
    href: "/dashboard/admin/bookings",
    icon: CalendarDays,
  },
  {
    label: "Transactions",
    href: "/dashboard/admin/transactions",
    icon: CreditCard,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);
  const profileActive = pathname.startsWith("/dashboard/admin/profile");

  const handleSignOut = async () => {
    setLoggingOut(true);

    try {
      await signOut();
      router.push("/sign-in");
      router.refresh();
    } catch {
      toast.error("Unable to log out. Please try again.");
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <aside className="flex h-full w-full flex-col border-r border-gray-200 bg-white p-5">
      <Link
        href="/dashboard/admin"
        className="mb-10 flex items-center gap-3"
      >
        <div className="rounded-xl bg-green-600 p-2.5 text-white">
          <ShieldCheck size={24} />
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-900">
            FixMate
          </h2>
          <p className="text-xs text-gray-500">
            Administration
          </p>
        </div>
      </Link>

      <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
        Admin Menu
      </p>

      <nav className="flex-1 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;

          const active =
            item.href === "/dashboard/admin"
              ? pathname === item.href
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                active
                  ? "bg-green-50 text-green-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon size={19} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-6 space-y-2 border-t border-gray-200 pt-5">
        <Link
          href="/dashboard/admin/profile"
          className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
            profileActive
              ? "bg-green-50 text-green-700"
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          }`}
        >
          <Settings size={19} />
          Profile Settings
        </Link>

        <button
          type="button"
          onClick={handleSignOut}
          disabled={loggingOut}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <LogOut size={19} />
          {loggingOut ? "Logging out..." : "Logout"}
        </button>

        <Link
          href="/"
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-600 hover:bg-gray-50"
        >
          <Home size={19} />
          Back to Website
        </Link>
      </div>
    </aside>
  );
}
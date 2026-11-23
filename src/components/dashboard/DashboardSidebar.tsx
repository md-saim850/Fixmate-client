
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Wrench, X } from "lucide-react";
import { dashboardMenus } from "@/lib/dashboard";
import type { DashboardUser } from "@/types/dashboard";

interface Props {
  user: DashboardUser;
  open: boolean;
  onClose: () => void;
}

export default function DashboardSidebar({
  user,
  open,
  onClose,
}: Props) {
  const pathname = usePathname();
  const menus = dashboardMenus[user.role] ?? [];

  return (
    <>
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-gray-100 bg-white transition-transform duration-300 lg:static lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-20 items-center justify-between border-b border-gray-100 px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-600 text-white">
              <Wrench size={22} />
            </div>
            <span className="text-xl font-bold text-gray-900">
              Fix<span className="text-emerald-600">Mate</span>
            </span>
          </Link>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-4 py-6">
          <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Workspace
          </p>

          <nav className="space-y-2">
            {menus.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                    active
                      ? "bg-emerald-50 text-emerald-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-emerald-700"
                  }`}
                >
                  <Icon size={19} />
                  {item.title}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto border-t border-gray-100 p-5">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50"
          >
            <Home size={19} />
            Back to Home
          </Link>
        </div>
      </aside>
    </>
  );
}

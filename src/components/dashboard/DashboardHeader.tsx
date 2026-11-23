
"use client";

import { Menu, Bell, ChevronDown } from "lucide-react";
import type { DashboardUser } from "@/types/dashboard";

interface Props {
  user: DashboardUser;
  onMenuClick: () => void;
}

export default function DashboardHeader({
  user,
  onMenuClick,
}: Props) {
  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-gray-100 bg-white/95 px-4 backdrop-blur sm:px-8">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 lg:hidden"
        >
          <Menu size={23} />
        </button>

        <div>
          <h1 className="text-lg font-bold text-gray-900">
            Dashboard
          </h1>
          <p className="hidden text-xs text-gray-500 sm:block">
            Manage your FixMate account
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative rounded-full p-2 text-gray-500 hover:bg-gray-100">
          <Bell size={20} />
          <span className="absolute right-2 top-2 size-2 rounded-full bg-emerald-500" />
        </button>

        <div className="h-9 w-px bg-gray-200" />

        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center overflow-hidden rounded-full bg-emerald-100 font-bold text-emerald-700">
            {user.image ? (
              <img
                src={user.image}
                alt={user.name}
                className="h-full w-full object-cover"
              />
            ) : (
              user.name.charAt(0).toUpperCase()
            )}
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-gray-900">
              {user.name}
            </p>
            <p className="text-xs capitalize text-gray-500">
              {user.role}
            </p>
          </div>

          <ChevronDown size={16} className="hidden text-gray-400 sm:block" />
        </div>
      </div>
    </header>
  );
}

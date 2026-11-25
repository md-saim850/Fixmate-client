"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { adminFetch } from "@/lib/admin-api";
import type { AdminUser, UserRole } from "@/types/admin";
import AdminStatusBadge from "../AdminStatusBadge";

interface Props {
  currentUserId: string;
}

export default function UsersTable({ currentUserId }: Props) {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await adminFetch<AdminUser[]>("/admin/users");
        setUsers(data);
      } catch {
        toast.error("Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  const updateRole = async (
    userId: string,
    role: UserRole
  ) => {
    if (userId === currentUserId) {
      toast.error("You cannot change your own role");
      return;
    }

    setUpdating(userId);

    try {
      await adminFetch(`/admin/users/${userId}/role`, {
        method: "PATCH",
        body: JSON.stringify({ role }),
      });

      setUsers((prev) =>
        prev.map((user) =>
          user._id === userId ? { ...user, role } : user
        )
      );

      toast.success("User role updated successfully");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Role update failed"
      );
    } finally {
      setUpdating(null);
    }
  };

  if (loading) {
    return <p className="py-10 text-center">Loading users...</p>;
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">
      <table className="w-full min-w-[750px] text-left text-sm">
        <thead className="bg-gray-50 text-gray-500">
          <tr>
            <th className="px-5 py-4">User</th>
            <th className="px-5 py-4">Email</th>
            <th className="px-5 py-4">Role</th>
            <th className="px-5 py-4">Joined</th>
            <th className="px-5 py-4">Action</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {users.map((user) => {
            const isSelf = user._id === currentUserId;

            return (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    {user.image ? (
                      <img
                        src={user.image}
                        alt={user.name}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 font-semibold text-green-700">
                        {user.name?.charAt(0).toUpperCase()}
                      </div>
                    )}

                    <span className="font-medium text-gray-900">
                      {user.name}
                    </span>
                  </div>
                </td>

                <td className="px-5 py-4 text-gray-600">
                  {user.email}
                </td>

                <td className="px-5 py-4">
                  <AdminStatusBadge status={user.role} />
                </td>

                <td className="px-5 py-4 text-gray-500">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>

                <td className="px-5 py-4">
                  {isSelf ? (
                    <span className="text-xs text-gray-400">
                      Your account
                    </span>
                  ) : (
                    <div className="flex items-center gap-2">
                      <select
                        value={user.role}
                        disabled={updating === user._id}
                        onChange={(e) =>
                          updateRole(
                            user._id,
                            e.target.value as UserRole
                          )
                        }
                        className="rounded-lg border border-gray-200 bg-white px-3 py-2 outline-none focus:border-green-500"
                      >
                        <option value="customer">Customer</option>
                        <option value="technician">Technician</option>
                        <option value="admin">Admin</option>
                      </select>

                      {updating === user._id && (
                        <Loader2
                          size={17}
                          className="animate-spin"
                        />
                      )}
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {users.length === 0 && (
        <p className="p-8 text-center text-gray-500">
          No users found.
        </p>
      )}
    </div>
  );
}
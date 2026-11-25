"use client";

import AdminHeader from "@/components/dashboard/admin/AdminHeader";
import UsersTable from "@/components/dashboard/admin/users/UsersTable";
import { useSession } from "@/lib/auth-client";

export default function AdminUsersPage() {
  const { data: session } = useSession();

  return (
    <>
      <AdminHeader
        title="Manage Users"
        description="View registered users and manage their roles."
      />

      {session?.user?.id ? (
        <UsersTable currentUserId={session.user.id} />
      ) : (
        <p className="py-10 text-center text-gray-500">
          Loading user information...
        </p>
      )}
    </>
  );
}
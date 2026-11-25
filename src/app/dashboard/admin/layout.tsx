import AdminSidebar from "@/components/dashboard/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 lg:flex">
      <div className="w-full lg:fixed lg:inset-y-0 lg:w-64">
        <AdminSidebar />
      </div>

      <main className="min-w-0 flex-1 p-5 lg:ml-64 lg:p-8">
        <div className="mx-auto max-w-7xl">
          {children}
        </div>
      </main>
    </div>
  );
}
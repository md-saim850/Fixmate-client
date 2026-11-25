import AdminHeader from "@/components/dashboard/admin/AdminHeader";
import ServicesTable from "@/components/dashboard/admin/services/ServicesTable";

export default function AdminServicesPage() {
  return (
    <>
      <AdminHeader
        title="Service Approval"
        description="Review and manage technician service submissions."
      />

      <ServicesTable />
    </>
  );
}
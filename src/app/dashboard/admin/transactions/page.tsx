import AdminHeader from "@/components/dashboard/admin/AdminHeader";
import TransactionsTable from "@/components/dashboard/admin/transactions/TransactionsTable";

export default function AdminTransactionsPage() {
  return (
    <>
      <AdminHeader
        title="Transactions"
        description="Track platform payments and total revenue."
      />

      <TransactionsTable />
    </>
  );
}
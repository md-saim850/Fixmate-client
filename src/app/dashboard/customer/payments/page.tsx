
import PaymentTable from "@/components/dashboard/customer/PaymentTable";
import { CreditCard } from "lucide-react";

export default function CustomerPaymentsPage() {
  return (
    <div className="space-y-7">
      <div>
        <div className="flex items-center gap-2 text-emerald-600">
          <CreditCard size={19} />
          <span className="text-sm font-semibold">
            Financial Overview
          </span>
        </div>

        <h2 className="mt-2 text-2xl font-bold text-gray-900">
          Payment History
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Review your transactions and service payments.
        </p>
      </div>

      <PaymentTable />
    </div>
  );
}

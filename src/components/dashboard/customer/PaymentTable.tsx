
"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { CreditCard, Receipt } from "lucide-react";

import type { Payment } from "@/types/dashboard";
import { getClientToken } from "@/lib/get-client-token";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function PaymentTable() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getPayments() {
      try {
        const token = await getClientToken();

        if (!token) {
          throw new Error("Authentication token not found");
        }

        const res = await fetch(`${API_URL}/payments/customer`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error("Failed to load payments");
        }

        const data = await res.json();

        setPayments(data.payments ?? []);
      } catch (error) {
        console.error("Payment history error:", error);
        toast.error("Unable to load payment history");
      } finally {
        setLoading(false);
      }
    }

    getPayments();
  }, []);

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-10 text-center text-gray-500">
        Loading payment history...
      </div>
    );
  }

  if (!payments.length) {
    return (
      <div className="rounded-2xl border border-gray-100 bg-white p-12 text-center">
        <Receipt className="mx-auto size-10 text-emerald-500" />
        <h3 className="mt-4 font-bold text-gray-900">
          No payment records
        </h3>
        <p className="mt-2 text-sm text-gray-500">
          Your completed payments will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-100 bg-white">
      <table className="w-full text-left">
        <thead className="bg-gray-50 text-xs font-semibold uppercase text-gray-500">
          <tr>
            <th className="px-5 py-4">Service</th>
            <th className="px-5 py-4">Technician</th>
            <th className="px-5 py-4">Amount</th>
            <th className="px-5 py-4">Transaction ID</th>
            <th className="px-5 py-4">Payment Date</th>
            <th className="px-5 py-4">Status</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {payments.map((payment) => (
            <tr key={payment._id} className="text-sm">
              <td className="px-5 py-5 font-semibold text-gray-900">
                {payment.service?.title ?? payment.serviceTitle}
              </td>

              <td className="px-5 py-5 text-gray-600">
                {payment.technician?.name ?? payment.technicianName}
              </td>

              <td className="px-5 py-5 font-bold text-gray-900">
                ৳{payment.amount.toLocaleString()}
              </td>

              <td className="px-5 py-5">
                <span className="font-mono text-xs text-gray-500">
                  {payment.stripePaymentIntentId ?? payment.transactionId}
                </span>
              </td>

              <td className="px-5 py-5 text-gray-600">
                {new Date(payment.updatedAt ?? payment.paidAt).toLocaleDateString()}
              </td>

              <td className="px-5 py-5">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                  <CreditCard size={13} />
                  Paid
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

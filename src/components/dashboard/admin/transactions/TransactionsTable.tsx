"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Wallet } from "lucide-react";

import { adminFetch } from "@/lib/admin-fetch.client";
import type { AdminTransaction } from "@/types/admin";

interface TransactionResponse {
  transactions: AdminTransaction[];
  totalRevenue: number;
}

export default function TransactionsTable() {
  const [transactions, setTransactions] = useState<AdminTransaction[]>([]);

  const [totalRevenue, setTotalRevenue] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const data = await adminFetch<TransactionResponse>(
          "/admin/transactions"
        );

        setTransactions(data.transactions);
        setTotalRevenue(data.totalRevenue);
      } catch {
        toast.error("Failed to load transactions");
      } finally {
        setLoading(false);
      }
    };

    getTransactions();
  }, []);

  return (
    <div>
      {/* Revenue */}
      <div className="mb-6 rounded-2xl bg-green-600 p-6 text-white shadow-sm">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-white/20 p-3">
            <Wallet size={24} />
          </div>

          <div>
            <p className="text-sm text-green-100">
              Total Revenue
            </p>

            <h2 className="mt-1 text-3xl font-bold">
              ৳{totalRevenue.toLocaleString()}
            </h2>
          </div>
        </div>
      </div>

      {/* Transactions table */}
      <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">
        <table className="w-full min-w-[850px] text-left text-sm">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="px-5 py-4">Customer</th>
              <th className="px-5 py-4">Technician</th>
              <th className="px-5 py-4">Service</th>
              <th className="px-5 py-4">Amount</th>
              <th className="px-5 py-4">Transaction ID</th>
              <th className="px-5 py-4">Payment Date</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {transactions.map((transaction) => (
              <tr
                key={transaction._id}
                className="hover:bg-gray-50"
              >
                <td className="px-5 py-4 text-gray-700">
                  {transaction.customer?.name || "Unknown"}
                </td>

                <td className="px-5 py-4 text-gray-700">
                  {transaction.technician?.name || "Unknown"}
                </td>

                <td className="px-5 py-4 font-medium text-gray-900">
                  {transaction.service?.title || "Unknown"}
                </td>

                <td className="px-5 py-4 font-semibold text-green-700">
                  ৳{transaction.amount.toLocaleString()}
                </td>

                <td className="px-5 py-4 text-gray-500">
                  {transaction.stripePaymentIntentId ?? transaction.transactionId}
                </td>

                <td className="px-5 py-4 text-gray-500">
                  {new Date(transaction.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {!loading && transactions.length === 0 && (
          <p className="p-8 text-center text-gray-500">
            No transactions found.
          </p>
        )}

        {loading && (
          <p className="p-8 text-center text-gray-500">
            Loading transactions...
          </p>
        )}
      </div>
    </div>
  );
}
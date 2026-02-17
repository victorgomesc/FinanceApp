"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Transaction } from "@/types/transaction";
import { TransactionForm } from "@/components/TransactionForm";
import { TransactionDrawer } from "@/components/TransactionTable";
import { EditTransactionModal } from "@/components/EditTransactionModal";
import { DeleteTransactionModal } from "@/components/DeleteTransactionModal";

export default function TransactionsPage() {
  const [data, setData] = useState<Transaction[]>([]);
  const [editing, setEditing] = useState<Transaction | null>(null);
  const [deleting, setDeleting] = useState<Transaction | null>(null);

  async function fetchData() {
    const response = await api.get("/transactions");
    setData(response.data);
  }

  function handleEdit(transaction: Transaction) {
    setEditing(transaction);
  }

  function handleDelete(transaction: Transaction) {
    setDeleting(transaction);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="space-y-8 pl-10 pr-60">
      <h1 className="text-3xl font-bold">
        Gerenciar Transações
      </h1>

      <TransactionForm
        onSuccess={() => {
          fetchData();
        }}
      />

      <TransactionDrawer
        data={data}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {editing && (
        <EditTransactionModal
          transaction={editing}
          onClose={() => setEditing(null)}
          onSuccess={() => {
            setEditing(null);
            fetchData();
          }}
        />
      )}

      {deleting && (
        <DeleteTransactionModal
          transaction={deleting}
          onClose={() => setDeleting(null)}
          onSuccess={() => {
            setDeleting(null);
            fetchData();
          }}
        />
      )}
    </div>
  );
}

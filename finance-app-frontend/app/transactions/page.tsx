"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Transaction } from "@/types/transaction";
import { TransactionForm } from "@/components/TransactionForm";
import { TransactionDrawer } from "@/components/TransactionTable"; // <-- confirme o caminho

export default function TransactionsPage() {
  const [data, setData] = useState<Transaction[]>([]);
  const [editing, setEditing] = useState<Transaction | null>(null);

  async function fetchData() {
    const response = await api.get("/transactions");
    setData(response.data);
  }

  function handleEdit(transaction: Transaction) {
    setEditing(transaction);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">
        Gerenciar Transações
      </h1>

      <TransactionForm
        onSuccess={() => {
          setEditing(null);
          fetchData();
        }}
        editing={editing}
      />

      <TransactionDrawer
        data={data}                
        onEdit={handleEdit}        
        onDeleted={fetchData}     
      />
    </div>
  );
}

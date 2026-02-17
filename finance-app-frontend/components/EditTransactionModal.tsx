"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { Transaction } from "@/types/transaction";

interface Props {
  transaction: Transaction;
  onClose: () => void;
  onSuccess: () => void;
}

export function EditTransactionModal({
  transaction,
  onClose,
  onSuccess,
}: Props) {
  const [form, setForm] = useState({
    description: transaction.description,
    amount: transaction.amount,
    type: transaction.type,
    date: transaction.date.split("T")[0],
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await api.put(`/transactions/${transaction.id}`, form);

    onSuccess();
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-zinc-900 p-8 rounded-xl w-96 space-y-4">
        <h2 className="text-xl font-bold">Editar Transação</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full p-2 rounded bg-zinc-800 text-white"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <input
            type="number"
            className="w-full p-2 rounded bg-zinc-800 text-white"
            value={form.amount}
            onChange={(e) =>
              setForm({ ...form, amount: Number(e.target.value) })
            }
          />

          <select
            className="w-full p-2 rounded bg-zinc-800 text-white"
            value={form.type}
            onChange={(e) =>
              setForm({ ...form, type: Number(e.target.value) })
            }
          >
            <option value={0}>Despesa</option>
            <option value={1}>Receita</option>
          </select>

          <input
            type="date"
            className="w-full p-2 rounded bg-zinc-800 text-white"
            value={form.date}
            onChange={(e) =>
              setForm({ ...form, date: e.target.value })
            }
          />

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-600 px-4 py-2 rounded"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="bg-blue-600 px-4 py-2 rounded"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

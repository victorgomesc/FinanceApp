"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { Transaction } from "@/types/transaction";

interface Props {
  onSuccess: () => void;
  editing?: Transaction | null;
}

export function TransactionForm({ onSuccess, editing }: Props) {
  const [form, setForm] = useState({
    description: "",
    amount: 0,
    type: 0,
    date: "",
  });

  useEffect(() => {
    if (editing) {
      setForm({
        description: editing.description,
        amount: editing.amount,
        type: editing.type,
        date: editing.date.split("T")[0],
      });
    }
  }, [editing]);

async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();

  try {
    if (editing) {
      await api.put(`/transactions/${editing.id}`, {
        ...form,
        date: new Date(form.date).toISOString(),
      });
    } else {
      await api.post("/transactions", {
        ...form,
        date: new Date(form.date).toISOString(),
      });
    }

    setForm({ description: "", amount: 0, type: 0, date: "" });
    onSuccess();
  } catch (error: any) {
    console.error("Erro ao salvar:", error.response?.data || error);
    alert(error.response?.data?.message || "Erro ao salvar");
  }
}


  return (
    <form
      onSubmit={handleSubmit}
      className="bg-zinc-900 p-6 rounded-xl shadow-md space-y-4"
    >
      <h2 className="text-xl font-bold">
        {editing ? "Editar Transação" : "Nova Transação"}
      </h2>

      <input
        type="text"
        placeholder="Descrição"
        className="w-full border p-2 rounded text-gray-500"
        value={form.description}
        onChange={(e) =>
          setForm({ ...form, description: e.target.value })
        }
      />

      <input
        type="number"
        placeholder="Valor"
        className="w-full border p-2 rounded text-gray-500"
        value={form.amount}
        onChange={(e) =>
          setForm({ ...form, amount: Number(e.target.value) })
        }
      />

      <select
        className="w-full border p-2 rounded text-gray-500"
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
        className="w-full border p-2 rounded text-gray-500"
        value={form.date}
        onChange={(e) =>
          setForm({ ...form, date: e.target.value })
        }
      />

      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Salvar
      </button>
    </form>
  );
}

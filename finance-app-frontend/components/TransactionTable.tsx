"use client";

import { useState } from "react";
import { Transaction } from "@/types/transaction";
import { api } from "@/lib/api";

interface Props {
  data: Transaction[];
  onEdit: (transaction: Transaction) => void;
  onDeleted: () => void;
}

export function TransactionDrawer({ data, onEdit, onDeleted }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  async function handleDelete(id: string) {
    await api.delete(`/transactions/${id}`);
    onDeleted();
  }

  return (
    <>
      {/* Botão que abre o drawer */}
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg mb-4"
      >
        Ver Transações
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 z-40"
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed bottom-0 left-0 w-full bg-zinc-900 p-6 rounded-t-2xl shadow-2xl z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-300">
            Transações
          </h2>

          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-white"
          >
            Fechar
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto">
          <table className="w-full border-collapse text-gray-300">
          <thead>
            <tr className="border-b border-zinc-700">
              <th className="text-left p-2">Descrição</th>
              <th className="text-left p-2">Valor</th>
              <th className="text-left p-2">Tipo</th>
              <th className="text-left p-2">Data</th>
              <th className="text-left p-2">Criado por</th>
              <th className="text-left p-2">Ações</th>
            </tr>
          </thead>

          <tbody>
            {data.map((t) => (
              <tr key={t.id} className="border-b border-zinc-800">
                <td className="p-2">{t.description}</td>

                <td className="p-2">
                  R$ {t.amount.toFixed(2)}
                </td>

                <td className="p-2">
                  {t.type === 1 ? "Receita" : "Despesa"}
                </td>

                <td className="p-2">
                  {new Date(t.date).toLocaleDateString()}
                </td>

                {/* NOVA COLUNA */}
                <td className="p-2">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-200">
                      {t.createdBy}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(t.createdAt).toLocaleString()}
                    </span>
                  </div>
                </td>

                <td className="p-2 space-x-2">
                  <button
                    onClick={() => onEdit(t)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => handleDelete(t.id)}
                    className="bg-red-600 text-white px-2 py-1 rounded"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        </div>
      </div>
    </>
  );
}

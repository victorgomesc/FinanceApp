"use client";

import { api } from "@/lib/api";
import { Transaction } from "@/types/transaction";

interface Props {
  transaction: Transaction;
  onClose: () => void;
  onSuccess: () => void;
}

export function DeleteTransactionModal({
  transaction,
  onClose,
  onSuccess,
}: Props) {
  async function handleDelete() {
    await api.delete(`/transactions/${transaction.id}`);
    onSuccess();
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-zinc-900 p-8 rounded-xl w-96 space-y-6">
        <h2 className="text-xl font-bold text-red-500">
          Confirmar Exclusão
        </h2>

        <p>
          Tem certeza que deseja excluir a transação:
        </p>

        <p className="font-semibold">
          {transaction.description}
        </p>

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="bg-gray-600 px-4 py-2 rounded"
          >
            Cancelar
          </button>

          <button
            onClick={handleDelete}
            className="bg-red-600 px-4 py-2 rounded"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}

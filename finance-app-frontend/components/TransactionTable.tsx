"use client";

import { Transaction } from "@/types/transaction";

interface Props {
  data: Transaction[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (transaction: Transaction) => void;
}

export function TransactionDrawer({
  data,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="bg-zinc-900 p-6 rounded-xl shadow-md">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-zinc-700">
            <th className="p-2">Descrição</th>
            <th className="p-2">Valor</th>
            <th className="p-2">Tipo</th>
            <th className="p-2">Data</th>
            <th className="p-2">Última Alteração</th>
            <th className="p-2">Ações</th>
          </tr>
        </thead>

        <tbody>
          {data.map((t) => {
            const lastModifiedBy =
              t.updatedBy && t.updatedBy !== ""
                ? t.updatedBy
                : t.createdBy;

            return (
              <tr
                key={t.id}
                className="border-b border-zinc-800"
              >
                <td className="p-2">{t.description}</td>

                <td className="p-2">
                  R$ {t.amount.toFixed(2)}
                </td>

                <td className="p-2">
                  {t.type === 1 ? "Receita" : "Despesa"}
                </td>

                <td className="p-2">
                  {new Date(t.date).toLocaleDateString("pt-BR")}
                </td>

                <td className="p-2 text-sm text-zinc-400">
                  {lastModifiedBy}
                </td>

                <td className="p-2 flex gap-2">
                  <button
                    onClick={() => onEdit(t)}
                    className="bg-blue-600 px-3 py-1 rounded text-sm"
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => onDelete(t)}
                    className="bg-red-600 px-3 py-1 rounded text-sm"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

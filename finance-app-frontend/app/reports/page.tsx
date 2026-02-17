"use client";

import { useState } from "react";
import { api } from "@/lib/api";

interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: number;
  date: string;
}

export default function ReportsPage() {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [data, setData] = useState<Transaction[]>([]);

  async function handleSearch() {
    if (!start || !end) return;

    const response = await api.get("/transactions/period", {
      params: {
        start,
        end,
      },
    });

    setData(response.data);
  }

  const totalIncome = data
    .filter((t) => t.type === 1)
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = data
    .filter((t) => t.type === 0)
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  function exportCSV() {
    const rows = [
      ["Descrição", "Valor", "Tipo", "Data"],
      ...data.map((t) => [
        t.description,
        t.amount,
        t.type === 1 ? "Receita" : "Despesa",
        new Date(t.date).toLocaleDateString("pt-BR"),
      ]),
    ];

    const csvContent =
      "data:text/csv;charset=utf-8," +
      rows.map((e) => e.join(",")).join("\n");

    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "relatorio.csv");
    document.body.appendChild(link);
    link.click();
  }

  // 🔥 NOVA FUNÇÃO PDF
  async function exportPDF() {
    if (!start || !end) return;

    const response = await api.get(
      "/transactions/report/pdf",
      {
        params: { start, end },
        responseType: "blob",
      }
    );

    const url = window.URL.createObjectURL(
      new Blob([response.data])
    );

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "relatorio-financeiro.pdf");
    document.body.appendChild(link);
    link.click();
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Relatórios</h1>

      {/* Filtros */}
      <div className="bg-zinc-900 p-6 rounded-xl shadow-md flex gap-4 items-end">
        <div>
          <label className="text-sm text-zinc-400">Data Inicial</label>
          <input
            type="date"
            className="border p-2 rounded bg-zinc-800 text-white"
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm text-zinc-400">Data Final</label>
          <input
            type="date"
            className="border p-2 rounded bg-zinc-800 text-white"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
          />
        </div>

        <button
          onClick={handleSearch}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
        >
          Buscar
        </button>

        {data.length > 0 && (
          <>
            <button
              onClick={exportCSV}
              className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white"
            >
              Exportar CSV
            </button>

            {/* 🔥 BOTÃO PDF ADICIONADO */}
            <button
              onClick={exportPDF}
              className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded text-white"
            >
              Exportar PDF
            </button>
          </>
        )}
      </div>

      {/* Resumo */}
      {data.length > 0 && (
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-zinc-900 p-6 rounded-xl">
            <p className="text-zinc-400">Receitas</p>
            <p className="text-2xl text-green-400 font-bold">
              R$ {totalIncome.toFixed(2)}
            </p>
          </div>

          <div className="bg-zinc-900 p-6 rounded-xl">
            <p className="text-zinc-400">Despesas</p>
            <p className="text-2xl text-red-400 font-bold">
              R$ {totalExpense.toFixed(2)}
            </p>
          </div>

          <div className="bg-zinc-900 p-6 rounded-xl">
            <p className="text-zinc-400">Saldo</p>
            <p className="text-2xl text-blue-400 font-bold">
              R$ {balance.toFixed(2)}
            </p>
          </div>
        </div>
      )}

      {/* Tabela */}
      {data.length > 0 && (
        <div className="bg-zinc-900 p-6 rounded-xl">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-zinc-700">
                <th className="p-2">Descrição</th>
                <th className="p-2">Valor</th>
                <th className="p-2">Tipo</th>
                <th className="p-2">Data</th>
              </tr>
            </thead>
            <tbody>
              {data.map((t) => (
                <tr key={t.id} className="border-b border-zinc-800">
                  <td className="p-2">{t.description}</td>
                  <td className="p-2">R$ {t.amount.toFixed(2)}</td>
                  <td className="p-2">
                    {t.type === 1 ? "Receita" : "Despesa"}
                  </td>
                  <td className="p-2">
                    {new Date(t.date).toLocaleDateString("pt-BR")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

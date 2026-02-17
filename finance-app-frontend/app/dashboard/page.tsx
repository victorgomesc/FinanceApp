"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { DashboardCard } from "@/components/DashboardChart";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface DashboardData {
  year: number;
  month: number;
  totalIncome: number;
  totalExpense: number;
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await api.get("/transactions/dashboard");
      setData(response.data);
    }

    fetchData();
  }, []);

  const totalIncome = data.reduce((sum, item) => sum + item.totalIncome, 0);
  const totalExpense = data.reduce((sum, item) => sum + item.totalExpense, 0);
  const balance = totalIncome - totalExpense;

  const sortedData = [...data].sort((a, b) => {
    if (a.year !== b.year) return a.year - b.year;
    return a.month - b.month;
  });

  const formattedData = sortedData.map((item) => ({
    month: `${item.month}/${item.year}`,
    income: item.totalIncome,
    expense: item.totalExpense,
  }));

  const pieData = [
    { name: "Entradas", value: totalIncome },
    { name: "Saídas", value: totalExpense },
  ];

  const COLORS = ["#16a34a", "#dc2626"];

  return (
    <div className="space-y-8 pl-10 h-2/3 pr-60">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-3 gap-6">
        <DashboardCard
          title="Total Entradas"
          value={totalIncome}
          color="text-green-600"
        />
        <DashboardCard
          title="Total Saídas"
          value={totalExpense}
          color="text-red-600"
        />
        <DashboardCard
          title="Saldo"
          value={balance}
          color="text-blue-600"
        />
      </div>

      <div className="grid grid-cols-2 gap-6">

        <div className="bg-zinc-800 p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4">
            Entradas x Saídas por Mês
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={formattedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="income"
                fill="#16a34a"
                name="Entradas"
              />
              <Bar
                dataKey="expense"
                fill="#dc2626"
                name="Saídas"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-zinc-800 p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4">
            Distribuição Geral
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-zinc-800 p-6 rounded-xl shadow-md col-span-2">
          <h2 className="text-lg font-semibold mb-4">
            Acompanhamento Mensal
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={formattedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="income"
                stroke="#16a34a"
                strokeWidth={3}
                name="Entradas"
              />
              <Line
                type="monotone"
                dataKey="expense"
                stroke="#dc2626"
                strokeWidth={3}
                name="Saídas"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}

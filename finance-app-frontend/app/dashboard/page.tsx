"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { DashboardCard } from "@/components/DashboardChart";
import { FinanceBarChart } from "@/components/FinanceBarChart"

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
  if (a.year !== b.year) {
    return a.year - b.year;
  }
  return a.month - b.month;
});

const formattedData = sortedData.map((item) => ({
  month: `${item.month}/${item.year}`,
  income: item.totalIncome,
  expense: item.totalExpense,
  balance: item.totalIncome - item.totalExpense,
}));

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className=" grid grid-cols-3 gap-6">
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
          title="Saldo Final"
          value={balance}
          color="text-blue-600"
        />
      </div>

      <FinanceBarChart data={data} />


      {/* <div className="bg-zinc-800 p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">
          Evolução do Saldo
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
              dataKey="balance"
              stroke="#2563eb"
              strokeWidth={3}
              name="Saldo"
            />
          </LineChart>
        </ResponsiveContainer>
      </div> */}
    </div>
  );
}

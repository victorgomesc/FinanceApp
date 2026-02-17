"use client"

import * as React from "react"
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

interface DashboardData {
  year: number
  month: number
  totalIncome: number
  totalExpense: number
}

interface Props {
  data: DashboardData[]
}

export function FinanceBarChart({ data }: Props) {
  const sortedData = React.useMemo(() => {
    return [...data]
      .sort((a, b) => {
        if (a.year !== b.year) return a.year - b.year
        return a.month - b.month
      })
      .map((item) => ({
        date: new Date(item.year, item.month - 1),
        income: item.totalIncome,
        expense: item.totalExpense,
      }))
  }, [data])

  const trend = React.useMemo(() => {
    if (sortedData.length < 2) return 0

    const last =
      sortedData[sortedData.length - 1].income -
      sortedData[sortedData.length - 1].expense

    const previous =
      sortedData[sortedData.length - 2].income -
      sortedData[sortedData.length - 2].expense

    if (previous === 0) return 0

    return ((last - previous) / Math.abs(previous)) * 100
  }, [sortedData])

  return (
    <div className="bg-zinc-900 text-white rounded-2xl p-8 shadow-xl border border-zinc-800">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">
          Receitas vs Despesas
        </h2>
        <p className="text-zinc-400">
          Comparativo mensal financeiro
        </p>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={sortedData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#27272a"
            />
            <XAxis
              dataKey="date"
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString("pt-BR", {
                  month: "short",
                })
              }
              stroke="#a1a1aa"
            />
            <YAxis stroke="#a1a1aa" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#18181b",
                border: "1px solid #27272a",
                borderRadius: "8px",
              }}
              formatter={(value: number | undefined) =>
                `R$ ${(value ?? 0).toLocaleString("pt-BR")}`
              }
              labelFormatter={(label) =>
                new Date(label).toLocaleDateString("pt-BR", {
                  month: "long",
                  year: "numeric",
                })
              }
            />

            <Bar
              dataKey="income"
              fill="#22c55e"
              radius={[6, 6, 0, 0]}
              name="Receitas"
            />
            <Bar
              dataKey="expense"
              fill="#3b82f6"
              radius={[6, 6, 0, 0]}
              name="Despesas"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 text-sm text-zinc-400">
        <span
          className={`font-medium ${
            trend >= 0 ? "text-green-400" : "text-red-400"
          }`}
        >
          {trend >= 0 ? "↑" : "↓"} {Math.abs(trend).toFixed(1)}%
        </span>{" "}
        comparado ao mês anterior
      </div>
    </div>
  )
}

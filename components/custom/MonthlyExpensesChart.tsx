import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Transactions } from "@/types/types";

interface MonthlyExpensesChartProps {
  transactions: Transactions[];
}

const MonthlyExpensesChart = ({ transactions }: MonthlyExpensesChartProps) => {
  const monthlyData = useMemo(() => {
    const monthlyTotals: { [key: string]: number } = {};

    transactions.forEach((transaction) => {
      const date = new Date(transaction.date);
      const monthYear = date.toLocaleString("en-US", {
        month: "short",
        year: "numeric",
      });

      monthlyTotals[monthYear] =
        (monthlyTotals[monthYear] || 0) + transaction.amount;
    });

    const sortedData = Object.entries(monthlyTotals)
      .map(([month, amount]) => ({
        month,
        amount: Number(amount.toFixed(2)),
      }))
      .sort((a, b) => {
        const [monthA, yearA] = a.month.split(" ");
        const [monthB, yearB] = b.month.split(" ");
        return (
          new Date(`${monthA} 1, ${yearA}`).getTime() -
          new Date(`${monthB} 1, ${yearB}`).getTime()
        );
      });

    return sortedData;
  }, [transactions]);

  const formatCurrency = (value: number) => {
    return `₹${value.toLocaleString("en-IN")}`;
  };

  return (
    <Card className="mt-8 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
        <CardTitle className="text-2xl">Monthly Expenses</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={monthlyData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis
                dataKey="month"
                angle={-45}
                textAnchor="end"
                height={70}
                interval={0}
                tick={{ fill: "#4a5568", fontSize: 12 }}
              />
              <YAxis
                tickFormatter={formatCurrency}
                tick={{ fill: "#4a5568", fontSize: 12 }}
              />
              <Tooltip
                formatter={(value: number) => [formatCurrency(value), "Amount"]}
                labelStyle={{ color: "#4a5568" }}
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  padding: "12px",
                  boxShadow:
                    "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                }}
              />
              <Bar
                dataKey="amount"
                fill="#3b82f6"
                radius={[4, 4, 0, 0]}
                barSize={30}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default MonthlyExpensesChart;

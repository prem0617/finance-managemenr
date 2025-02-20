import React, { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Transactions } from "@/types/types";

interface CategoryExpensesChartProps {
  transactions: Transactions[];
}

const CategoryExpensesChart = ({
  transactions,
}: CategoryExpensesChartProps) => {
  const COLORS = [
    "#3b82f6", // blue
    "#10b981", // green
    "#f59e0b", // yellow
    "#ef4444", // red
    "#8b5cf6", // purple
    "#ec4899", // pink
    "#6366f1", // indigo
    "#14b8a6", // teal
    "#f97316", // orange
    "#06b6d4", // cyan
  ];

  const categoryData = useMemo(() => {
    const categoryTotals = {};

    transactions.forEach((transaction) => {
      categoryTotals[transaction.category] =
        (categoryTotals[transaction.category] || 0) + transaction.amount;
    });

    const mappedData = Object.entries(categoryTotals).map(([name, value]) => ({
      name,
      value: Number((value as number).toFixed(2)), // Type assertion
    }));

    const sortedData = mappedData.sort((a, b) => a.value - b.value);

    return sortedData;
  }, [transactions]);

  return (
    <Card className="mt-8">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
        <CardTitle className="text-2xl">Expenses by Category</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {categoryData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryExpensesChart;

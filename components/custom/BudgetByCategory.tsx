import React, { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import { Transactions } from "@/types/types";

interface BudgetTransactionProps {
  transactions: Transactions[];
}

interface IBudget {
  name: string;
  amount: number;
  categoryId: string;
  _id: string;
}

const BudgetByCategory = ({ transactions }: BudgetTransactionProps) => {
  const [budget, setBudget] = useState<IBudget[]>();

  const chartData = useMemo(() => {
    if (!budget) return [];

    const today = new Date();
    const currmonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const currmonthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    console.log({ currmonth, currmonthEnd });

    return budget.map((budgetItem) => {
      const totalExpense = transactions
        .filter((t) => {
          const transactionDate = new Date(t.date);
          return (
            t.category === budgetItem.name &&
            transactionDate >= currmonth &&
            transactionDate <= currmonthEnd
          );
        })
        .reduce((sum, t) => sum + t.amount, 0);

      return {
        category: budgetItem.name,
        Budget: budgetItem.amount,
        "Actual Expense": totalExpense,
      };
    });
  }, [transactions, budget]);

  const fetchBudget = async () => {
    try {
      const response = await axios.get("/api/budget");
      setBudget(response?.data?.budget);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBudget();
  }, []);

  return (
    <Card className="mt-8">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
        <CardTitle className="text-2xl">
          Budget vs Actual Expenses (This Month)
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" tick={{ fontSize: 15 }} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Budget" fill="#3B81F6" />
            <Bar dataKey="Actual Expense" fill="#EF4444" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default BudgetByCategory;

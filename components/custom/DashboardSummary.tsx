import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IndianRupee, TrendingUp, Calendar } from "lucide-react";
import { Transactions } from "@/types/types";

interface DashboardSummaryProps {
  transactions: Transactions[];
}

const DashboardSummary = ({ transactions }: DashboardSummaryProps) => {
  const { totalExpenses, thisMonthTotal, recentTransactions } = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const totalExpenses = transactions.reduce((sum, t) => sum + t.amount, 0);

    const thisMonthTransactions = transactions.filter((t) => {
      const date = new Date(t.date);
      return (
        date.getMonth() === currentMonth && date.getFullYear() === currentYear
      );
    });

    const thisMonthTotal = thisMonthTransactions.reduce(
      (sum, t) => sum + t.amount,
      0
    );

    const categoryTotals = {};
    transactions.forEach((t) => {
      const category = t.category || "Uncategorized";
      categoryTotals[category] = (categoryTotals[category] || 0) + t.amount;
    });

    const sortedTransactions = transactions.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    const recentTransactions = sortedTransactions.slice(0, 3);

    return {
      totalExpenses,
      thisMonthTotal,
      recentTransactions,
    };
  }, [transactions]);

  const formatCurrency = (amount: number) =>
    `₹${amount.toLocaleString("en-IN")}`;
  const formatDate = (date: Date) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
    });

  const stats = [
    {
      title: "Total Expenses",
      amount: totalExpenses,
      icon: <IndianRupee className="h-6 w-6 text-blue-600" />,
    },
    {
      title: "This Month",
      amount: thisMonthTotal,
      icon: <Calendar className="h-6 w-6 text-green-600" />,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6 flex justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(stat.amount as number)}
                </p>
              </div>
              <div className="p-3 bg-gray-100 rounded-full">{stat.icon}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {recentTransactions.map((t) => (
            <div
              key={t._id}
              className="flex justify-between p-4 hover:bg-gray-50"
            >
              <div>
                <p className="font-medium text-gray-900">{t.description}</p>
                <p className="text-sm text-gray-500">
                  {t.category || "Uncategorized"}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">
                  {formatCurrency(t.amount)}
                </p>
                <p className="text-sm text-gray-500">{formatDate(t.date)}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardSummary;

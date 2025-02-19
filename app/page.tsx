// @ts-nocheck

"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Transactions } from "@/types/types";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Pencil, Trash2, Plus, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { Card, CardContent } from "@/components/ui/card";
import MonthlyExpensesChart from "@/components/custom/MonthlyExpensesChart";

const Page = () => {
  const [transactions, setTransactions] = useState<Transactions[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transactions | null>(null);
  const [editFormData, setEditFormData] = useState({
    amount: "",
    date: "",
    description: "",
  });
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState<string | null>(
    null
  );

  const fetchTransactions = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("/api/transactions");
      setTransactions(response?.data?.transactions || []); // Handle potential undefined
    } catch (error) {
      console.error(error); // Use console.error for better error handling
      toast.error("Failed to fetch transactions");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const convertToISTDate = (utcDate: Date | string) => {
    // Handle string dates
    const date = new Date(utcDate);
    return date.toLocaleDateString("en-IN", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleEditClick = (transaction: Transactions) => {
    setSelectedTransaction(transaction);
    setEditFormData({
      amount: transaction.amount.toString(),
      date: new Date(transaction.date).toISOString().split("T")[0],
      description: transaction.description,
    });
    setIsEditDialogOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleUpdateTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTransaction) return;

    try {
      const response = await axios.put(
        `/api/transactions/${selectedTransaction._id}`,
        {
          amount: parseFloat(editFormData.amount),
          date: new Date(editFormData.date),
          description: editFormData.description,
        }
      );

      if (response.status === 200) {
        toast.success("Transaction updated successfully!");

        setTransactions((prevTransactions) =>
          prevTransactions.map((t) =>
            t._id === selectedTransaction._id
              ? {
                  ...t,
                  amount: parseFloat(editFormData.amount),
                  date: new Date(editFormData.date),
                  description: editFormData.description, // Include description in update
                }
              : t
          )
        );

        setIsEditDialogOpen(false);
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to update transaction"
      );
    }
  };

  const handleDeleteClick = (id: string) => {
    setTransactionToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!transactionToDelete) return;

    try {
      await axios.delete(`/api/transactions/${transactionToDelete}`);
      toast.success("Transaction deleted successfully!");
      setTransactions((prevTransactions) =>
        prevTransactions.filter((t) => t._id !== transactionToDelete)
      );
    } catch (error: any) {
      toast.error("Failed to delete transaction");
    } finally {
      setIsDeleteDialogOpen(false);
      setTransactionToDelete(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center md:mb-8 flex-col gap-4 md:flex-row">
          <h1 className="text-4xl font-bold text-gray-800">Transactions</h1>
          <Link href="/addTransaction">
            <Button className="flex items-center gap-2 bg-blue-500 text-white hover:bg-blue-600 transition-colors">
              <Plus className="h-4 w-4" />
              Add Transaction
            </Button>
          </Link>
        </div>

        {!isLoading && transactions.length > 0 && (
          <MonthlyExpensesChart transactions={transactions} />
        )}

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
          </div>
        ) : transactions.length === 0 ? (
          <Card className="bg-white shadow-lg">
            <CardContent className="flex flex-col items-center justify-center h-64">
              <p className="text-gray-500 mb-4 text-lg">
                No transactions found
              </p>
              <Link href="/addTransaction">
                <Button className="bg-blue-500 text-white hover:bg-blue-600 transition-colors">
                  Add your first transaction
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 mt-8">
            {transactions.map((transaction) => (
              <Card
                key={transaction._id}
                className="hover:shadow-lg transition-shadow bg-white"
              >
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                    <div>
                      <p className="text-sm text-gray-500">Amount</p>
                      <p className="text-2xl font-semibold text-blue-600">
                        ₹{transaction.amount.toLocaleString("en-IN")}
                      </p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-sm text-gray-500">Description</p>
                      <p className="font-medium text-gray-800">
                        {transaction.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between md:justify-end gap-4">
                      <p className="text-sm text-gray-500">
                        {convertToISTDate(transaction.date)}
                      </p>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleEditClick(transaction)}
                          className="text-blue-500 border-blue-500 hover:bg-blue-50"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => handleDeleteClick(transaction._id)}
                          className="bg-red-500 hover:bg-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-gray-800">
                Edit Transaction
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                Modify the details of the transaction below.
              </DialogDescription>
            </DialogHeader>
            {selectedTransaction && (
              <form onSubmit={handleUpdateTransaction} className="space-y-4">
                <div>
                  <label
                    className="block text-sm font-medium mb-1 text-gray-700"
                    htmlFor="amount"
                  >
                    Amount
                  </label>
                  <Input
                    type="number"
                    id="amount"
                    name="amount"
                    value={editFormData.amount}
                    onChange={handleChange}
                    className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">
                    Date
                  </label>
                  <Input
                    type="date"
                    name="date"
                    value={editFormData.date}
                    onChange={handleChange}
                    className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">
                    Description
                  </label>
                  <Input
                    name="description"
                    value={editFormData.description}
                    onChange={handleChange}
                    className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <DialogFooter>
                  <Button
                    type="submit"
                    className="bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                  >
                    Save changes
                  </Button>
                </DialogFooter>
              </form>
            )}
          </DialogContent>
        </Dialog>

        <AlertDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-2xl font-bold text-gray-800">
                Delete Transaction
              </AlertDialogTitle>
              <AlertDialogDescription className="text-gray-600">
                Are you sure you want to delete this transaction? This action
                cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="border-gray-300 text-gray-700 hover:bg-gray-100">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteConfirm}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default Page;

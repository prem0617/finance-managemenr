/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Transaction } from "@/lib/models/transaction";

export async function GET() {
  await connectDB();
  try {
    const transactions = await Transaction.find().sort({ date: -1 });
    return NextResponse.json({ transactions });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const { amount, date, description } = body;

    if (!amount || !date || !description) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const newTransaction = new Transaction({ amount, date, description });
    await newTransaction.save();

    return NextResponse.json(
      {
        message: "Transaction added successfully",
        transaction: newTransaction,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding transaction:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

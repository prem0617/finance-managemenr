import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Category } from "@/lib/models/category";
import { Budget } from "@/lib/models/budget";

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB(); // Ensure database connection

    const params = await context.params;
    const { id } = params;

    const { name, amount, categoryId } = await req.json();

    // Validate required fields
    if (!name || !amount || !categoryId) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if budget exists
    const budget = await Budget.findById(id);
    if (!budget) {
      return NextResponse.json(
        { message: "Budget not found" },
        { status: 404 }
      );
    }

    // Check if category exists
    const category = await Category.findById(categoryId);
    if (!category) {
      return NextResponse.json(
        { message: "Invalid categoryId. Category not found." },
        { status: 404 }
      );
    }

    // Update budget details
    budget.name = name;
    budget.amount = amount;
    budget.categoryId = categoryId;

    await budget.save();

    return NextResponse.json(
      { message: "Budget updated successfully", budget },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating budget:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

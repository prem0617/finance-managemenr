import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Category } from "@/lib/models/category";
import { Budget } from "@/lib/models/budget";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { category: name, amount, categoryId } = await req.json();

    console.log({ name, amount, categoryId });

    if (!name || !amount || !categoryId) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
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

    // Check if a budget with the same name or categoryId already exists
    let existingBudget = await Budget.findOne({
      $or: [{ name }, { categoryId }],
    });

    if (existingBudget) {
      // Update existing budget
      existingBudget.amount = amount;
      await existingBudget.save();

      return NextResponse.json(
        { message: "Budget updated successfully", budget: existingBudget },
        { status: 200 }
      );
    } else {
      // Create new budget
      const newBudget = new Budget({ name, amount, categoryId });
      await newBudget.save();

      return NextResponse.json(
        { message: "Budget created successfully", budget: newBudget },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("Error processing budget:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const allBudgets = await Budget.find();

    return NextResponse.json(
      { message: "Budget fetched successfully", budget: allBudgets },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching budgets:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

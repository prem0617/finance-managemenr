/* eslint-disable @typescript-eslint/no-explicit-any */

import { connectDB } from "@/lib/db";
import { Category } from "@/lib/models/category";
import { NextRequest, NextResponse } from "next/server";

// make this api to add the category and display the user for adding the budget of the category
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { name } = await req.json();

    const newCategory = new Category({ name });

    await newCategory.save();

    return NextResponse.json({ newCategory });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error in adding the new category" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const allCategory = await Category.find();
    return NextResponse.json({ allCategory });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error in fetcing all Category" },
      { status: 500 }
    );
  }
}

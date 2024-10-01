import { connect } from "@/database/dbConnect";
import TodoModel from "@/models/Todo";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connect();
  try {
    const { id } = params;
    const { isComplete } = await req.json();
    const updatedTodo = await TodoModel.findByIdAndUpdate(
      id,
      {
        isComplete,
      },
      { new: true }
    );
    if (!updatedTodo) {
      return NextResponse.json(
        { success: false, message: "error in updating todo inside database" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "todo updated successfully",
        data: updatedTodo,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "error in updating todo" },
      { status: 500 }
    );
  }
}

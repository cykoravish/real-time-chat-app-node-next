import { connect } from "@/database/dbConnect";
import TodoModel from "@/models/Todo";
import { NextRequest, NextResponse } from "next/server";

// DELETE API
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connect();
  const { id } = params;

  try {
    // Find and delete the todo by its ID
    const deletedTodo = await TodoModel.findByIdAndDelete(id);

    if (!deletedTodo) {
      return NextResponse.json(
        { success: false, message: "Todo not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Todo deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}

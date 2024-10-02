import { connect } from "@/database/dbConnect";
import MessageModel from "@/models/Message";
import { NextRequest, NextResponse } from "next/server";

// DELETE API
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connect();
  const { id } = params;

  try {
    // Find and delete the todo by its ID
    const deletedTodo = await MessageModel.findByIdAndDelete(id);

    if (!deletedTodo) {
      return NextResponse.json(
        { success: false, message: "Mesage not deleted" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Message deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}

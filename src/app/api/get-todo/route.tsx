import { connect } from "@/database/dbConnect";
import TodoModel from "@/models/Todo";
import { NextResponse } from "next/server";

export async function GET() {
  await connect();
  try {
    const res = await TodoModel.find({});
    if (!res) {
      return NextResponse.json(
        { success: false, message: "error in getting data from database" },
        { status: 500 }
      );
    }
    return NextResponse.json(
      {
        success: true,
        message: "data successfully fetched",
        data: res,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}

import { connect } from "@/database/dbConnect";
import TodoModel from "@/models/Todo";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await connect();
  try {
    const data = await req.json();
    if (!data) {
      return NextResponse.json(
        { success: false, message: "no task added" },
        { status: 400 }
      );
    }
    const res = await TodoModel.create(data);
    if (!res) {
      return NextResponse.json(
        { success: false, message: "error in saving to database" },
        { status: 500 }
      );
    }
    return NextResponse.json(
      {
        success: true,
        message: "successfully saved",
        data: res,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}

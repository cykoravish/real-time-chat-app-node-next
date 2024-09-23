import { connect } from "@/database/dbConnect";
import MessageModel from "@/models/Message";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await connect(); // Ensure the database is connected

  try {
    const { searchParams }: any = new URL(req.url); // Get query parameters from the URL
    const limit:any = searchParams.get("limit")
      ? parseInt(searchParams.get("limit"), 10)
      : undefined; // No default value, undefined if not set

    const messages = await MessageModel.find()
      .sort({ createdAt: -1 })
      .limit(limit); // Fetch and sort by date (latest first)
    return NextResponse.json(
      { success: true, data: messages },
      { status: 200 }
    );
  } catch (error) {
    console.log("error: ", error);
    return NextResponse.json(
      { success: false, error: "Failed to get message" },
      { status: 500 }
    );
  }
}

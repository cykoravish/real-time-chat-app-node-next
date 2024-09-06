// pages/api/messages.ts

import { connect } from "@/database/dbConnect";
import MessageModel from "@/models/Message";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await connect(); // Ensure the database is connected

  try {
    const messages = await MessageModel.find().sort({ createdAt: -1 }); // Fetch and sort by date (latest first)
    return NextResponse.json(
      { success: true, data: messages },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to get message" },
      { status: 500 }
    );
  }
}

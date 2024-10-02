import { connect } from "@/database/dbConnect";
import MessageModel from "@/models/Message";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await connect(); // Ensure the database is connected

  try {
    const searchParams = new URL(req.url).searchParams; // Get query parameters from the URL
    const limit = Math.min(
      parseInt(searchParams.get("limit") || "10", 10), // Default to 10 if not provided
      100 // Cap the limit to 100 to avoid overloading the server
    );
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

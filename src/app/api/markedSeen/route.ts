import { connect } from "@/database/dbConnect";
import MessageModel from "@/models/Message";
import { NextRequest, NextResponse } from "next/server";

interface MessageRequestBody {
  _id: any;
}

export async function POST(req: NextRequest) {
  try {
    const { _id }: MessageRequestBody = await req.json();

    if (!_id) {
      return NextResponse.json({ error: "no id found" }, { status: 400 });
    }

    // Connect to MongoDB
    await connect();

    // Create a new message
    const newMessage = await MessageModel.findByIdAndUpdate(
      _id,
      { markedAsRead: true },
      { new: true } // Return the updated message
    );

    // Respond with success
    return NextResponse.json(
      { success: true, message: "Message seen successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.log("error: ", error);
    return NextResponse.json(
      { success: false, error: "Failed to seen message" },
      { status: 500 }
    );
  }
}

import { connect } from "@/database/dbConnect";
import MessageModel from "@/models/Message";
import { NextRequest, NextResponse } from "next/server";

interface MessageRequestBody {
  username: string;
  message: string;
}

export async function POST(req: NextRequest) {
  try {
    const { username, message }: MessageRequestBody = await req.json();

    if (!username || !message) {
      return NextResponse.json(
        { error: "Username and message are required" },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    await connect();

    // Create a new message
    const newMessage = new MessageModel({
      username,
      message,
      createdAt: new Date(), // Date will be automatically stored
    });

    // Save to database
    await newMessage.save();

    // Respond with success
    return NextResponse.json(
      { success: true, message: "Message sent successfully!" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to send message" },
      { status: 500 }
    );
  }
}

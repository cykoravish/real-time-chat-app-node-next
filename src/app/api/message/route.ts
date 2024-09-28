import { connect } from "@/database/dbConnect";
import MessageModel from "@/models/Message";
import { NextRequest, NextResponse } from "next/server";

interface MessageRequestBody {
  username: string;
  message: string;
  image_url: string;
  markedAsRead: boolean;
  audio_url: string;
}

export async function POST(req: NextRequest) {
  try {
    const {
      username,
      message,
      image_url,
      markedAsRead,
      audio_url,
    }: MessageRequestBody = await req.json();

    if (!username) {
      return NextResponse.json(
        { error: "invalid user" },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    await connect();

    // Create a new message
    const newMessage = new MessageModel({
      username,
      message,
      image_url,
      markedAsRead,
      audio_url,
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
    console.log(error)
    return NextResponse.json(
      { success: false, error: "Failed to send message" },
      { status: 500 }
    );
  }
}

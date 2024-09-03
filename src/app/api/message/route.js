import User from "@/models/notes";
import { dbConnect } from "@/dbConnect/dbConnect";
import { NextResponse } from "next/server";

export async function POST(req) {
  await dbConnect();
  try {
    const body = await req.json();
    const { name, message } = body;
    console.log("data:", name, message);
    if (!name || !message) {
      return NextResponse.json(
        { success: false, msg: "all fields are required" },
        { status: 400 }
      );
    }
    const newMessage = new User({
      name,
      message,
    });
    await newMessage.save();
    console.log("newuser:n,", newMessage);
    return NextResponse.json(
      { success: true, msg: "message created successful" },
      { status: 201 }
    );
  } catch (error) {
    console.log("error in api", error);
    return NextResponse.json(
      { success: false, msg: "failed to create message" },
      { status: 500 }
    );
  }
}

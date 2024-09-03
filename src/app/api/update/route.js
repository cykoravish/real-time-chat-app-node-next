import User from "@/models/notes";
import { dbConnect } from "@/dbConnect/dbConnect";
import { NextResponse } from "next/server";

export async function POST(req) {
  await dbConnect();
  try {
    const body = await req.json();
    const { isSeen, isDeleted, id } = body;
    // console.log(isSeen, isDeleted, id);
    // Find the note by ID and update it
    const updatedNote = await User.findByIdAndUpdate(
      id,
      { isSeen, isDeleted },
      { new: true } // return the updated document
    );

    if (!updatedNote) {
      return NextResponse.json(
        { success: false, message: "Note not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: updatedNote, msg: "message updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log("error in update api", error);
    return NextResponse.json(
      { success: false, msg: "failed to update message" },
      { status: 500 }
    );
  }
}

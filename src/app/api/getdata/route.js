import { dbConnect } from "@/dbConnect/dbConnect";
import User from "@/models/notes";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  try {
    const data = await User.find();
    return NextResponse.json(
      {
        success: true,
        data: data,
        message: "data fetched successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("error in get api");
    return NextResponse.json(
      {
        success: false,
        message: "error in get api",
      },
      { status: 500 }
    );
  }
}

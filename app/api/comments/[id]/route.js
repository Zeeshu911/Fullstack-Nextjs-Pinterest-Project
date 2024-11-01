import connectToDB from "@/libs/mongodb";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import Pin from "@/models/pin";

export async function POST(request, { params }) {
  try {
    connectToDB();
    const token = await getToken({ req: request });
    if (!token) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized access.",
        },
        { status: 401 }
      );
    }

    const { id } = params;
    const pin = await Pin.findById(id);

    if (!pin) {
      return NextResponse.json(
        {
          success: false,
          error: "Pin not found.",
        },
        { status: 404 }
      );
    }
    const { user, comment, profileImage } = await request.json();
    const newComment = {
      user,
      comment,
      profileImage,
    };
    pin.comments.push(newComment);
    await pin.save();
    return NextResponse.json({
      success: true,
      message: "Comment posted.",
    }, {status: 201});
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Internal server error." },
      { status: 500 }
    );
  }
}

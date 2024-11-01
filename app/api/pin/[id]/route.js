import connectToDB from "@/libs/mongodb";
import Pin from "@/models/pin";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    connectToDB();
    const { id } = params;
    const pin = await Pin.findById(id);
    if (!pin) {
      return NextResponse.json(
        { success: false, message: "Pin not found." },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, pin }, { status: 200 });
  } catch (error) {
    console.error("Error while fetching pin.");
    return NextResponse.json(
      { success: false, error: "Error while fetching pin." },
      { status: 500 }
    );
  }
};

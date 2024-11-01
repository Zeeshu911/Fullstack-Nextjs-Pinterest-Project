import cloudinary from "@/libs/cloudinary";
import connectToDB from "@/libs/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request) {
  connectToDB();

  const formData = await request.formData();
  const image = formData.get("image");
  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");

  if (!image) {
    return NextResponse.json({ error: "No file received." }, { status: 400 });
  }

  try {
    const arrayBuffer = await image.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    const uploadedResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({}, function (error, result) {
          if (error) {
            reject(error);
            return;
          }
          resolve(result);
        })
        .end(buffer);
    });
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      image: uploadedResponse.secure_url,
    });

    return NextResponse.json(
      {
        success: true,
        message: "User registered.",
        user,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("user registration failed.", error);
    return NextResponse.json(
      {
        error: "User registration failed.",
      },
      { status: 500 }
    );
  }
}

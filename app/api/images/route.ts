import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const acceptHeader = request.headers.get("accept");
  const imagesDirectory = path.join(process.cwd(), "public/Images");
  try {
    const filenames = await fs.readdir(imagesDirectory); // Read filenames in the images folder
    if (acceptHeader && acceptHeader.includes("text/html")) {
      return new NextResponse(
        "This endpoint serves image file names as JSON. Please use it via an API call."
      );
    }

    return NextResponse.json(filenames); // Send filenames as JSON to the frontend
  } catch (error) {
    console.error("Error reading images directory:", error);
    return NextResponse.json(
      { error: "Failed to read image files" },
      { status: 500 }
    );
  }
}

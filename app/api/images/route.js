import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET() {
  const imagesDirectory = path.join(process.cwd(), "public/Images");
  try {
    const filenames = await fs.readdir(imagesDirectory); // Read filenames in the Images folder
    return NextResponse.json(filenames); // Send filenames as JSON
  } catch (error) {
    console.error("Error reading images directory:", error);
    return NextResponse.json(
      { error: "Failed to read image files" },
      { status: 500 }
    );
  }
}

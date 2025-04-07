import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { email, message } = await request.json();

  try {
    const data = await resend.emails.send({
      from: "no-reply <noreply@badrulhanif.com>",
      to: ["hanifbaharuddin@gmail.com"], // must be an array
      subject: "New Collaboration Request",
      html: `<p><strong>From:</strong> ${email}</p><p>${message}</p>`,
    });

    return NextResponse.json({ success: true, data });
  } catch (error: unknown) {
    console.error("Error sending email:", error);

    let errorMessage = "An unknown error occurred";

    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({ success: false, error: errorMessage });
  }
}

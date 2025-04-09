import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { email, message } = await request.json();

  try {
    const copyToMe = await resend.emails.send({
      from: "no-reply <noreply@badrulhanif.com>",
      to: ["hanifbaharuddin@gmail.com"], // must be an array
      subject: "New Collaboration Request",
      html: `<p><strong>From:</strong> ${email}</p><p>${message}</p>`,
    });

    const copyToUser = await resend.emails.send({
      from: "no-reply <noreply@badrulhanif.com>",
      to: [`${email}`], // must be an array
      subject: "Your idea has set sail 🚀",
      html: `<div style="max-width: 600px; margin: 0 auto;">
  <div style="text-align: center; margin-bottom: 24px;">
    <img src="https://picsum.photos/200/300" alt="Logo" width="96" height="96" style="margin-bottom: 12px;" />
    <h1 style="font-size: 24px; color: #4A4E5A; margin-bottom: 12px;">We heard you!</h1>
    <p style="font-size: 16px; color: #5B616E;">Thank you for reaching out. Your idea sounds awesome, and I'm excited about the possibility of working together!</p>
  </div>

  <div style="padding: 12px; margin-bottom: 24px; border: 1px solid #ddd; border-radius: 12px; background: #f9f9f9;">
    <p style="font-size: 16px; color: #5B616E; font-weight: 600;">Here's a copy of your submission:</p>
    <p style="font-size: 16px; color: #5B616E;">${message}</p>
  </div>

  <p style="font-size: 16px; color: #5B616E; margin-bottom: 24px;">Let’s build something great together!</p>
  <p style="text-align: center; color: #1a73e8; text-decoration: none; display: block;">
    <a href="https://dribbble.com/badrulhanif">Dribbble</a>
    <a href="https://github.com/badrulhanif">GitHub</a>
    <a href="https://www.linkedin.com/in/badrul-hanif-b01471196/">LinkedIn</a>
  </p>
  </div>
`,
    });

    return NextResponse.json({ success: true, data: { copyToMe, copyToUser } });
  } catch (error: unknown) {
    console.error("Error sending email:", error);

    let errorMessage = "An unknown error occurred";

    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({ success: false, error: errorMessage });
  }
}

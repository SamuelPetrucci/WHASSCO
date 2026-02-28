import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and why you're interested are required" },
        { status: 400 }
      );
    }

    const emailContent = {
      to: process.env.CONTACT_EMAIL || "info@whaasco.org",
      from: process.env.FROM_EMAIL || "noreply@whaasco.org",
      subject: `Join WHAASCO Interest Form: ${name}`,
      text: `
        New interest form submission:

        Name: ${name}
        Email: ${email}
        Phone: ${phone || "Not provided"}
        Message: ${message || "None"}
      `,
      html: `
        <h2>Join WHAASCO Interest Form</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Message:</strong></p>
        <p>${(message || "None").replace(/\n/g, "<br>")}</p>
      `,
    };

    // TODO: Integrate with email service (SendGrid, Resend, AWS SES, etc.)
    console.log("Join WHAASCO form submission:", emailContent);

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for your interest! We'll be in touch soon.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing join form:", error);
    return NextResponse.json(
      { error: "Failed to submit. Please try again later." },
      { status: 500 }
    );
  }
}

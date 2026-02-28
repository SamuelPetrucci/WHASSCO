import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and why you're interested are required" },
        { status: 400 }
      );
    }

    // Email configuration
    // Note: In production, use a service like SendGrid, Resend, or AWS SES
    // For now, this is a placeholder that logs the submission
    const emailContent = {
      to: process.env.CONTACT_EMAIL || "info@whaasco.org",
      from: process.env.FROM_EMAIL || "noreply@whaasco.org",
      subject: `New Contact / Interest Form Submission from ${name}`,
      text: `
        New contact / interest form submission:
        
        Name: ${name}
        Email: ${email}
        Phone: ${phone || "Not provided"}
        Message: ${message}
      `,
      html: `
        <h2>New Contact / Interest Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    };

    // TODO: Integrate with email service (SendGrid, Resend, AWS SES, etc.)
    // Example with Resend:
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: emailContent.from,
    //   to: emailContent.to,
    //   subject: emailContent.subject,
    //   html: emailContent.html,
    // });

    // For development, log the email content
    console.log("Contact form submission:", emailContent);

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for your message! We'll get back to you soon.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}

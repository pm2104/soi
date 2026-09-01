import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, phone, message } = await request.json();

    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: "SOI Contact Form <noreply@soiglobal.in>",
      to: [process.env.CONTACT_EMAIL || "info@soiglobal.in"],
      replyTo: email,
      subject: `New Contact Form Submission - ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>

        <p><strong>Name:</strong> ${name}</p>

        <p><strong>Email:</strong> ${email}</p>

        <p><strong>Phone:</strong> ${phone}</p>

        <p><strong>Message:</strong></p>

        <p>${message}</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);

      return NextResponse.json(
        { message: "Failed to send email." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Message sent successfully.",
      id: data?.id,
    });
  } catch (error) {
    console.error("Contact API error:", error);

    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 }
    );
  }
}
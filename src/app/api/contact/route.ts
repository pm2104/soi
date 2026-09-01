import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;

    // Check the API key only when the API route is actually called.
    // This prevents the Next.js build from failing if the key is missing.
    if (!apiKey) {
      console.error("RESEND_API_KEY is not configured.");

      return Response.json(
        {
          message:
            "Email service is not configured. Please contact us directly at info@soiglobal.in.",
        },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    const body = await request.json();

    const name = String(body?.name || "").trim();
    const email = String(body?.email || "").trim();
    const phone = String(body?.phone || "").trim();
    const message = String(body?.message || "").trim();

    // Validate required fields
    if (!name || !email || !phone || !message) {
      return Response.json(
        {
          message: "Please fill in all required fields.",
        },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return Response.json(
        {
          message: "Please enter a valid email address.",
        },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from:
        process.env.RESEND_FROM_EMAIL ||
        "Supervisors of India <onboarding@resend.dev>",

      to: ["info@soiglobal.in"],

      replyTo: email,

      subject: `New Contact Form Message from ${name}`,

      html: `
        <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto; padding: 20px;">
          
          <h2 style="color: #0d1b41; margin-bottom: 24px;">
            New Contact Form Message
          </h2>

          <div style="background: #f8f9fb; padding: 20px; border-radius: 12px;">
            
            <p style="margin: 0 0 12px;">
              <strong>Name:</strong> ${escapeHtml(name)}
            </p>

            <p style="margin: 0 0 12px;">
              <strong>Email:</strong> ${escapeHtml(email)}
            </p>

            <p style="margin: 0 0 12px;">
              <strong>Phone:</strong> ${escapeHtml(phone)}
            </p>

          </div>

          <div style="margin-top: 24px;">
            <h3 style="color: #0d1b41;">
              Message
            </h3>

            <div style="background: #ffffff; border: 1px solid #e5e8ee; padding: 20px; border-radius: 12px; line-height: 1.7;">
              ${escapeHtml(message).replace(/\n/g, "<br />")}
            </div>
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e8ee; color: #6b7280; font-size: 13px;">
            <p>
              This message was submitted through the Supervisors of India website.
            </p>
          </div>

        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);

      return Response.json(
        {
          message:
            "Unable to send email right now. Please try again later.",
        },
        { status: 500 }
      );
    }

    console.log("Contact email sent:", data?.id);

    return Response.json(
      {
        success: true,
        message: "Message sent successfully.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact API error:", error);

    return Response.json(
      {
        message:
          "Something went wrong while sending your message.",
      },
      { status: 500 }
    );
  }
}

/**
 * Escape user-provided content before inserting it into HTML.
 */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
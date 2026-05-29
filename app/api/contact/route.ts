import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const TO_EMAIL = "rohithanfreelance@gmail.com"; // Resend account owner email

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, company, service, message } = await req.json();

    // Basic validation
    if (!name || !email || !phone || !service || !message) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const { error } = await resend.emails.send({
      from: "Buildora Contact <onboarding@resend.dev>",
      to: TO_EMAIL,
      replyTo: email,
      subject: `New Enquiry from ${name} — ${service}`,
      html: `
        <div style="font-family: monospace; background: #222222; color: #e8e8e8; padding: 40px; max-width: 600px; margin: 0 auto;">
          <div style="border-bottom: 2px solid #89E900; padding-bottom: 20px; margin-bottom: 32px;">
            <h1 style="color: #89E900; font-size: 22px; margin: 0; letter-spacing: 0.15em; text-transform: uppercase;">
              New Contact Form Submission
            </h1>
            <p style="color: rgba(232,232,232,0.4); font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; margin: 8px 0 0;">
              Buildora Website
            </p>
          </div>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(232,232,232,0.08); color: rgba(232,232,232,0.4); font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; width: 140px;">Name</td>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(232,232,232,0.08); color: #e8e8e8; font-size: 14px;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(232,232,232,0.08); color: rgba(232,232,232,0.4); font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase;">Email</td>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(232,232,232,0.08); color: #89E900; font-size: 14px;">
                <a href="mailto:${email}" style="color: #89E900; text-decoration: none;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(232,232,232,0.08); color: rgba(232,232,232,0.4); font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase;">Mobile</td>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(232,232,232,0.08); color: #e8e8e8; font-size: 14px;">
                <a href="tel:${phone}" style="color: #e8e8e8; text-decoration: none;">${phone}</a>
              </td>
            </tr>
            ${company ? `
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(232,232,232,0.08); color: rgba(232,232,232,0.4); font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase;">Company</td>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(232,232,232,0.08); color: #e8e8e8; font-size: 14px;">${company}</td>
            </tr>` : ""}
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(232,232,232,0.08); color: rgba(232,232,232,0.4); font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase;">Service</td>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(232,232,232,0.08);">
                <span style="background: rgba(137,233,0,0.15); color: #89E900; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; padding: 4px 10px; border: 1px solid rgba(137,233,0,0.3);">${service}</span>
              </td>
            </tr>
          </table>

          <div style="margin-top: 28px;">
            <p style="color: rgba(232,232,232,0.4); font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 12px;">Message</p>
            <div style="background: rgba(232,232,232,0.04); border-left: 3px solid #89E900; padding: 20px; color: #e8e8e8; font-size: 14px; line-height: 1.75;">
              ${message.replace(/\n/g, "<br/>")}
            </div>
          </div>

          <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid rgba(232,232,232,0.08); text-align: center;">
            <p style="color: rgba(232,232,232,0.2); font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; margin: 0;">
              Buildora · Technology. Strategy. Execution.
            </p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}

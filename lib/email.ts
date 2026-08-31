import nodemailer from "nodemailer";

interface SendOtpOptions {
  to: string;
  name?: string;
  otp: string;
  purpose?: string;
}

export async function sendOtpEmail({
  to,
  name,
  otp,
  purpose = "Account Registration",
}: SendOtpOptions): Promise<{ success: boolean; error?: string; provider?: string }> {
  const recipientName = name ? name.trim() : "GTU Student";
  const emailFrom = process.env.EMAIL_FROM || '"GTU All In One" <notifications@gtu-all-in-one.com>';

  const htmlContent = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; background-color: #f8fafc; border-radius: 16px;">
      <div style="background: linear-gradient(135deg, #1e40af, #3b82f6); padding: 24px; border-radius: 12px; text-align: center; color: white; margin-bottom: 20px;">
        <h1 style="margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">GTU All In One</h1>
        <p style="margin: 6px 0 0 0; font-size: 13px; opacity: 0.9;">Gujarat Technological University Student Portal</p>
      </div>

      <div style="background-color: #ffffff; padding: 28px; border-radius: 12px; border: 1px solid #e2e8f0; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
        <p style="font-size: 15px; color: #334155; margin-top: 0;">Hello <strong>${recipientName}</strong>,</p>
        <p style="font-size: 14px; color: #475569; line-height: 1.5;">
          Your one-time email verification code for <strong>${purpose}</strong> is:
        </p>

        <div style="text-align: center; margin: 24px 0;">
          <div style="display: inline-block; background-color: #f1f5f9; border: 2px dashed #cbd5e1; border-radius: 12px; padding: 14px 28px;">
            <span style="font-family: 'Courier New', Courier, monospace; font-size: 34px; font-weight: 800; letter-spacing: 8px; color: #1e3a8a;">
              ${otp}
            </span>
          </div>
        </div>

        <p style="font-size: 13px; color: #64748b; line-height: 1.5; margin-bottom: 0;">
          ⏳ This code is valid for <strong>10 minutes</strong>. Do not share this OTP with anyone.<br/>
          If you did not request this verification, please ignore this email.
        </p>
      </div>

      <div style="text-align: center; margin-top: 20px; font-size: 11px; color: #94a3b8;">
        © ${new Date().getFullYear()} GTU All In One • Gujarat Technological University Student Platform
      </div>
    </div>
  `;

  // 1. Resend REST API Dispatch (if RESEND_API_KEY is present)
  if (process.env.RESEND_API_KEY) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: emailFrom.includes("@") ? emailFrom : "GTU All In One <onboarding@resend.dev>",
          to: [to],
          subject: `🔐 Your GTU Verification OTP: ${otp}`,
          html: htmlContent,
        }),
      });

      if (res.ok) {
        console.log(`[RESEND] Successfully dispatched OTP email to ${to}`);
        return { success: true, provider: "resend" };
      } else {
        const resText = await res.text();
        console.warn(`[RESEND ERROR] Status: ${res.status}, Body: ${resText}`);
      }
    } catch (e: any) {
      console.error("[RESEND EXCEPTION]", e);
    }
  }

  // 2. Brevo / Sendinblue REST API Dispatch (if BREVO_API_KEY is present)
  if (process.env.BREVO_API_KEY || process.env.SENDINBLUE_API_KEY) {
    const apiKey = process.env.BREVO_API_KEY || process.env.SENDINBLUE_API_KEY;
    try {
      const res = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "api-key": apiKey!,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sender: { name: "GTU All In One", email: process.env.BREVO_SENDER_EMAIL || "verify@gtu-all-in-one.com" },
          to: [{ email: to, name: recipientName }],
          subject: `🔐 Your GTU Verification OTP: ${otp}`,
          htmlContent,
        }),
      });

      if (res.ok) {
        console.log(`[BREVO] Successfully dispatched OTP email to ${to}`);
        return { success: true, provider: "brevo" };
      }
    } catch (e: any) {
      console.error("[BREVO EXCEPTION]", e);
    }
  }

  // 3. Standard SMTP Transporter (e.g. Gmail App Password, Custom SMTP, Brevo, SendGrid)
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = parseInt(process.env.SMTP_PORT || "587", 10);
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASSWORD || process.env.SMTP_PASS;

  if (smtpHost && smtpUser && smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      await transporter.sendMail({
        from: emailFrom,
        to,
        subject: `🔐 Your GTU Verification OTP: ${otp}`,
        html: htmlContent,
      });

      console.log(`[SMTP DISPATCH] Real OTP email successfully sent to ${to} via ${smtpHost}`);
      return { success: true, provider: "smtp" };
    } catch (error: any) {
      console.error("[SMTP ERROR] Failed to send email:", error);
      return { success: false, error: error.message || "Failed to dispatch email via SMTP" };
    }
  }

  // Fallback Dev / Simulator Logger
  console.log(`\n======================================================`);
  console.log(`[EMAIL DISPATCHER NOTE] No SMTP/Resend credentials configured.`);
  console.log(`[EMAIL DISPATCHER NOTE] To receive real emails in Gmail, set SMTP_HOST, SMTP_USER, SMTP_PASSWORD or RESEND_API_KEY in environment variables.`);
  console.log(`[EMAIL SIMULATOR] To: ${to}`);
  console.log(`[EMAIL SIMULATOR] OTP CODE: [ ${otp} ]`);
  console.log(`======================================================\n`);

  return { success: true, provider: "simulator" };
}

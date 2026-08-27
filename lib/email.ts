import nodemailer from "nodemailer";

interface SendOtpOptions {
  to: string;
  name?: string;
  otp: string;
  purpose?: string;
}

export async function sendOtpEmail({ to, name, otp, purpose = "Account Registration" }: SendOtpOptions): Promise<{ success: boolean; error?: string }> {
  try {
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = parseInt(process.env.SMTP_PORT || "587", 10);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASSWORD || process.env.SMTP_PASS;
    const emailFrom = process.env.EMAIL_FROM || '"GTU All In One" <noreply@gtu-all-in-one.com>';

    const htmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; background-color: #f8fafc; border-radius: 16px;">
        <div style="background: linear-gradient(135deg, #1e40af, #3b82f6); padding: 24px; border-radius: 12px; text-align: center; color: white; margin-bottom: 20px;">
          <h1 style="margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">GTU All In One</h1>
          <p style="margin: 6px 0 0 0; font-size: 13px; opacity: 0.9;">Gujarat Technological University Student Portal</p>
        </div>

        <div style="background-color: #ffffff; padding: 28px; border-radius: 12px; border: 1px solid #e2e8f0; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
          <p style="font-size: 15px; color: #334155; margin-top: 0;">Hello ${name ? `<strong>${name}</strong>` : "Student"},</p>
          <p style="font-size: 14px; color: #475569; line-height: 1.5;">
            Your one-time email verification code for <strong>${purpose}</strong> is:
          </p>

          <div style="text-align: center; margin: 24px 0;">
            <div style="display: inline-block; background-color: #f1f5f9; border: 2px dashed #cbd5e1; border-radius: 12px; padding: 14px 28px;">
              <span style="font-family: 'Courier New', Courier, monospace; font-size: 32px; font-weight: 800; letter-spacing: 8px; color: #1e3a8a;">
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

    // If SMTP host and credentials are configured, dispatch real email
    if (smtpHost && smtpUser && smtpPass) {
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

      console.log(`[EMAIL DISPATCH] Real OTP email successfully sent to ${to}`);
      return { success: true };
    }

    // Dev/Fallback Logger
    console.log(`\n======================================================`);
    console.log(`[EMAIL SIMULATOR] To: ${to}`);
    console.log(`[EMAIL SIMULATOR] Subject: Your GTU Verification OTP: ${otp}`);
    console.log(`[EMAIL SIMULATOR] OTP CODE: [ ${otp} ]`);
    console.log(`======================================================\n`);
    return { success: true };
  } catch (error: any) {
    console.error("[EMAIL ERROR] Failed to send email:", error);
    return { success: false, error: error.message || "Failed to dispatch email" };
  }
}

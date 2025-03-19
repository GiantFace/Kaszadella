import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false, // !!! ✅ SSL kell 465-ös portra!
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
  logger: true, // SMTP logok
  debug: true, // részletes info
});

export async function sendMail(
  to: string,
  subject: string,
  htmlContent: string,
) {
  try {
    const info = await transporter.sendMail({
      from: `"Kaszadella 👻" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html: htmlContent,
    });
    console.log("✅ Email sikeresen elküldve:", info.messageId);
    return info.messageId;
  } catch (error: any) {
    console.error("❌ Email küldési hiba:", error.message, error.code);
    throw error;
  }
}

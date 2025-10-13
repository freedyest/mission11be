import nodemailer from "nodemailer";

export async function sendVerificationEmail(email, token) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS, // gunakan App Password Gmail
    },
  });

  const verificationUrl = `http://localhost:8080/verify-email?token=${token}`;

  const mailOptions = {
    from: `"EduCourse" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Verifikasi Email EduCourse",
    html: `<p>Silakan klik link berikut untuk verifikasi email:</p>
           <a href="${verificationUrl}">Verifikasi Email</a>`,
  };

  await transporter.sendMail(mailOptions);
}

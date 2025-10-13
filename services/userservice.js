import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import nodemailer from "nodemailer";
import { db } from "../config/db.js";

export async function registerUser(fullname, username, password, email) {
  // Enkripsi password
  const hashedPassword = await bcrypt.hash(password, 10);

  // buat verification email
  async function sendVerificationEmail(email, token) {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
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

  const verificationToken = uuidv4();
  // Simpan ke database
  const [result] = await db.query(
    `INSERT INTO user (fullname, username, password, email, verification_token)
     VALUES (?, ?, ?, ?, ?)`,
    [fullname, username, hashedPassword, email, verificationToken]
  );

  // kirim email verifikasi
  await sendVerificationEmail(email, verificationToken);

  return {
    id_user: result.insertId,
    fullname,
    username,
    email,
  };
}

export async function loginUser(email, password) {
  // search user by email
  const [rows] = await db.query("SELECT * FROM user WHERE email = ?", [email]);
  const user = rows[0];

  if (!user) {
    throw new Error("Email atau password salah!");
  }

  //  password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Email atau password salah!");
  }

  // make JWT token
  const token = jwt.sign(
    { id_user: user.id_user, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES }
  );

  // Return hasil
  return {
    message: "Login berhasil!",
    token,
    user: {
      id_user: user.id_user,
      fullname: user.fullname,
      username: user.username,
      email: user.email,
    },
  };
}

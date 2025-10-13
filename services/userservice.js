import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { db } from "../config/db.js";
import { sendVerificationEmail } from "./mailservice.js";

export async function registerUser(fullname, username, password, email) {
  // enkripsi password
  const hashedPassword = await bcrypt.hash(password, 10);

  // buat token verifikasi
  const verificationToken = uuidv4();

  // simpan user + token
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

// login
export async function loginUser(email, password) {
  const [rows] = await db.query("SELECT * FROM user WHERE email = ?", [email]);
  const user = rows[0];

  if (!user) throw new Error("Email atau password salah!");

  // cek apakah sudah verifikasi email
  if (user.is_verified === 0) {
    throw new Error("Email belum diverifikasi!");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Email atau password salah!");

  const token = jwt.sign(
    { id_user: user.id_user, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES }
  );

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

// verifikasi email
export async function verifyEmail(token) {
  const [rows] = await db.query(
    "SELECT * FROM user WHERE verification_token = ?",
    [token]
  );

  if (rows.length === 0) {
    throw new Error("Invalid Verification Token");
  }

  await db.query(
    "UPDATE user SET is_verified = 1, verification_token = NULL WHERE verification_token = ?",
    [token]
  );

  return { status: 200, message: "Email Verified Successfully" };
}

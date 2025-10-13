import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { db } from "../config/db.js";

export async function registerUser(fullname, username, password, email) {
  // Enkripsi password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Simpan ke database
  const [result] = await db.query(
    `INSERT INTO user (fullname, username, password, email)
     VALUES (?, ?, ?, ?)`,
    [fullname, username, hashedPassword, email]
  );

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

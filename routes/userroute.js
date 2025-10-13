import express from "express";
import { registerUser, loginUser } from "../services/userservice.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { getAllCourses } from "../services/courseservice.js"; // kalau mau tes proteksi endpoint

const router = express.Router();

/* REGISTER USER*/
router.post("/register", async (req, res) => {
  try {
    const { fullname, username, password, email } = req.body;

    // 400 — Client error (Bad Request)
    if (!fullname || !username || !password || !email) {
      return res.status(400).json({
        status: 400,
        message: "Semua field wajib diisi!",
      });
    }

    const newUser = await registerUser(fullname, username, password, email);

    // 201 — Successful creation
    res.status(201).json({
      status: 201,
      message: "✅ Registrasi berhasil!",
      data: newUser,
    });
  } catch (err) {
    console.error("❌ ERROR REGISTER:", err);

    // 500 — Server error
    res.status(500).json({
      status: 500,
      message: "Terjadi kesalahan di server",
      error: err.message,
    });
  }
});

/*  LOGIN USER */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 400 — Client error
    if (!email || !password) {
      return res.status(400).json({
        status: 400,
        message: "Email dan password wajib diisi!",
      });
    }

    const result = await loginUser(email, password);

    // 200 — Success
    res.status(200).json({
      status: 200,
      message: result.message,
      token: result.token,
      user: result.user,
    });
  } catch (err) {
    console.error("❌ ERROR LOGIN:", err);

    // 401 — Unauthorized
    res.status(401).json({
      status: 401,
      message: "Email atau password salah!",
      error: err.message,
    });
  }
});

/*  ROUTE PROTECTED*/
router.get("/protected-courses", verifyToken, async (req, res) => {
  try {
    const courses = await getAllCourses();
    res.status(200).json({
      status: 200,
      message: "✅ Token valid! Data course berhasil diambil.",
      data: courses,
      user: req.user, //  decode JWT
    });
  } catch (err) {
    console.error("❌ ERROR GET COURSES:", err);
    res.status(500).json({
      status: 500,
      message: "Terjadi kesalahan di server",
      error: err.message,
    });
  }
});

export default router;

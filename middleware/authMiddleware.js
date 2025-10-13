import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    // Ambil token dari header Authorization
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        status: 401,
        message: "Token tidak ditemukan. Akses ditolak!",
      });
    }

    // Format header biasanya: "Bearer <token>"
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        status: 401,
        message: "Token tidak valid!",
      });
    }

    // Verifikasi token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Simpan data user hasil decode ke request (bisa dipakai di controller)
    req.user = decoded;

    // lanjut ke controller
    next();
  } catch (err) {
    console.error("❌ ERROR VERIFY TOKEN:", err);

    return res.status(401).json({
      status: 401,
      message: "Token tidak sah atau sudah kedaluwarsa!",
    });
  }
};

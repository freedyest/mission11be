import express from "express";
import { upload } from "../services/uploadservice.js";

const router = express.Router();

// endpoint /upload, field file bernama "image"
router.post("/upload", upload.single("image"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "File tidak ditemukan!" });
    }

    res.status(200).json({
      message: "Upload berhasil!",
      file: req.file.filename,
      path: `/upload/${req.file.filename}`,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Terjadi kesalahan di server", error: err.message });
  }
});

export default router;

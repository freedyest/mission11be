import multer from "multer";
import path from "path";

// konfigurasi storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload/"); // folder tujuan
  },
  filename: (req, file, cb) => {
    // memberi nama file unik agar tidak overwrite
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname); // ambil ekstensi file
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

// filter file hanya gambar
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const ext = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mime = allowedTypes.test(file.mimetype);

  if (ext && mime) {
    cb(null, true);
  } else {
    cb(new Error("File harus berupa gambar (jpeg, jpg, png, gif)"));
  }
};

// export middleware multer
export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // max 5MB
  fileFilter,
});

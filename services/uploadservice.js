import multer from "multer";
import path from "path";

//  storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload/"); // folder target
  },
  filename: (req, file, cb) => {
    // generate name
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname); //  ekstensi file
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

// filter file  gambar
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
  limits: {},
  fileFilter,
});

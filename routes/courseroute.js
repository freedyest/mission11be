import express from "express";
import {
  getAllCourses,
  getcourse,
  createcourses,
  updatecourse,
  patchCourse,
  deletecourse,
} from "../services/courseservice.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(verifyToken);

// GET all courses
router.get("/", async (req, res) => {
  try {
    const courses = await getAllCourses(req.query);
    res.json(courses);
  } catch (err) {
    console.error("❌ ERROR getAllCourses:", err);
    res.status(500).json({ error: err.message });
  }
});
// GET course by id
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const course = await getcourse(id);
  res.json(course);
});

// CREATE course
router.post("/", async (req, res) => {
  try {
    const { id_tutor, id_kategori, nama_kelas, deskripsi, harga } = req.body;

    const course = await createcourses(
      id_tutor,
      id_kategori,
      nama_kelas,
      deskripsi,
      harga
    );

    res
      .status(201)
      .json({ message: "✅ Course berhasil dibuat!", data: course });
  } catch (err) {
    console.error("❌ ERROR di POST /courses:", err);
    res.status(500).json({ error: err.message });
  }
});

// UPDATE (PUT)
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { nama_kelas, deskripsi, harga, id_kategori, id_tutor } = req.body;
    const course = await updatecourse(
      id,
      nama_kelas,
      deskripsi,
      harga,
      id_kategori,
      id_tutor
    );
    res
      .status(200)
      .json({ message: "✅ Course berhasil diupdate!", data: course });
  } catch (err) {
    console.error("❌ ERROR di PUT /courses/:id:", err);
    res.status(500).json({ error: err.message });
  }
});

// PATCH (update sebagian)
router.patch("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const course = await patchCourse(id, data);
    res
      .status(200)
      .json({ message: "✅ Course berhasil diupdate!", data: course });
  } catch (err) {
    console.error("❌ ERROR di PATCH /courses/:id:", err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const course = await deletecourse(id);
  res
    .status(200)
    .json({ message: "✅ Course berhasil dihapus!", data: course });
});

export default router;

import express from "express";
import {
  getAllCourses,
  getcourse,
  createcourses,
  updatecourse,
  patchCourse,
  deletecourse,
} from "../services/courseservice.js";

const router = express.Router();
//all course
router.get("/", async (req, res) => {
  const courses = await getAllCourses();
  res.json(courses);
});
//course by id
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const course = await getcourse(id);
  res.json(course);
});
//create course
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

//update put course
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

//update patch course
router.patch("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body; // bisa berisi { nama_kelas, deskripsi, harga, id_kategori, id_tutor }

    const course = await patchCourse(id, data); // kirim objek data langsung

    res
      .status(200)
      .json({ message: "✅ Course berhasil diupdate!", data: course });
  } catch (err) {
    if (
      err.message === "Course tidak ditemukan" ||
      err.message === "Tutor tidak ditemukan" ||
      err.message === "Kategori tidak ditemukan"
    ) {
      return res.status(404).json({ error: err.message });
    }
    console.error("❌ ERROR di PATCH /courses/:id:", err);
    res.status(500).json({ error: err.message });
  }
});
//delete course
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const course = await deletecourse(id);
  res
    .status(200)
    .json({ message: "✅ Course berhasil dihapus!", data: course });
});
export default router;

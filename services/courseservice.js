import { db } from "../config/db.js";

// semua course
export async function getAllCourses(filters = {}) {
  const {
    categoryId,
    categoryName,
    category,
    sort,
    order,
    search,
    minPrice,
    maxPrice,
  } = filters;

  let query = `
    SELECT 
      course.id,
      course.nama_kelas,
      course.deskripsi,
      course.harga,
      tutor.nama_tutor,
      tutor.pekerjaan_tutor,
      tutor.tempat_kerja,
      kategori_kelas.nama_kategori
    FROM course
    JOIN tutor ON course.id_tutor = tutor.id_tutor
    JOIN kategori_kelas ON course.id_kategori = kategori_kelas.id_kategori
  `;

  const conditions = [];
  const values = [];

  // FILTER
  if (category) {
    conditions.push("course.id_kategori = ?");
    values.push(category);
  }

  if (categoryId) {
    conditions.push("kategori_kelas.id_kategori = ?");
    values.push(categoryId);
  }

  if (categoryName) {
    conditions.push("kategori_kelas.nama_kategori LIKE ?");
    values.push(`%${categoryName}%`);
  }

  if (minPrice !== undefined) {
    conditions.push("course.harga >= ?");
    values.push(Number(minPrice));
  }

  if (maxPrice !== undefined) {
    conditions.push("course.harga <= ?");
    values.push(Number(maxPrice));
  }

  // SEARCH
  if (search) {
    conditions.push("course.nama_kelas LIKE ?");
    values.push(`%${search}%`);
  }

  if (conditions.length > 0) {
    query += " WHERE " + conditions.join(" AND ");
  }

  // SORT
  if (sort) {
    const validSort = ["nama_kelas", "harga", "id"];
    if (validSort.includes(sort)) {
      query += ` ORDER BY course.${sort} ${order === "desc" ? "DESC" : "ASC"}`;
    }
  }

  const [rows] = await db.query(query, values);
  return rows;
}

// course by id
export async function getcourse(id) {
  const [rows] = await db.query("SELECT * FROM course WHERE id = ?", [id]);
  return rows[0];
}
// buat course
export async function createcourses(
  id_tutor,
  id_kategori,
  nama_kelas,
  deskripsi,
  harga
) {
  const [result] = await db.query(
    "INSERT INTO course (id_tutor, id_kategori,nama_kelas, deskripsi,harga) VALUES (?, ?,?,?,?)",
    [id_tutor, id_kategori, nama_kelas, deskripsi, harga]
  );
  const id = result.insertId;
  return getcourse(id);
}

// update course
export async function updatecourse(
  id,
  nama_kelas,
  deskripsi,
  harga,
  id_kategori,
  id_tutor
) {
  try {
    const [result] = await db.query(
      "UPDATE course SET nama_kelas = ?, deskripsi = ?, harga = ?, id_kategori = ?, id_tutor = ? WHERE id = ?",
      [nama_kelas, deskripsi, harga, id_kategori, id_tutor, id]
    );

    if (result.affectedRows === 0) {
      throw new Error("Course tidak ditemukan");
    }

    return getcourse(id);
  } catch (err) {
    console.error("❌ Gagal update course:", err);
    throw err;
  }
}
//patch course
export async function patchCourse(id, data) {
  const fields = [];
  const values = [];

  if (data.nama_kelas !== undefined) {
    fields.push("nama_kelas = ?");
    values.push(data.nama_kelas);
  }
  if (data.deskripsi !== undefined) {
    fields.push("deskripsi = ?");
    values.push(data.deskripsi);
  }
  if (data.harga !== undefined) {
    fields.push("harga = ?");
    values.push(data.harga);
  }
  if (data.id_kategori !== undefined) {
    // cek kategori exist
    const [kategori] = await db.query(
      "SELECT * FROM kategori WHERE id_kategori = ?",
      [data.id_kategori]
    );
    if (kategori.length === 0) throw new Error("Kategori tidak ditemukan");
    fields.push("id_kategori = ?");
    values.push(data.id_kategori);
  }
  if (data.id_tutor !== undefined) {
    // cek tutor exist
    const [tutor] = await db.query("SELECT * FROM tutor WHERE id_tutor = ?", [
      data.id_tutor,
    ]);
    if (tutor.length === 0) throw new Error("Tutor tidak ditemukan");
    fields.push("id_tutor = ?");
    values.push(data.id_tutor);
  }

  if (fields.length === 0) throw new Error("Tidak ada data untuk diupdate");

  values.push(id);
  const sql = `UPDATE course SET ${fields.join(", ")} WHERE id = ?`;
  const [result] = await db.query(sql, values);

  if (result.affectedRows === 0) throw new Error("Course tidak ditemukan");

  return getcourse(id);
}

//delete
export async function deletecourse(id) {
  try {
    const [result] = await db.query("DELETE FROM course WHERE id = ?", [id]);
    if (result.affectedRows === 0) {
      throw new Error("Course tidak ditemukan");
    }
    return true;
  } catch (err) {
    console.error("❌ Gagal menghapus course:", err);
    throw err;
  }
}

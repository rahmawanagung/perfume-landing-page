import pool from "../db.js"; // Menggunakan sintaks import

// Fungsi untuk mendapatkan semua produk dengan pagination
const getAllPerfumes = async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 8;
  const offset = (page - 1) * limit;

  try {
    const totalResult = await pool.query(
      "SELECT COUNT(*) FROM perfumes WHERE main_accords IS NOT NULL AND image_url IS NOT NULL"
    );
    const totalPerfumes = parseInt(totalResult.rows[0].count, 10);

    const perfumesResult = await pool.query(
      `SELECT * FROM perfumes WHERE main_accords IS NOT NULL AND image_url IS NOT NULL ORDER BY id ASC LIMIT $1 OFFSET $2`,
      [limit, offset]
    );

    res.json({
      totalPerfumes,
      totalPages: Math.ceil(totalPerfumes / limit),
      currentPage: page,
      perfumes: perfumesResult.rows,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Fungsi untuk mendapatkan satu produk berdasarkan ID
const getPerfumeById = async (req, res) => {
  try {
    const { id } = req.params;
    const perfume = await pool.query("SELECT * FROM perfumes WHERE id = $1", [
      id,
    ]);

    if (perfume.rows.length === 0) {
      return res.status(404).json({ msg: "Perfume not found" });
    }

    res.json(perfume.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

export { getAllPerfumes, getPerfumeById };

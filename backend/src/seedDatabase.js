import fs from "fs";
import csv from "csv-parser";
import pool from "./db.js";

const seedDatabase = async () => {
  let client;
  try {
    client = await pool.connect();
    console.log("🌱 Starting database seeding process...");

    // Cek apakah tabel sudah berisi data
    const checkResult = await client.query("SELECT COUNT(*) FROM perfumes");
    if (parseInt(checkResult.rows[0].count, 10) > 0) {
      console.log("✅ Database already contains data. Seeding skipped.");
      return;
    }

    console.log(
      "⏳ Reading CSV file and inserting data. This may take a few minutes..."
    );

    const results = [];
    // Path ke file CSV di dalam container, sesuai dengan Dockerfile
    const csvFilePath = "./parfumo_datos.csv";

    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", async () => {
        for (const row of results) {
          const query = `
                        INSERT INTO perfumes (name, brand, release_year, concentration, rating_value, rating_count, main_accords, top_notes, middle_notes, base_notes, perfumers, url)
                        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
                    `;
          const values = [
            row.Name,
            row.Brand,
            row["Release Year"],
            row.Concentration,
            row["Rating Value"],
            row["Rating Count"],
            row["Main Accords"],
            row["Top Notes"],
            row["Middle Notes"],
            row["Base Notes"],
            row.Perfumers,
            row.URL,
          ];
          await client.query(query, values);
        }
        console.log(
          `🎉 Successfully inserted ${results.length} records into the database.`
        );
      });
  } catch (error) {
    console.error("❌ An error occurred during database seeding:", error);
  } finally {
    if (client) {
      // Jangan tutup koneksi di sini agar skrip lain masih bisa jalan
      client.release();
    }
  }
};

// Panggil fungsi ini jika file ini dijalankan langsung
if (process.argv[2] === "run") {
  seedDatabase().finally(() => pool.end());
}

export default seedDatabase;

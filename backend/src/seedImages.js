import pool from "./db.js";
import { getImageUrl } from "./services/unsplashService.js";

// Fungsi untuk membuat query pencarian gambar yang cerdas
const createSearchQuery = (perfume) => {
  // Membersihkan nama dan accords untuk query yang lebih baik
  const name = (perfume.name || "").split(" ").slice(0, 3).join(" ");
  const accords = (perfume.main_accords || "").split(",").slice(0, 2).join(" ");
  return `${name} perfume bottle, product photography, minimalist, ${accords}`;
};

const seedImages = async () => {
  console.log("🌱 Starting image seeding process...");
  let client;
  try {
    // Ambil koneksi dari pool
    client = await pool.connect();

    // Ambil semua parfum yang BELUM punya image_url
    const result = await client.query(
      "SELECT * FROM perfumes WHERE image_url IS NULL AND main_accords IS NOT NULL LIMIT 50"
    ); // Kita batasi 50 per run
    const perfumesToUpdate = result.rows;

    if (perfumesToUpdate.length === 0) {
      console.log("✅ No new perfumes to update. All images are seeded.");
      return;
    }

    console.log(
      `🔍 Found ${perfumesToUpdate.length} perfumes without images. Starting fetch...`
    );

    for (const perfume of perfumesToUpdate) {
      const searchQuery = createSearchQuery(perfume);
      console.log(`[${perfume.id}] Fetching image for "${perfume.name}"...`);

      const imageUrl = await getImageUrl(searchQuery);

      if (imageUrl) {
        await client.query("UPDATE perfumes SET image_url = $1 WHERE id = $2", [
          imageUrl,
          perfume.id,
        ]);
        console.log(`   -> ✅ SUCCESS: Image URL saved for ID ${perfume.id}`);
      } else {
        console.log(
          `   -> ❌ FAILED: No image found for ID ${perfume.id}, leaving as NULL.`
        );
      }

      // Jeda 1.5 detik untuk menghormati rate limit API Unsplash
      await new Promise((resolve) => setTimeout(resolve, 1500));
    }

    console.log("🎉 Image seeding process for this batch finished!");
  } catch (error) {
    console.error("An error occurred during image seeding:", error);
  } finally {
    // Pastikan koneksi dilepaskan
    if (client) {
      client.release();
      console.log("Database client released.");
    }
  }
};

seedImages();

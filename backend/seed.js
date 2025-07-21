const fs = require('fs');
const csv = require('csv-parser'); // Perlu diinstal: npm install csv-parser
const { getImageUrl } = require('./src/services/unsplashService');
// Hubungkan ke file koneksi database Anda (misal: db.js)
const db = require('./src/db'); 

const results = [];

fs.createReadStream('../database/koleksi_parfum_pilihan.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', async () => {
    console.log('Selesai membaca file CSV. Memulai pengambilan gambar dari Unsplash...');

    for (const perfume of results) {
      console.log(`Mencari gambar untuk: ${perfume.Name}...`);
      const imageUrl = await getImageUrl(perfume.image_query);

      if (imageUrl) {
        console.log(`   -> Gambar ditemukan: ${imageUrl}`);
        // Simpan ke database Anda. Query di bawah ini adalah contoh.
        // Anda harus menyesuaikannya dengan library SQL yang Anda pakai (misal: pg, mysql2).
        const queryText = `
          INSERT INTO perfumes (name, brand, main_accords, top_notes, middle_notes, base_notes, image_query, image_url)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        `;
        const values = [
          perfume.Name, perfume.Brand, perfume['Main Accords'], perfume['Top Notes'], 
          perfume['Middle Notes'], perfume['Base Notes'], perfume.image_query, imageUrl
        ];
        
        await db.query(queryText, values);
        console.log(`   -> Data untuk ${perfume.Name} berhasil disimpan.`);
      } else {
        console.log(`   -> Tidak ada gambar yang cocok untuk ${perfume.Name}.`);
      }
      // Beri jeda 1 detik antar request agar tidak membebani API Unsplash
      await new Promise(resolve => setTimeout(resolve, 1000)); 
    }
    console.log('Semua data telah diproses dan disimpan ke database!');
  });
-- Hapus tabel lama jika ada, untuk memastikan inisialisasi yang bersih
DROP TABLE IF EXISTS perfumes;

-- Membuat tabel baru yang cocok dengan kolom-kolom penting dari parfumo_datos.csv
CREATE TABLE perfumes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    brand VARCHAR(255),
    release_year VARCHAR(50),
    concentration VARCHAR(255),
    rating_value VARCHAR(10),
    rating_count VARCHAR(50),
    main_accords TEXT,
    top_notes TEXT,
    middle_notes TEXT,
    base_notes TEXT,
    perfumers TEXT,
    url TEXT,
    -- Kolom ini kita tambahkan untuk menyimpan URL gambar dari Unsplash nantinya.
    -- Sengaja dibuat kosong (NULL) saat awal.
    image_url TEXT
);

-- Menyalin data dari file CSV Anda ke dalam tabel yang baru dibuat.
-- Docker secara otomatis akan mencari file ini di dalam folder /docker-entrypoint-initdb.d/
COPY perfumes(name, brand, release_year, concentration, rating_value, rating_count, main_accords, top_notes, middle_notes, base_notes, perfumers, url)
FROM '/docker-entrypoint-initdb.d/parfumo_datos.csv'
DELIMITER ','
CSV HEADER;
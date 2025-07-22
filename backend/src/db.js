import pg from 'pg';

const { Pool } = pg;

// Konfigurasi ini menggunakan environment variables yang didefinisikan di .env
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.DB_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.DB_PORT,
});

// Fungsi untuk mengecek koneksi saat aplikasi pertama kali start
const connectWithRetry = async () => {
  try {
    const client = await pool.connect();
    console.log('✅ Successfully connected to the database.');
    client.release(); // Lepaskan client setelah koneksi berhasil
  } catch (err) {
    console.error('❌ Failed to connect to the database on startup - retrying in 5 sec');
    setTimeout(connectWithRetry, 5000);
  }
};

// Panggil fungsi koneksi saat modul ini di-load
connectWithRetry();

export default pool;

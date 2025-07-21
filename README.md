# Proyek E-Commerce Parfum

Aplikasi web e-commerce multi-halaman untuk parfum, dibangun dengan React, Node.js, PostgreSQL dan di-deploy dengan Docker.

## Tech Stack

-   **Frontend**: React.js (Vite), React Router, Axios
-   **Backend**: Node.js, Express.js
-   **Database**: PostgreSQL
-   **Image API**: Unsplash
-   **Deployment**: Docker, Docker Compose, Nginx

## Cara Menjalankan

1.  **Prasyarat**: Pastikan Docker dan Docker Compose sudah terinstal.
2.  **Clone/Siapkan Proyek**: Pastikan semua file proyek sudah ada sesuai struktur.
3.  **Jalankan Docker**: Dari direktori root proyek, jalankan perintah:
    ```bash
    docker-compose up --build
    ```
4.  **Akses Aplikasi**:
    -   **Frontend**: `http://localhost`
    -   **Backend API**: `http://localhost:5000/api/perfumes`

## Menghentikan Aplikasi

Tekan `Ctrl + C` di terminal, lalu jalankan `docker-compose down` untuk membersihkan container.
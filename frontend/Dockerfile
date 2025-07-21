# Stage 1: Build the React application
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build

# Stage 2: Serve the static files with Nginx
FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html
# Hapus konfigurasi Nginx default
RUN rm /etc/nginx/conf.d/default.conf
# Salin konfigurasi Nginx kustom kita
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Hapus halaman selamat datang Nginx
RUN rm -rf ./*
# Salin aset yang sudah di-build dari Stage 1
COPY --from=build /app/dist .
# Expose port 80
EXPOSE 80
# Mulai Nginx dan jalankan di foreground
ENTRYPOINT ["nginx", "-g", "daemon off;"]
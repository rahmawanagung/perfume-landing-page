FROM node:18-alpine

WORKDIR /app

# PERBAIKAN: Path ke package.json disesuaikan dari root proyek
COPY ./backend/package*.json ./

# Path ke CSV juga harus dari root proyek
COPY ./database/parfumo_datos.csv . 

RUN npm install

# PERBAIKAN: Hanya salin isi dari folder backend
COPY ./backend/ .

EXPOSE 5000

CMD ["npm", "start"]
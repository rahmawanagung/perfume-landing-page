DROP TABLE IF EXISTS perfumes;

CREATE TABLE perfumes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    brand VARCHAR(255),
    main_accords TEXT,
    top_notes TEXT,
    middle_notes TEXT,
    base_notes TEXT,
    image_query TEXT,
    image_url TEXT
);

COPY perfumes(name, brand, main_accords, top_notes, middle_notes, base_notes, image_query)
FROM '/docker-entrypoint-initdb.d/koleksi_parfum_pilihan.csv'
DELIMITER ','
CSV HEADER;
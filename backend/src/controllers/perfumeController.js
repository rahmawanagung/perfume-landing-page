import pool from '../db.js';
import { getPerfumeImage } from '../services/unsplashService.js';

const fetchImageForProducts = async (products) => {
  return Promise.all(
    products.map(async (perfume) => {
      const imageUrl = await getPerfumeImage(perfume.brand, perfume.name);
      return { ...perfume, imgurl: imageUrl };
    })
  );
};

export const getAllPerfumes = async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM perfumes ORDER BY id');
    const productsWithImages = await fetchImageForProducts(rows);
    res.json(productsWithImages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPerfumeById = async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query('SELECT * FROM perfumes WHERE id = $1', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Perfume not found' });
    const productWithImage = await fetchImageForProducts(rows);
    res.json(productWithImage[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
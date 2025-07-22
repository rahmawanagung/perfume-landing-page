import express from 'express';
import { getAllPerfumes, getPerfumeById } from '../controllers/perfumeController.js';

const router = express.Router();

// Route untuk mendapatkan semua parfum
router.get('/', getAllPerfumes);

// Route untuk mendapatkan detail satu parfum
router.get('/:id', getPerfumeById);

export default router;
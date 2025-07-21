import { Router } from 'express';
import { getAllPerfumes, getPerfumeById } from '../controllers/perfumeController.js';
const router = Router();
router.get('/perfumes', getAllPerfumes);
router.get('/perfumes/:id', getPerfumeById);
export default router;
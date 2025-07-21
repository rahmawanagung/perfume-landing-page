import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import perfumeRoutes from './routes/perfumeRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api', perfumeRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
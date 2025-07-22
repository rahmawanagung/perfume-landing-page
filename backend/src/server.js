import express from 'express';
import cors from 'cors';
import perfumeRoutes from './routes/perfumeRoutes.js';
import seedDatabase from './seedDatabase.js'; // Import seedDatabase

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Healthcheck route
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Routes
app.get('/', (req, res) => {
  res.send('Perfume API is running...');
});

app.use('/api/perfumes', perfumeRoutes);

// Call seedDatabase before starting the server
seedDatabase().then(() => {
  app.listen(port, () => {
    console.log(`🚀 Server is running on port ${port}`);
  });
}).catch(error => {
  console.error('Failed to start server due to database seeding error:', error);
});

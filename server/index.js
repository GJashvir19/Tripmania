import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDatabase } from './config/db.js';
import authRoutes from './routes/auth.js';
import destinationRoutes from './routes/destinations.js';
import tripRoutes from './routes/trips.js';
import weatherRoutes from './routes/weather.js';
import placeRoutes from './routes/places.js';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));
app.use(express.json({ limit: '1mb' }));

app.get('/api/health', (request, response) => response.json({ status: 'ok', service: 'TripMania API' }));
app.use('/api/auth', authRoutes);
app.use('/api/destinations', destinationRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/places', placeRoutes);

app.use((error, request, response, next) => {
  console.error(error);
  if (error.name === 'CastError') return response.status(400).json({ message: 'Invalid resource identifier.' });
  return response.status(error.status || 500).json({ message: error.message || 'Something went wrong.' });
});

connectDatabase()
  .then(() => app.listen(port, () => console.log(`TripMania API listening on port ${port}`)))
  .catch((error) => {
    console.error('Unable to start TripMania API:', error.message);
    process.exit(1);
  });

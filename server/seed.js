import 'dotenv/config';
import { connectDatabase } from './config/db.js';
import Destination from './models/Destination.js';
import { destinations } from './data/destinations.js';

async function seed() {
  await connectDatabase();
  for (const destination of destinations) {
    await Destination.findOneAndUpdate(
      { state: destination.state, subdivision: destination.subdivision, name: destination.name },
      destination,
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
  }
  console.log(`Seeded ${destinations.length} Indian destinations.`);
  process.exit(0);
}

seed().catch((error) => {
  console.error('Seed failed:', error);
  process.exit(1);
});

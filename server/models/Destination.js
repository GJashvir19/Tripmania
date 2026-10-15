import mongoose from 'mongoose';

const attractionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, default: '' },
    visitDuration: { type: Number, default: 90 },
    bestTimeOfDay: { type: String, default: 'Morning' },
    ticketHint: { type: String, default: '' },
    coordinates: { lat: Number, lon: Number }
  },
  { _id: false }
);

const destinationSchema = new mongoose.Schema(
  {
    state: { type: String, required: true, index: true },
    subdivision: { type: String, required: true, index: true },
    name: { type: String, required: true },
    tagline: { type: String, default: '' },
    description: { type: String, default: '' },
    heroImage: { type: String, default: '' },
    coordinates: { lat: { type: Number, required: true }, lon: { type: Number, required: true } },
    bestTime: {
      seasons: [String],
      months: [String],
      idealDays: [String],
      note: String
    },
    tags: [String],
    attractions: [attractionSchema]
  },
  { timestamps: true }
);

destinationSchema.index({ state: 1, subdivision: 1, name: 1 }, { unique: true });

export default mongoose.model('Destination', destinationSchema);

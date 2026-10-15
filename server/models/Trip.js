import mongoose from 'mongoose';

const itineraryItemSchema = new mongoose.Schema(
  {
    destinationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Destination' },
    sourceId: { type: String, default: '' },
    destinationName: { type: String, required: true },
    placeName: { type: String, required: true },
    category: { type: String, default: 'Sightseeing' },
    scheduledTime: { type: String, required: true },
    durationMinutes: { type: Number, default: 90 },
    notes: { type: String, default: '' },
    coordinates: { lat: Number, lon: Number }
  },
  { timestamps: true }
);

const tripDaySchema = new mongoose.Schema(
  {
    dayNumber: { type: Number, required: true },
    date: { type: Date, required: true },
    items: { type: [itineraryItemSchema], default: [] }
  },
  { _id: false }
);

const tripSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: true, trim: true },
    state: { type: String, required: true, index: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    travellers: { type: Number, default: 1, min: 1 },
    travelStyle: { type: String, default: 'Balanced' },
    days: { type: [tripDaySchema], default: [] }
  },
  { timestamps: true }
);

export default mongoose.model('Trip', tripSchema);

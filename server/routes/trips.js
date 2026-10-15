import { Router } from 'express';
import Trip from '../models/Trip.js';
import Destination from '../models/Destination.js';
import { requireAuth } from '../middleware/auth.js';
import { indianRegionNames } from '../data/indiaRegions.js';

const router = Router();
router.use(requireAuth);

function buildDays(startDate, endDate) {
  const start = new Date(`${startDate}T12:00:00`);
  const end = new Date(`${endDate}T12:00:00`);
  const days = [];
  const cursor = new Date(start);
  let dayNumber = 1;

  while (cursor <= end && dayNumber <= 30) {
    days.push({ dayNumber, date: new Date(cursor), items: [] });
    cursor.setDate(cursor.getDate() + 1);
    dayNumber += 1;
  }

  return days;
}

router.get('/', async (request, response, next) => {
  try {
    const trips = await Trip.find({ user: request.user.id }).sort({ startDate: 1, createdAt: -1 });
    return response.json({ trips });
  } catch (error) {
    return next(error);
  }
});

router.post('/', async (request, response, next) => {
  try {
    const { title, state, startDate, endDate, travellers, travelStyle } = request.body;
    if (!title || !state || !startDate || !endDate) return response.status(400).json({ message: 'Trip title, state and dates are required.' });
    if (!indianRegionNames.includes(state)) return response.status(400).json({ message: 'Choose a valid Indian state or Union Territory.' });
    if (new Date(endDate) < new Date(startDate)) return response.status(400).json({ message: 'End date must be after start date.' });
    const days = buildDays(startDate, endDate);
    if (!days.length) return response.status(400).json({ message: 'Choose a trip of one to 30 days.' });
    const trip = await Trip.create({ user: request.user.id, title, state, startDate, endDate, travellers, travelStyle, days });
    return response.status(201).json({ trip });
  } catch (error) {
    return next(error);
  }
});

router.get('/:tripId', async (request, response, next) => {
  try {
    const trip = await Trip.findOne({ _id: request.params.tripId, user: request.user.id });
    if (!trip) return response.status(404).json({ message: 'Trip not found.' });
    return response.json({ trip });
  } catch (error) {
    return next(error);
  }
});

router.post('/:tripId/items', async (request, response, next) => {
  try {
    const { dayNumber, destinationId, attractionIndex, place, scheduledTime, durationMinutes, notes } = request.body;
    const trip = await Trip.findOne({ _id: request.params.tripId, user: request.user.id });
    if (!trip) return response.status(404).json({ message: 'Trip not found.' });
    const day = trip.days.find((candidate) => candidate.dayNumber === Number(dayNumber));
    if (!day) return response.status(400).json({ message: 'Choose a valid trip day.' });
    if (place) {
      const latitude = Number(place.coordinates?.lat);
      const longitude = Number(place.coordinates?.lon);
      if (!place.name || !Number.isFinite(latitude) || !Number.isFinite(longitude)) {
        return response.status(400).json({ message: 'Choose a valid place from the selected state.' });
      }
      day.items.push({
        sourceId: String(place.id || ''),
        destinationName: place.city || trip.state,
        placeName: String(place.name),
        category: String(place.category || 'Sightseeing'),
        scheduledTime: scheduledTime || place.bestTimeOfDay || '09:00',
        durationMinutes: Number(durationMinutes) || Number(place.visitDuration) || 90,
        notes: notes || '',
        coordinates: { lat: latitude, lon: longitude }
      });
    } else {
      const destination = await Destination.findById(destinationId);
      const attraction = destination?.attractions[Number(attractionIndex)];
      if (!destination || !attraction || destination.state !== trip.state) {
        return response.status(400).json({ message: 'Choose a place from this trip’s state.' });
      }
      day.items.push({
        destinationId: destination._id,
        destinationName: destination.name,
        placeName: attraction.name,
        category: attraction.category,
        scheduledTime: scheduledTime || '09:00',
        durationMinutes: Number(durationMinutes) || attraction.visitDuration,
        notes: notes || '',
        coordinates: attraction.coordinates || destination.coordinates
      });
    }
    day.items.sort((first, second) => first.scheduledTime.localeCompare(second.scheduledTime));
    await trip.save();
    return response.status(201).json({ trip });
  } catch (error) {
    return next(error);
  }
});

router.delete('/:tripId/items/:itemId', async (request, response, next) => {
  try {
    const trip = await Trip.findOne({ _id: request.params.tripId, user: request.user.id });
    if (!trip) return response.status(404).json({ message: 'Trip not found.' });
    const day = trip.days.find((candidate) => candidate.items.some((item) => item._id.toString() === request.params.itemId));
    if (!day) return response.status(404).json({ message: 'Itinerary item not found.' });
    day.items = day.items.filter((item) => item._id.toString() !== request.params.itemId);
    await trip.save();
    return response.json({ trip });
  } catch (error) {
    return next(error);
  }
});

router.delete('/:tripId', async (request, response, next) => {
  try {
    const trip = await Trip.findOneAndDelete({ _id: request.params.tripId, user: request.user.id });
    if (!trip) return response.status(404).json({ message: 'Trip not found.' });
    return response.status(204).end();
  } catch (error) {
    return next(error);
  }
});

export default router;

import { Router } from 'express';
import { indiaRegions } from '../data/indiaRegions.js';

const router = Router();
const cache = new Map();
const cacheDuration = 1000 * 60 * 60 * 12;
const activityTypes = [
  { label: 'Heritage circuit', category: 'Heritage', time: '09:00', duration: 120 },
  { label: 'Local culture walk', category: 'Culture', time: '11:30', duration: 105 },
  { label: 'Nature & landmark trail', category: 'Nature', time: '15:30', duration: 120 },
  { label: 'Food & market stop', category: 'Food', time: '18:30', duration: 90 }
];

function fallbackPlaces(region) {
  return region.circuitCities.flatMap((city, cityIndex) => activityTypes.map((activity, activityIndex) => ({
    id: `guide-${region.name}-${city}-${activityIndex}`.replaceAll(' ', '-').toLowerCase(),
    name: `${city} ${activity.label}`,
    city,
    category: activity.category,
    description: `A flexible ${activity.label.toLowerCase()} in and around ${city}, ${region.name}.`,
    bestTimeOfDay: activity.time,
    visitDuration: activity.duration,
    coordinates: {
      lat: Number((region.center[0] + ((cityIndex % 4) - 1.5) * 0.06).toFixed(5)),
      lon: Number((region.center[1] + (Math.floor(cityIndex / 4) - 0.5) * 0.08).toFixed(5))
    },
    source: 'TripMania regional circuit'
  })));
}

function normalizeOsmPlace(element, index, region) {
  const tags = element.tags || {};
  const coordinates = element.center || element;
  return {
    id: `osm-${element.type}-${element.id}`,
    name: tags.name || `${tags.tourism || tags.historic || 'Local'} place`,
    city: tags['addr:city'] || tags['addr:district'] || region.circuitCities[index % region.circuitCities.length],
    category: tags.tourism === 'museum' ? 'Museum' : tags.historic ? 'Heritage' : tags.amenity === 'place_of_worship' ? 'Spiritual' : tags.natural ? 'Nature' : 'Sightseeing',
    description: tags.description || `A mapped place to visit in ${region.name}.`,
    bestTimeOfDay: index % 3 === 0 ? 'Morning' : index % 3 === 1 ? 'Afternoon' : 'Evening',
    visitDuration: index % 3 === 0 ? 120 : 90,
    coordinates: { lat: Number(coordinates.lat), lon: Number(coordinates.lon) },
    source: 'OpenStreetMap'
  };
}

async function livePlaces(region) {
  const query = `[out:json][timeout:18];area["name"="${region.name.replaceAll('"', '')}"]["boundary"="administrative"]->.searchArea;(nwr["tourism"~"attraction|museum|gallery|zoo|theme_park|viewpoint"](area.searchArea);nwr["historic"](area.searchArea);nwr["amenity"="place_of_worship"](area.searchArea););out center 70;`;
  const response = await fetch('https://overpass-api.de/api/interpreter', {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain', 'User-Agent': 'TripManiaIndia/1.0 (trip planning)' },
    body: query,
    signal: AbortSignal.timeout(14000)
  });
  if (!response.ok) throw new Error('Place source unavailable');
  const data = await response.json();
  const names = new Set();
  return data.elements
    .filter((element) => (element.lat || element.center?.lat) && element.tags?.name)
    .map((element, index) => normalizeOsmPlace(element, index, region))
    .filter((place) => {
      const key = place.name.toLocaleLowerCase();
      if (names.has(key)) return false;
      names.add(key);
      return true;
    })
    .slice(0, 40);
}

router.get('/', async (request, response, next) => {
  try {
    const region = indiaRegions.find((candidate) => candidate.name === request.query.state);
    if (!region) return response.status(400).json({ message: 'Choose a valid Indian state or Union Territory.' });
    const cached = cache.get(region.name);
    if (cached && cached.expiresAt > Date.now()) return response.json(cached.payload);
    let places = [];
    try { places = await livePlaces(region); } catch { places = []; }
    const fallback = fallbackPlaces(region);
    const seenNames = new Set(places.map((place) => place.name.toLocaleLowerCase()));
    for (const place of fallback) {
      if (places.length >= 40) break;
      if (!seenNames.has(place.name.toLocaleLowerCase())) places.push(place);
    }
    const payload = { state: region.name, places: places.slice(0, 40), total: Math.min(places.length, 40) };
    cache.set(region.name, { payload, expiresAt: Date.now() + cacheDuration });
    return response.json(payload);
  } catch (error) {
    return next(error);
  }
});

export default router;

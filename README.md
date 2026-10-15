# TripMania India

TripMania is a full-stack MERN travel planner for thoughtful journeys across India. It lets travellers explore places by state and subdivision, learn the ideal time to visit, build timed daily itineraries, check a live seven-day weather forecast and open multi-stop driving routes in Google Maps.

## What is included

- JWT-based sign-up and sign-in with encrypted passwords
- MongoDB collections for users, destinations and private trips
- Destination explorer with state, subdivision, seasons, months, weekdays and attraction-level visit times
- A state-first trip builder with all 28 states and 8 Union Territories in the trip selector
- 32–40 state-specific place options while planning, with OpenStreetMap places and a regional-circuit fallback
- A separate Saved Plans library for reopening every itinerary independently
- Live 7-day weather from Open-Meteo, proxied by the Express API
- Google Maps multi-stop directions, plus an optional embedded map
- A curated starter dataset with destinations across Rajasthan, Kerala, Uttar Pradesh, Maharashtra, Tamil Nadu and West Bengal

## Run locally

1. Install [Node.js 18+](https://nodejs.org/) and start a local MongoDB server.
2. Copy `.env.example` to `.env` and replace `JWT_SECRET` with a long random value.
3. Install packages with `npm install`.
4. Load the travel guide data with `npm run seed`.
5. Start both the React client and Express API using `npm run dev`.
6. Open `http://localhost:5173`.

## MongoDB Compass

Open MongoDB Compass and connect with the value set in `MONGO_URI`, by default:

```text
mongodb://127.0.0.1:27017/tripmania
```

After `npm run seed`, Compass will show `destinations`, `users` and `trips` collections in the `tripmania` database. Compass is ideal for browsing the state and subdivision records during development; the application itself uses Mongoose to access the same database.

## Google Maps embed

The itinerary always opens a working multi-stop Google Maps directions URL without configuration. To show the interactive Google Maps directions embed inside TripMania as well, enable the Maps Embed API in Google Cloud, restrict the key to your development/production domains, and add this to `.env`:

```text
VITE_GOOGLE_MAPS_API_KEY=your_restricted_maps_embed_key
```

Restart the Vite server after changing a `VITE_` variable.

## API overview

| Endpoint | Purpose |
| --- | --- |
| `POST /api/auth/signup` | Create traveller account |
| `POST /api/auth/signin` | Sign in and receive a JWT |
| `GET /api/destinations` | Browse city/town guides |
| `GET /api/destinations/states` | List every state and Union Territory |
| `GET /api/places?state=` | Get 32–40 places for a selected state |
| `GET /api/weather?lat=&lon=` | Live seven-day forecast |
| `GET/POST /api/trips` | List and create private trips |
| `POST /api/trips/:tripId/items` | Add a timed place to a trip day |

## Production notes

Use a managed MongoDB connection string, set a unique `JWT_SECRET`, configure `CLIENT_URL` to the deployed web origin, enforce HTTPS, and keep the Google Maps key domain-restricted. The Open-Meteo forecast integration does not require a weather API key.

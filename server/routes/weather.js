import { Router } from 'express';

const router = Router();

const weatherCodes = {
  0: { label: 'Clear sky', icon: '☀️' },
  1: { label: 'Mainly clear', icon: '🌤️' },
  2: { label: 'Partly cloudy', icon: '⛅' },
  3: { label: 'Overcast', icon: '☁️' },
  45: { label: 'Foggy', icon: '🌫️' },
  48: { label: 'Rime fog', icon: '🌫️' },
  51: { label: 'Light drizzle', icon: '🌦️' },
  53: { label: 'Drizzle', icon: '🌦️' },
  55: { label: 'Heavy drizzle', icon: '🌧️' },
  61: { label: 'Light rain', icon: '🌦️' },
  63: { label: 'Rain', icon: '🌧️' },
  65: { label: 'Heavy rain', icon: '🌧️' },
  71: { label: 'Light snow', icon: '🌨️' },
  73: { label: 'Snow', icon: '🌨️' },
  80: { label: 'Rain showers', icon: '🌦️' },
  81: { label: 'Rain showers', icon: '🌧️' },
  82: { label: 'Heavy showers', icon: '⛈️' },
  95: { label: 'Thunderstorm', icon: '⛈️' }
};

router.get('/', async (request, response, next) => {
  try {
    const latitude = Number(request.query.lat);
    const longitude = Number(request.query.lon);
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return response.status(400).json({ message: 'Latitude and longitude are required.' });
    const parameters = new URLSearchParams({
      latitude: String(latitude),
      longitude: String(longitude),
      daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max',
      timezone: 'auto',
      forecast_days: '7'
    });
    const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?${parameters}`, { signal: AbortSignal.timeout(8000) });
    if (!weatherResponse.ok) throw new Error('Weather provider was unavailable.');
    const result = await weatherResponse.json();
    const forecast = result.daily.time.map((date, index) => {
      const code = result.daily.weather_code[index];
      return {
        date,
        maxTemp: Math.round(result.daily.temperature_2m_max[index]),
        minTemp: Math.round(result.daily.temperature_2m_min[index]),
        precipitationChance: result.daily.precipitation_probability_max[index],
        ...(weatherCodes[code] || { label: 'Variable weather', icon: '🌤️' })
      };
    });
    return response.json({ forecast, source: 'Open-Meteo' });
  } catch (error) {
    return next(error);
  }
});

export default router;

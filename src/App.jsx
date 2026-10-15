import { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import {
  ArrowRight, CalendarDays, CheckCircle2, ChevronRight, CircleUserRound, Clock3, CloudSun,
  Compass, Heart, Landmark, Leaf, LocateFixed, LogOut, Map, MapPinned, Menu, Mountain,
  Navigation, Palmtree, Plus, Route as RouteIcon, Search, Sparkles, Ticket, Trash2, Umbrella
} from 'lucide-react';
import { request, setAccessToken } from './api.js';

const heritagePillars = [
  { icon: Landmark, title: '5,000 years of stories', description: 'Trace civilizations through forts, temples, museums, ancient trade ports and living rituals.' },
  { icon: Mountain, title: 'Many Indias, one journey', description: 'From Himalayan valleys to desert towns, coastal routes and rainforest plateaus.' },
  { icon: Leaf, title: 'Travel with care', description: 'Plan at a human pace, prioritise local guides, craft, food and respectful visits.' }
];

const weekday = new Intl.DateTimeFormat('en-IN', { weekday: 'short' });
const shortDate = new Intl.DateTimeFormat('en-IN', { month: 'short', day: 'numeric' });

function localDate(daysFromToday = 0) {
  const current = new Date();
  current.setDate(current.getDate() + daysFromToday);
  return current.toISOString().slice(0, 10);
}

function formatTripDate(value) {
  return new Intl.DateTimeFormat('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(value));
}

function NavBar({ user, onSignOut }) {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const links = [
    { to: '/', label: 'Discover' },
    { to: '/explore', label: 'Explore India' },
    { to: '/planner', label: 'Plan a trip' },
    { to: '/plans', label: 'Saved plans' }
  ];

  return (
    <header className="site-header">
      <nav className="nav-shell">
        <Link to="/" className="brand" onClick={() => setOpen(false)}><span className="brand-mark">T</span><span>trip<span>mania</span></span></Link>
        <button className="mobile-menu" onClick={() => setOpen(!open)} aria-label="Toggle navigation"><Menu size={21} /></button>
        <div className={`nav-links ${open ? 'is-open' : ''}`}>
          {links.map((link) => <Link key={link.to} to={link.to} onClick={() => setOpen(false)} className={location.pathname === link.to ? 'active' : ''}>{link.label}</Link>)}
        </div>
        <div className="nav-actions">
          {user ? (
            <>
              <Link to="/planner" className="profile-link"><CircleUserRound size={18} /> {user.name.split(' ')[0]}</Link>
              <button className="icon-button" onClick={onSignOut} title="Sign out"><LogOut size={18} /></button>
            </>
          ) : <Link to="/auth" className="button button-small">Start planning <ArrowRight size={15} /></Link>}
        </div>
      </nav>
    </header>
  );
}

function PageBanner({ eyebrow, title, children }) {
  return <section className="page-banner"><div className="content-width"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1>{children}</div></section>;
}

function useDestinations() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    request('/destinations').then((data) => setDestinations(data.destinations)).catch((requestError) => setError(requestError.message)).finally(() => setLoading(false));
  }, []);
  return { destinations, loading, error };
}

function useIndianStates() {
  const [regions, setRegions] = useState([]);
  useEffect(() => {
    request('/destinations/states').then((data) => setRegions(data.states)).catch(() => setRegions([]));
  }, []);
  return regions;
}

function HomePage() {
  const { destinations, loading } = useDestinations();
  const highlighted = destinations.slice(0, 3);
  return <>
    <section className="hero">
      <div className="hero-wash"></div>
      <div className="hero-pattern">भारत</div>
      <div className="hero-content content-width">
        <p className="eyebrow light"><Sparkles size={14} /> A more thoughtful way to travel India</p>
        <h1>Every corner of India has a story.<br /><em>Plan time to hear it.</em></h1>
        <p className="hero-copy">Discover the right season, build an unhurried day-by-day route, and keep every beautifully planned moment in one place.</p>
        <div className="hero-actions">
          <Link to="/explore" className="button button-ivory">Explore destinations <ArrowRight size={17} /></Link>
          <Link to="/planner" className="text-button light">Build an itinerary <ChevronRight size={17} /></Link>
        </div>
        <div className="hero-metrics"><div><strong>28</strong><span>states to dream through</span></div><div><strong>7 days</strong><span>of live forecast ahead</span></div><div><strong>1 place</strong><span>for every plan</span></div></div>
      </div>
      <div className="hero-photo-credit">India, infinitely different</div>
    </section>

    <section className="section content-width intro-section">
      <div className="intro-copy"><p className="eyebrow">Built for the curious traveller</p><h2>Let the route follow the rhythm of the place.</h2><p>TripMania helps you travel through India with context. Search from state to district to city, understand when a place feels its best, then shape an itinerary around the moments that matter.</p></div>
      <div className="heritage-grid">{heritagePillars.map(({ icon: Icon, title, description }) => <article className="heritage-card" key={title}><Icon size={25} /><h3>{title}</h3><p>{description}</p></article>)}</div>
    </section>

    <section className="section cream-surface"><div className="content-width"><div className="section-heading"><div><p className="eyebrow">Find your next chapter</p><h2>India, by feeling</h2></div><Link to="/explore" className="text-button">See the full explorer <ArrowRight size={16} /></Link></div>
      <div className="destination-grid">
        {loading ? <LoadingCards count={3} /> : highlighted.map((destination) => <DestinationCard destination={destination} key={destination._id} />)}
      </div>
    </div></section>

    <section className="section content-width plan-prompt">
      <div><p className="eyebrow">From a spark to a plan</p><h2>Your days, mapped with intention.</h2><p>Arrange sights in a realistic order, set the time that feels right, see the forecast and open a ready-to-go Google Maps route.</p></div>
      <div className="plan-steps"><span><b>01</b> Choose your places</span><span><b>02</b> Shape each day</span><span><b>03</b> Follow the route</span><Link className="button" to="/planner">Create a trip <ArrowRight size={16} /></Link></div>
    </section>
  </>;
}

function DestinationCard({ destination }) {
  return <article className="destination-card">
    <img src={destination.heroImage} alt={destination.name} />
    <div className="card-sheen"></div>
    <div className="destination-card-copy"><span>{destination.state} · {destination.subdivision.replace(' District', '')}</span><h3>{destination.name}</h3><p>{destination.tagline}</p><Link to={`/explore?place=${destination._id}`} className="card-link">Explore place <ArrowRight size={15} /></Link></div>
  </article>;
}

function LoadingCards({ count = 3 }) {
  return Array.from({ length: count }, (_, index) => <div className="loading-card" key={index}></div>);
}

function ExplorePage() {
  const { destinations, loading, error } = useDestinations();
  const [state, setState] = useState('');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const searchParams = new URLSearchParams(useLocation().search);
  const queryPlace = searchParams.get('place');
  useEffect(() => {
    if (queryPlace && destinations.length) setSelected(destinations.find((destination) => destination._id === queryPlace) || null);
  }, [queryPlace, destinations]);
  const states = useMemo(() => [...new Set(destinations.map((destination) => destination.state))].sort(), [destinations]);
  const filtered = destinations.filter((destination) => (!state || destination.state === state) && (!search || `${destination.name} ${destination.state} ${destination.tags.join(' ')}`.toLowerCase().includes(search.toLowerCase())));
  return <>
    <PageBanner eyebrow="Destination intelligence" title="Explore India, one local story at a time."><p>Move from state to subdivision to the exact places worth planning for—complete with seasonal notes and timing.</p></PageBanner>
    <main className="content-width section explore-layout">
      <aside className="explore-controls"><label className="search-field"><Search size={18} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search city, state or interest" /></label><label>State<select value={state} onChange={(event) => setState(event.target.value)}><option value="">All states</option>{states.map((stateName) => <option key={stateName}>{stateName}</option>)}</select></label><p className="result-count">{filtered.length} curated destinations</p><div className="state-list">{states.map((stateName) => <button className={state === stateName ? 'selected' : ''} key={stateName} onClick={() => setState(state === stateName ? '' : stateName)}>{stateName}<ChevronRight size={15} /></button>)}</div></aside>
      <div className="explore-results">
        {error && <Notice tone="error">{error} Start MongoDB, seed the database, then reload this page.</Notice>}
        {loading ? <LoadingCards count={4} /> : filtered.map((destination) => <button className={`explore-card ${selected?._id === destination._id ? 'selected' : ''}`} key={destination._id} onClick={() => setSelected(destination)}><img src={destination.heroImage} alt="" /><div><p>{destination.state} <span>·</span> {destination.subdivision}</p><h2>{destination.name}</h2><span className="tags">{destination.tags.map((tag) => <i key={tag}>{tag}</i>)}</span><p className="description">{destination.description}</p></div><ChevronRight /></button>)}
      </div>
      <aside className="destination-detail">{selected ? <DestinationDetail destination={selected} /> : <div className="empty-detail"><Compass size={28} /><h3>Choose a destination</h3><p>Its local rhythm, best season and must-see places will appear here.</p></div>}</aside>
    </main>
  </>;
}

function DestinationDetail({ destination }) {
  return <div className="detail-content"><div className="detail-image"><img src={destination.heroImage} alt={destination.name} /><span>{destination.state}</span></div><h2>{destination.name}</h2><p>{destination.tagline}</p><div className="best-time"><div><CalendarDays size={17} /><span>Best season</span><b>{destination.bestTime.seasons.join(' · ')}</b></div><div><Clock3 size={17} /><span>Best months</span><b>{destination.bestTime.months.slice(0, 4).join(', ')}</b></div><div><Heart size={17} /><span>Best for</span><b>{destination.bestTime.idealDays.join(' & ')}</b></div></div><p className="season-note">{destination.bestTime.note}</p><h3>Places to linger</h3><div className="attraction-list">{destination.attractions.map((attraction) => <div key={attraction.name}><span>{attraction.bestTimeOfDay}</span><strong>{attraction.name}</strong><p>{attraction.description}</p><small><Clock3 size={13} /> {attraction.visitDuration} min · {attraction.category}</small></div>)}</div><Link className="button full-button" to="/planner">Add to a trip <Plus size={16} /></Link></div>;
}

function AuthPage({ onAuthenticated }) {
  const navigate = useNavigate();
  const [mode, setMode] = useState('signup');
  const [form, setForm] = useState({ name: '', email: '', password: '', homeState: '', travelStyle: 'Culture seeker' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  async function submit(event) {
    event.preventDefault();
    setBusy(true); setError('');
    try {
      const body = mode === 'signup' ? form : { email: form.email, password: form.password };
      const data = await request(`/auth/${mode}`, { method: 'POST', body: JSON.stringify(body) });
      setAccessToken(data.token); onAuthenticated(data.user); navigate('/planner');
    } catch (requestError) { setError(requestError.message); } finally { setBusy(false); }
  }
  return <main className="auth-page"><section className="auth-story"><Link className="brand light-brand" to="/"><span className="brand-mark">T</span><span>trip<span>mania</span></span></Link><div className="auth-story-content"><p className="eyebrow light"><MapPinned size={14} /> A gentle companion for Indian journeys</p><h1>More than a booking.<br /><em>A story you get to live.</em></h1><p>Build days that breathe, know when to visit, and keep each small discovery close.</p><div className="auth-facts"><span><CheckCircle2 size={16} /> Personal day-by-day itineraries</span><span><CheckCircle2 size={16} /> Local timing and seasonal insight</span><span><CheckCircle2 size={16} /> Live weather and mapped routes</span></div></div><p className="auth-quote">“India is not one destination. It is a thousand invitations.”</p></section>
    <section className="auth-form-wrap"><div className="auth-form"><p className="eyebrow">Your next chapter starts here</p><h2>{mode === 'signup' ? 'Create your traveller profile' : 'Welcome back, explorer'}</h2><p className="muted">{mode === 'signup' ? 'Tell us a little about the journeys you want to take.' : 'Sign in to return to your saved itineraries.'}</p><div className="auth-toggle"><button className={mode === 'signup' ? 'active' : ''} onClick={() => setMode('signup')}>Sign up</button><button className={mode === 'signin' ? 'active' : ''} onClick={() => setMode('signin')}>Sign in</button></div><form onSubmit={submit}>{mode === 'signup' && <><label>Your name<input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="How should we call you?" /></label><div className="form-row"><label>Home state<input value={form.homeState} onChange={(event) => setForm({ ...form, homeState: event.target.value })} placeholder="e.g. Karnataka" /></label><label>Travel style<select value={form.travelStyle} onChange={(event) => setForm({ ...form, travelStyle: event.target.value })}><option>Culture seeker</option><option>Nature lover</option><option>Food explorer</option><option>Slow traveller</option></select></label></div></>}<label>Email address<input type="email" required value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="you@example.com" /></label><label>Password<input type="password" required minLength="8" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} placeholder={mode === 'signup' ? 'At least 8 characters' : 'Your password'} /></label>{error && <Notice tone="error">{error}</Notice>}<button className="button auth-submit" disabled={busy}>{busy ? 'Preparing your journey…' : mode === 'signup' ? 'Begin my journey' : 'Continue planning'} <ArrowRight size={17} /></button></form><p className="privacy-note">Your itineraries are personal, private and always yours.</p></div></section></main>;
}

function PlannerPage({ user }) {
  const navigate = useNavigate();
  const location = useLocation();
  const regions = useIndianStates();
  const requestedTripId = new URLSearchParams(location.search).get('trip');
  const requestedNewTrip = new URLSearchParams(location.search).get('new') === '1';
  const [trips, setTrips] = useState([]);
  const [selectedTripId, setSelectedTripId] = useState('');
  const [selectedDay, setSelectedDay] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showNewTrip, setShowNewTrip] = useState(false);
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');
  const selectedTrip = trips.find((trip) => trip._id === selectedTripId) || trips[0];
  const selectedDayData = selectedTrip?.days.find((day) => day.dayNumber === selectedDay) || selectedTrip?.days[0];
  useEffect(() => { request('/trips').then((data) => { setTrips(data.trips); setSelectedTripId(data.trips.some((trip) => trip._id === requestedTripId) ? requestedTripId : data.trips[0]?._id || ''); }).catch((requestError) => setError(requestError.message)).finally(() => setLoading(false)); }, [requestedTripId]);
  useEffect(() => { if (requestedNewTrip) setShowNewTrip(true); }, [requestedNewTrip]);
  useEffect(() => { if (selectedTrip) setSelectedDay(selectedTrip.days[0]?.dayNumber || 1); }, [selectedTripId]);
  function updateTrip(updatedTrip, message = '') { setTrips((current) => current.map((trip) => trip._id === updatedTrip._id ? updatedTrip : trip)); setSelectedTripId(updatedTrip._id); setNotice(message); setTimeout(() => setNotice(''), 3500); }
  async function createTrip(form) { try { const data = await request('/trips', { method: 'POST', body: JSON.stringify(form) }); setTrips((current) => [data.trip, ...current]); setSelectedTripId(data.trip._id); setShowNewTrip(false); setNotice('Your trip is ready for its first places.'); navigate(`/planner?trip=${data.trip._id}`); } catch (requestError) { setError(requestError.message); } }
  async function addItem(form) { try { const data = await request(`/trips/${selectedTrip._id}/items`, { method: 'POST', body: JSON.stringify(form) }); updateTrip(data.trip, 'Place added to your day.'); } catch (requestError) { setError(requestError.message); } }
  async function deleteItem(itemId) { try { const data = await request(`/trips/${selectedTrip._id}/items/${itemId}`, { method: 'DELETE' }); updateTrip(data.trip, 'Removed from your itinerary.'); } catch (requestError) { setError(requestError.message); } }
  async function deleteTrip() { try { await request(`/trips/${selectedTrip._id}`, { method: 'DELETE' }); const remaining = trips.filter((trip) => trip._id !== selectedTrip._id); setTrips(remaining); setSelectedTripId(remaining[0]?._id || ''); } catch (requestError) { setError(requestError.message); } }
  return <>
    <PageBanner eyebrow={`Hello, ${user.name.split(' ')[0]}`} title="Your journeys, shaped day by day."><p>Place every memory-to-be at the right moment, then take the route with you.</p></PageBanner>
    <main className="content-width section planner">
      {error && <Notice tone="error">{error}</Notice>}{notice && <Notice tone="success">{notice}</Notice>}
      <div className="planner-topbar"><div><p className="eyebrow">Your itinerary</p><h2>{selectedTrip?.title || 'No trip yet'}</h2>{selectedTrip && <p className="muted"><b>{selectedTrip.state}</b> · {formatTripDate(selectedTrip.startDate)} — {formatTripDate(selectedTrip.endDate)} · {selectedTrip.travellers} traveller{selectedTrip.travellers > 1 ? 's' : ''}</p>}</div><div className="planner-actions"><Link className="secondary-button" to="/plans">View saved plans</Link><button className="button" onClick={() => setShowNewTrip(true)}><Plus size={17} /> New trip</button></div></div>
      {showNewTrip && <NewTripForm regions={regions} onCancel={() => setShowNewTrip(false)} onCreate={createTrip} />}
      {loading ? <div className="planner-skeleton"></div> : !selectedTrip ? <EmptyTrip onCreate={() => setShowNewTrip(true)} /> : <div className="planner-layout"><section className="itinerary-panel"><div className="state-lock"><MapPinned size={16} /><span>Planning in <b>{selectedTrip.state}</b></span><small>Only places from this state are shown below.</small></div><div className="day-tabs">{selectedTrip.days.map((day) => <button onClick={() => setSelectedDay(day.dayNumber)} className={selectedDayData?.dayNumber === day.dayNumber ? 'active' : ''} key={day.dayNumber}><span>Day {day.dayNumber}</span><b>{shortDate.format(new Date(day.date))}</b></button>)}</div><div className="day-head"><div><p className="eyebrow">Day {selectedDayData.dayNumber}</p><h2>{weekday.format(new Date(selectedDayData.date))}, {formatTripDate(selectedDayData.date)}</h2></div><span className="place-count">{selectedDayData.items.length} places</span></div><ItineraryTimeline items={selectedDayData.items} onRemove={deleteItem} /><AddPlaceForm tripState={selectedTrip.state} dayNumber={selectedDayData.dayNumber} onAdd={addItem} /></section><aside className="planner-aside"><WeatherPanel place={selectedDayData.items[0]} /><RoutePanel items={selectedDayData.items} /><button className="delete-trip" onClick={deleteTrip}><Trash2 size={15} /> Delete this trip</button></aside></div>}
    </main>
  </>;
}

function NewTripForm({ regions, onCancel, onCreate }) {
  const [form, setForm] = useState({ title: '', state: '', startDate: localDate(14), endDate: localDate(17), travellers: 2, travelStyle: 'Balanced' });
  function submit(event) { event.preventDefault(); onCreate({ ...form, travellers: Number(form.travellers) }); }
  return <form className="new-trip-form" onSubmit={submit}><div className="form-title"><span className="mini-icon"><Palmtree size={18} /></span><div><h3>Start a fresh chapter</h3><p>Name it, choose one state or Union Territory, then add places one day at a time.</p></div></div><div className="new-trip-fields"><label>Trip name<input required value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} placeholder="e.g. Monsoon in Kerala" /></label><label className="state-select">Trip state<select required value={form.state} onChange={(event) => setForm({ ...form, state: event.target.value })}><option value="">Choose a state or Union Territory</option>{regions.map((region) => <option value={region.name} key={region.name}>{region.name} · {region.type}</option>)}</select></label><label>Arrive<input type="date" required value={form.startDate} onChange={(event) => setForm({ ...form, startDate: event.target.value })} /></label><label>Depart<input type="date" min={form.startDate} required value={form.endDate} onChange={(event) => setForm({ ...form, endDate: event.target.value })} /></label><label>Travellers<input type="number" min="1" max="20" value={form.travellers} onChange={(event) => setForm({ ...form, travellers: event.target.value })} /></label></div><div className="form-actions"><button type="button" className="secondary-button" onClick={onCancel}>Not now</button><button className="button">Create itinerary <ArrowRight size={16} /></button></div></form>;
}

function ItineraryTimeline({ items, onRemove }) {
  if (!items.length) return <div className="empty-day"><CalendarDays size={28} /><h3>This day is still open.</h3><p>Add a place below and the day will arrange itself by time.</p></div>;
  return <div className="itinerary-timeline">{items.map((item, index) => <article className="timeline-item" key={item._id}><div className="timeline-time"><b>{item.scheduledTime}</b><span>{item.durationMinutes} min</span></div><div className="timeline-node"><i></i>{index < items.length - 1 && <span></span>}</div><div className="timeline-card"><div><span className="category-badge">{item.category}</span><h3>{item.placeName}</h3><p><MapPinned size={14} /> {item.destinationName}</p>{item.notes && <p className="item-note">“{item.notes}”</p>}</div><button className="remove-item" onClick={() => onRemove(item._id)} title="Remove this place"><Trash2 size={15} /></button></div></article>)}</div>;
}

function AddPlaceForm({ tripState, dayNumber, onAdd }) {
  const [places, setPlaces] = useState([]);
  const [placeId, setPlaceId] = useState('');
  const [scheduledTime, setScheduledTime] = useState('09:00');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const place = places.find((candidate) => candidate.id === placeId);
  useEffect(() => { setLoading(true); setPlaceId(''); setError(''); request(`/places?state=${encodeURIComponent(tripState)}`).then((data) => setPlaces(data.places)).catch((requestError) => setError(requestError.message)).finally(() => setLoading(false)); }, [tripState]);
  useEffect(() => { if (place?.bestTimeOfDay) setScheduledTime(place.bestTimeOfDay); }, [placeId]);
  function submit(event) { event.preventDefault(); if (!place) return; onAdd({ dayNumber, place, scheduledTime, durationMinutes: place.visitDuration, notes }); setNotes(''); setPlaceId(''); }
  return <form className="add-place" onSubmit={submit}><div className="add-place-heading"><Plus size={19} /><div><h3>Add a meaningful stop</h3><p>{loading ? `Finding places across ${tripState}…` : `${places.length} places are ready to add from ${tripState}.`}</p></div></div>{error && <Notice tone="error">{error}</Notice>}<div className="add-place-fields"><label className="state-place-select">Place in {tripState}<select required disabled={loading || Boolean(error)} value={placeId} onChange={(event) => setPlaceId(event.target.value)}><option value="">{loading ? 'Loading state places…' : 'Choose a place'}</option>{places.map((candidate) => <option key={candidate.id} value={candidate.id}>{candidate.name} · {candidate.city}</option>)}</select></label><label>Best time<input type="time" value={scheduledTime} onChange={(event) => setScheduledTime(event.target.value)} /></label></div>{place && <div className="chosen-place"><span>{place.category}</span><strong>{place.name}</strong><small>{place.city} · {place.visitDuration} min</small></div>}<label className="notes-field">A small note for yourself<input value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Tickets, a café to try, who recommended it…" /></label><button className="button" disabled={!place}>Add to day <Plus size={16} /></button></form>;
}

function WeatherPanel({ place }) {
  const [forecast, setForecast] = useState([]);
  const [state, setState] = useState('loading');
  useEffect(() => { if (!place?.coordinates) return; setState('loading'); request(`/weather?lat=${place.coordinates.lat}&lon=${place.coordinates.lon}`).then((data) => { setForecast(data.forecast); setState('ready'); }).catch(() => setState('error')); }, [place?.coordinates?.lat, place?.coordinates?.lon]);
  return <section className="weather-panel"><div className="aside-heading"><div><CloudSun size={19} /><span>7-day weather</span></div><small>{place?.destinationName || place?.name || 'India'}</small></div>{state === 'loading' && <div className="weather-loading">Checking skies ahead…</div>}{state === 'error' && <div className="weather-loading">Live weather is temporarily unavailable.</div>}{state === 'ready' && <div className="forecast-list">{forecast.map((day) => <div key={day.date}><span>{weekday.format(new Date(`${day.date}T12:00:00`))}</span><i>{day.icon}</i><b>{day.maxTemp}°</b><small>{day.minTemp}° · {day.precipitationChance}%</small></div>)}</div>}<p className="weather-source">Live forecast via Open-Meteo</p></section>;
}

function RoutePanel({ items }) {
  if (items.length < 2) return <section className="route-panel empty-route"><RouteIcon size={23} /><h3>Routes appear as you plan</h3><p>Add two places to this day and unlock a shareable Google Maps route.</p></section>;
  const origin = `${items[0].coordinates.lat},${items[0].coordinates.lon}`;
  const destination = `${items[items.length - 1].coordinates.lat},${items[items.length - 1].coordinates.lon}`;
  const stops = items.slice(1, -1).map((item) => `${item.coordinates.lat},${item.coordinates.lon}`).join('|');
  const routeUrl = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}${stops ? `&waypoints=${encodeURIComponent(stops)}` : ''}&travelmode=driving`;
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const mapUrl = apiKey ? `https://www.google.com/maps/embed/v1/directions?key=${apiKey}&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}${stops ? `&waypoints=${encodeURIComponent(stops)}` : ''}&mode=driving` : '';
  return <section className="route-panel"><div className="aside-heading"><div><Navigation size={19} /><span>Today’s route</span></div><small>{items.length} stops</small></div>{mapUrl ? <iframe title="Google Maps directions" src={mapUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe> : <div className="route-visual"><Map size={26} /><div>{items.map((item, index) => <span key={item._id}>{index + 1}. {item.placeName}</span>)}</div></div>}<a className="button route-button" href={routeUrl} target="_blank" rel="noreferrer">Open in Google Maps <ArrowRight size={16} /></a>{!apiKey && <p className="map-hint">Add a Maps Embed API key to show the map here. Directions already open in Google Maps.</p>}</section>;
}

function SavedPlansPage() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => { request('/trips').then((data) => setTrips(data.trips)).catch((requestError) => setError(requestError.message)).finally(() => setLoading(false)); }, []);
  return <>
    <PageBanner eyebrow="Your travel library" title="Every saved plan, ready when you are."><p>Open any itinerary to continue shaping its days. Each plan keeps its own state-specific set of places.</p></PageBanner>
    <main className="content-width section saved-plans">
      <div className="section-heading"><div><p className="eyebrow">Saved journeys</p><h2>{trips.length} plan{trips.length === 1 ? '' : 's'} in your library</h2></div><Link className="button" to="/planner?new=1"><Plus size={16} /> Plan a new trip</Link></div>
      {error && <Notice tone="error">{error}</Notice>}
      {loading ? <div className="saved-plan-grid"><LoadingCards count={3} /></div> : trips.length === 0 ? <div className="empty-trip"><div className="empty-orbit"><Compass size={39} /></div><p className="eyebrow">Your map is waiting</p><h2>There are no saved plans yet.</h2><p>Choose a state, name your trip, then make the first day yours.</p><Link className="button" to="/planner?new=1">Plan my first trip <ArrowRight size={16} /></Link></div> : <div className="saved-plan-grid">{trips.map((trip) => { const placeCount = trip.days.reduce((count, day) => count + day.items.length, 0); return <article className="saved-plan-card" key={trip._id}><div className="plan-card-orbit"><MapPinned size={23} /></div><p className="eyebrow">{trip.state || 'India'}</p><h2>{trip.title}</h2><p className="saved-plan-dates"><CalendarDays size={14} /> {formatTripDate(trip.startDate)} — {formatTripDate(trip.endDate)}</p><div className="saved-plan-meta"><span>{trip.days.length} days</span><span>{placeCount} planned places</span><span>{trip.travellers} traveller{trip.travellers > 1 ? 's' : ''}</span></div><Link className="text-button" to={`/planner?trip=${trip._id}`}>Open itinerary <ArrowRight size={16} /></Link></article>; })}</div>}
    </main>
  </>;
}

function EmptyTrip({ onCreate }) { return <div className="empty-trip"><div className="empty-orbit"><Compass size={39} /></div><p className="eyebrow">Your map is waiting</p><h2>Where will India take you?</h2><p>Start with a place that has been calling you. We’ll give each day the space it deserves.</p><button className="button" onClick={onCreate}>Plan my first trip <ArrowRight size={16} /></button></div>; }

function Notice({ tone, children }) { return <div className={`notice ${tone}`}>{tone === 'success' ? <CheckCircle2 size={17} /> : <Umbrella size={17} />}{children}</div>; }

function ProtectedRoute({ user, children }) { return user ? children : <Navigate to="/auth" replace />; }

function App() {
  const [user, setUser] = useState(() => { try { return JSON.parse(localStorage.getItem('tripmania_user')) || null; } catch { return null; } });
  function handleAuthenticated(profile) { setUser(profile); localStorage.setItem('tripmania_user', JSON.stringify(profile)); }
  function handleSignOut() { setAccessToken(null); localStorage.removeItem('tripmania_user'); setUser(null); }
  return <><NavBar user={user} onSignOut={handleSignOut} /><Routes><Route path="/" element={<HomePage />} /><Route path="/explore" element={<ExplorePage />} /><Route path="/auth" element={user ? <Navigate to="/planner" replace /> : <AuthPage onAuthenticated={handleAuthenticated} />} /><Route path="/planner" element={<ProtectedRoute user={user}><PlannerPage user={user} /></ProtectedRoute>} /><Route path="/plans" element={<ProtectedRoute user={user}><SavedPlansPage /></ProtectedRoute>} /><Route path="*" element={<Navigate to="/" replace />} /></Routes><footer><div className="content-width"><Link to="/" className="brand"><span className="brand-mark">T</span><span>trip<span>mania</span></span></Link><p>Travel India with curiosity, care and a little more time.</p><span>Made for journeys that stay with you.</span></div></footer></>;
}

export default App;

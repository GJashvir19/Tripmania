export const destinations = [
  {
    state: 'Rajasthan',
    subdivision: 'Jaipur District',
    name: 'Jaipur',
    tagline: 'The pink city of royal ateliers and living forts',
    description: 'Amber-toned facades, observatories, bazaars and palace courtyards make Jaipur a vivid introduction to Rajasthan.',
    heroImage: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1400&q=80',
    coordinates: { lat: 26.9124, lon: 75.7873 },
    bestTime: { seasons: ['Winter', 'Post-monsoon'], months: ['October', 'November', 'December', 'January', 'February', 'March'], idealDays: ['Weekday', 'Weekend'], note: 'Start outdoor monuments before 9 AM in warmer months.' },
    tags: ['Heritage', 'Architecture', 'Markets'],
    attractions: [
      { name: 'Amber Fort', category: 'Fort', description: 'Hilltop fort-palace with mirrored halls and sweeping views.', visitDuration: 180, bestTimeOfDay: 'Morning', ticketHint: 'Book ahead during peak winter season.', coordinates: { lat: 26.9855, lon: 75.8513 } },
      { name: 'Hawa Mahal', category: 'Landmark', description: 'The honeycomb facade of Jaipur’s iconic palace.', visitDuration: 60, bestTimeOfDay: 'Early morning', ticketHint: 'Best photographed from Badi Chaupard.', coordinates: { lat: 26.9239, lon: 75.8267 } },
      { name: 'City Palace', category: 'Museum', description: 'Royal galleries, courtyards and textile collections.', visitDuration: 120, bestTimeOfDay: 'Afternoon', ticketHint: 'Allow time for the museum galleries.', coordinates: { lat: 26.9258, lon: 75.8237 } }
    ]
  },
  {
    state: 'Rajasthan',
    subdivision: 'Udaipur District',
    name: 'Udaipur',
    tagline: 'Lakeside palaces and Aravalli sunsets',
    description: 'Udaipur rewards a slower rhythm: marble palaces, artisan lanes and boat rides across glassy Lake Pichola.',
    heroImage: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1400&q=80',
    coordinates: { lat: 24.5854, lon: 73.7125 },
    bestTime: { seasons: ['Winter', 'Monsoon'], months: ['September', 'October', 'November', 'December', 'January', 'February', 'March'], idealDays: ['Weekday'], note: 'Monsoon brings dramatic clouds; winter has clearer lake views.' },
    tags: ['Lakes', 'Royalty', 'Romance'],
    attractions: [
      { name: 'City Palace Udaipur', category: 'Palace', description: 'A maze of balconies, courtyards and lake-facing rooms.', visitDuration: 180, bestTimeOfDay: 'Morning', ticketHint: 'Reach opening time to avoid group crowds.', coordinates: { lat: 24.5764, lon: 73.6835 } },
      { name: 'Lake Pichola', category: 'Lake', description: 'A tranquil lake framed by palaces and the Aravallis.', visitDuration: 90, bestTimeOfDay: 'Sunset', ticketHint: 'Boat rides are weather dependent.', coordinates: { lat: 24.5687, lon: 73.6783 } },
      { name: 'Bagore Ki Haveli', category: 'Heritage', description: 'Historic haveli with an evening folk dance performance.', visitDuration: 120, bestTimeOfDay: 'Evening', ticketHint: 'Reserve the cultural show in season.', coordinates: { lat: 24.5752, lon: 73.6822 } }
    ]
  },
  {
    state: 'Kerala',
    subdivision: 'Ernakulam District',
    name: 'Kochi',
    tagline: 'A port city where spice routes meet contemporary art',
    description: 'Kochi layers Portuguese, Dutch, Jewish and Malayalam history across waterfront lanes, galleries and cafés.',
    heroImage: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1400&q=80',
    coordinates: { lat: 9.9312, lon: 76.2673 },
    bestTime: { seasons: ['Winter', 'Post-monsoon'], months: ['October', 'November', 'December', 'January', 'February', 'March'], idealDays: ['Weekday', 'Weekend'], note: 'Walk Fort Kochi in the morning; keep afternoons for museums and cafés.' },
    tags: ['Coast', 'History', 'Art'],
    attractions: [
      { name: 'Chinese Fishing Nets', category: 'Waterfront', description: 'Kochi’s recognizable cantilevered fishing nets at the harbour.', visitDuration: 45, bestTimeOfDay: 'Sunset', ticketHint: 'Bring a camera for golden-hour silhouettes.', coordinates: { lat: 9.9658, lon: 76.2426 } },
      { name: 'Mattancherry Palace', category: 'Museum', description: 'Murals and royal artefacts inside a Portuguese-era palace.', visitDuration: 75, bestTimeOfDay: 'Late morning', ticketHint: 'Closed on select public holidays.', coordinates: { lat: 9.9571, lon: 76.2595 } },
      { name: 'Jew Town', category: 'Market', description: 'Antique stores, spice merchants and heritage synagogues.', visitDuration: 90, bestTimeOfDay: 'Afternoon', ticketHint: 'Most shops close by early evening.', coordinates: { lat: 9.956, lon: 76.2591 } }
    ]
  },
  {
    state: 'Kerala',
    subdivision: 'Idukki District',
    name: 'Munnar',
    tagline: 'Tea-green mountains above the clouds',
    description: 'Munnar’s rolling tea estates, cool air and high-altitude trails form a natural counterpoint to Kerala’s coast.',
    heroImage: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1400&q=80',
    coordinates: { lat: 10.0889, lon: 77.0595 },
    bestTime: { seasons: ['Winter', 'Monsoon'], months: ['September', 'October', 'November', 'December', 'January', 'February', 'March', 'April'], idealDays: ['Weekday'], note: 'Carry rain layers in monsoon and begin viewpoints early for clear skies.' },
    tags: ['Hills', 'Tea', 'Nature'],
    attractions: [
      { name: 'Tea Museum', category: 'Museum', description: 'The story of Munnar’s plantations, machinery and tea culture.', visitDuration: 75, bestTimeOfDay: 'Morning', ticketHint: 'Pair with a nearby tea tasting.', coordinates: { lat: 10.0948, lon: 77.062 } },
      { name: 'Eravikulam National Park', category: 'Nature', description: 'High grasslands and the habitat of the Nilgiri tahr.', visitDuration: 210, bestTimeOfDay: 'Early morning', ticketHint: 'Seasonal closures apply during breeding period.', coordinates: { lat: 10.179, lon: 77.062 } },
      { name: 'Pothamedu View Point', category: 'Viewpoint', description: 'Wide views over tea, cardamom and misty slopes.', visitDuration: 45, bestTimeOfDay: 'Sunset', ticketHint: 'Weather can change quickly after 4 PM.', coordinates: { lat: 10.053, lon: 77.044 } }
    ]
  },
  {
    state: 'Uttar Pradesh',
    subdivision: 'Agra District',
    name: 'Agra',
    tagline: 'Mughal grandeur in white marble and red sandstone',
    description: 'Agra offers a powerful arc of Mughal history from the Taj Mahal’s symmetry to the fortified city of Akbar.',
    heroImage: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1400&q=80',
    coordinates: { lat: 27.1767, lon: 78.0081 },
    bestTime: { seasons: ['Winter', 'Post-monsoon'], months: ['October', 'November', 'December', 'January', 'February', 'March'], idealDays: ['Weekday'], note: 'Visit the Taj at sunrise, particularly between October and March.' },
    tags: ['UNESCO', 'Mughal', 'Architecture'],
    attractions: [
      { name: 'Taj Mahal', category: 'UNESCO monument', description: 'The marble mausoleum built by Shah Jahan beside the Yamuna.', visitDuration: 180, bestTimeOfDay: 'Sunrise', ticketHint: 'Buy timed tickets online and carry valid ID.', coordinates: { lat: 27.1751, lon: 78.0421 } },
      { name: 'Agra Fort', category: 'Fort', description: 'A formidable red sandstone fort and former Mughal residence.', visitDuration: 120, bestTimeOfDay: 'Late morning', ticketHint: 'The fort is a short ride from the Taj.', coordinates: { lat: 27.1795, lon: 78.0211 } },
      { name: 'Mehtab Bagh', category: 'Garden', description: 'A riverside garden framing the Taj Mahal at sunset.', visitDuration: 75, bestTimeOfDay: 'Sunset', ticketHint: 'Ideal final stop for a quieter Taj view.', coordinates: { lat: 27.1801, lon: 78.0402 } }
    ]
  },
  {
    state: 'Maharashtra',
    subdivision: 'Mumbai Suburban',
    name: 'Mumbai',
    tagline: 'Maximum city, from Art Deco promenades to island caves',
    description: 'Mumbai moves at a thrilling pace, mixing cinema, Victorian heritage, seaside walks and inventive food.',
    heroImage: 'https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?auto=format&fit=crop&w=1400&q=80',
    coordinates: { lat: 19.076, lon: 72.8777 },
    bestTime: { seasons: ['Winter', 'Post-monsoon'], months: ['October', 'November', 'December', 'January', 'February'], idealDays: ['Weekday', 'Weekend'], note: 'Use weekday mornings for Colaba; avoid outdoor touring in peak monsoon rain.' },
    tags: ['City', 'Food', 'Art Deco'],
    attractions: [
      { name: 'Gateway of India', category: 'Landmark', description: 'Waterfront arch overlooking Mumbai Harbour.', visitDuration: 45, bestTimeOfDay: 'Early morning', ticketHint: 'Combine with a harbour ferry.', coordinates: { lat: 18.922, lon: 72.8347 } },
      { name: 'Chhatrapati Shivaji Maharaj Terminus', category: 'UNESCO monument', description: 'A monumental Victorian Gothic railway station.', visitDuration: 60, bestTimeOfDay: 'Late afternoon', ticketHint: 'Admire exterior while the station remains in active use.', coordinates: { lat: 18.9398, lon: 72.8355 } },
      { name: 'Marine Drive', category: 'Promenade', description: 'The Queen’s Necklace curves along the Arabian Sea.', visitDuration: 90, bestTimeOfDay: 'Sunset', ticketHint: 'Take a relaxed stroll after the heat fades.', coordinates: { lat: 18.943, lon: 72.8238 } }
    ]
  },
  {
    state: 'Tamil Nadu',
    subdivision: 'Chengalpattu District',
    name: 'Mahabalipuram',
    tagline: 'Granite temples carved beside the Bay of Bengal',
    description: 'Ancient Pallava monuments emerge from coastal granite, creating one of south India’s most atmospheric heritage walks.',
    heroImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1400&q=80',
    coordinates: { lat: 12.6269, lon: 80.1927 },
    bestTime: { seasons: ['Winter'], months: ['November', 'December', 'January', 'February'], idealDays: ['Weekday'], note: 'The shore complex is most comfortable close to opening time.' },
    tags: ['UNESCO', 'Coast', 'Temples'],
    attractions: [
      { name: 'Shore Temple', category: 'UNESCO monument', description: 'A seventh-century granite temple facing the Bay of Bengal.', visitDuration: 75, bestTimeOfDay: 'Sunrise', ticketHint: 'The site is exposed to sun through midday.', coordinates: { lat: 12.6167, lon: 80.199 } },
      { name: 'Pancha Rathas', category: 'Heritage', description: 'Five monolithic chariots cut from individual granite boulders.', visitDuration: 90, bestTimeOfDay: 'Morning', ticketHint: 'Keep water with you.', coordinates: { lat: 12.6109, lon: 80.1911 } },
      { name: 'Arjuna’s Penance', category: 'Heritage', description: 'A massive open-air relief filled with divine and everyday scenes.', visitDuration: 45, bestTimeOfDay: 'Late afternoon', ticketHint: 'Easy to combine with the lighthouse area.', coordinates: { lat: 12.6199, lon: 80.1937 } }
    ]
  },
  {
    state: 'West Bengal',
    subdivision: 'Kolkata District',
    name: 'Kolkata',
    tagline: 'Bookshops, colonial facades and Bengal’s creative soul',
    description: 'Kolkata is a city of ideas, sweets and stories where colonial institutions meet a deep Bengali cultural life.',
    heroImage: 'https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=1400&q=80',
    coordinates: { lat: 22.5726, lon: 88.3639 },
    bestTime: { seasons: ['Winter'], months: ['October', 'November', 'December', 'January', 'February'], idealDays: ['Weekday', 'Weekend'], note: 'Durga Puja is spectacular but requires reservations and patient pacing.' },
    tags: ['Culture', 'Literature', 'Food'],
    attractions: [
      { name: 'Victoria Memorial', category: 'Museum', description: 'A grand marble museum set inside formal gardens.', visitDuration: 120, bestTimeOfDay: 'Morning', ticketHint: 'Allow time for the galleries and gardens.', coordinates: { lat: 22.5448, lon: 88.3426 } },
      { name: 'Indian Museum', category: 'Museum', description: 'India’s oldest museum, spanning art, archaeology and natural history.', visitDuration: 150, bestTimeOfDay: 'Afternoon', ticketHint: 'Choose two or three galleries to avoid fatigue.', coordinates: { lat: 22.558, lon: 88.3512 } },
      { name: 'Prinsep Ghat', category: 'Riverside', description: 'A riverfront colonnade looking across the Hooghly.', visitDuration: 60, bestTimeOfDay: 'Sunset', ticketHint: 'Visit on a clear evening.', coordinates: { lat: 22.5421, lon: 88.3329 } }
    ]
  }
];

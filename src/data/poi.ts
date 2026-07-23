// Structured POI data for Faro Marina (Doca de Faro).
// Single source of truth used by BaseLayout JSON-LD, Hero, QuickInfo, etc.

export const poi = {
  name: { pt: 'Faro Marina', en: 'Faro Marina', zh: '法鲁码头' },
  alternateName: { pt: 'Doca de Faro', en: 'Doca de Faro', zh: 'Doca de Faro' },

  address: 'Praça Dom Francisco Gomes, 8000-168 Faro, Portugal',
  streetAddress: 'Praça Dom Francisco Gomes',
  city: 'Faro',
  region: 'Algarve',
  country: 'Portugal',
  countryCode: 'PT',

  rating: 4.4,
  reviews: 5181,

  lat: 37.0154,
  lng: -7.9347,

  // Stable Google Maps place/search URL (open in maps on every device).
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=37.0154%2C-7.9347',

  opening: { pt: 'Aberto 24 horas', en: 'Open 24 hours', zh: '全天开放' },
  category: { pt: 'Frente Marítima', en: 'Waterfront', zh: '海滨' },

  heroImage: '/gallery/royal-palace-of-cambodia-1.jpg',
};

export type Poi = typeof poi;

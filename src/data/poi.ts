// Structured POI data for the Royal Palace of Cambodia (Phnom Penh).
// Single source of truth used by BaseLayout JSON-LD, Hero, QuickInfo, etc.

export const poi = {
  name: {
    km: 'ព្រះបរមរាជវាំង',
    en: 'Royal Palace of Cambodia',
    zh: '金边王宫',
  },
  alternateName: {
    km: 'ព្រះបរមរាជវាំងភ្នំពេញ',
    en: 'Royal Palace Phnom Penh',
    zh: '金边王宫',
  },

  address: 'Samdach Sothearos Blvd (3), Phnom Penh, Cambodia',
  streetAddress: 'Samdach Sothearos Blvd (3)',
  city: 'Phnom Penh',
  region: '',
  country: 'Cambodia',
  countryCode: 'KH',

  rating: 4.4,
  reviews: 13632,

  lat: 11.5614,
  lng: 104.9319,

  // Stable Google Maps URL (open in maps on every device).
  mapsUrl: 'https://maps.app.goo.gl/bEsGRgKQhNudrceN8',

  // Ticket admission (USD, cash on-site).
  ticketPrice: '$10 USD',

  opening: {
    km: '០៨:០០ – ១១:០០ និង ១៤:០០ – ១៧:០០',
    en: '08:00 – 11:00 & 14:00 – 17:00',
    zh: '08:00 – 11:00 及 14:00 – 17:00',
  },
  category: {
    km: 'តំបន់ប្រវត្តិសាស្ត្រ',
    en: 'Historic Site',
    zh: '历史古迹',
  },

  heroImage: '/gallery/royal-palace-of-cambodia-1.jpg',
};

export type Poi = typeof poi;

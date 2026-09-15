// Structured POI data for the Royal Palace of Cambodia (Phnom Penh).
// Single source of truth used by BaseLayout JSON-LD, Hero, Reviews, QuickInfo, etc.
//
// Ratings, review counts, address, plus code and map links are synced from the
// official Google Maps place listing (see src/i18n/*.json → attribution for the
// visible source note). Google reviews are shown on the page only and are
// deliberately NOT emitted as JSON-LD (no aggregateRating / review markup).

export const poi = {
  // Official full name of the attraction (as listed on Google Maps).
  name: {
    km: 'ព្រះបរមរាជវាំងចតុមុខមង្គល',
    en: 'Royal Palace of Cambodia',
    zh: '柬埔寨王宫',
  },
  // Common short name — the meaning behind the domain royalpalacephnompenh.com.
  shortName: {
    km: 'ព្រះបរមរាជវាំងភ្នំពេញ',
    en: 'Royal Palace Phnom Penh',
    zh: '金边王宫',
  },
  alternateName: {
    km: 'ព្រះបរមរាជវាំងភ្នំពេញ',
    en: 'Royal Palace Phnom Penh',
    zh: '金边王宫',
  },

  address: 'Samdach Sothearos Blvd (3), Phnom Penh, Cambodia',
  streetAddress: 'Samdach Sothearos Blvd (3)',
  plusCode: 'HW7J+HG',
  plusCodeFull: '7P36HW7J+HG',
  city: 'Phnom Penh',
  region: 'Phnom Penh',
  country: 'Cambodia',
  countryCode: 'KH',
  postalCode: '12000',

  // Synced from the Google Maps listing — September 2026.
  rating: 4.3,
  reviews: 13775,
  reviewSyncPeriod: {
    km: 'កញ្ញា ២០២៦',
    en: 'September 2026',
    zh: '2026 年 9 月',
  },

  // Google Maps marker — centre of Google plus code HW7J+HG.
  lat: 11.5639375,
  lng: 104.9313125,

  // Stable Google Maps URL (open in maps on every device).
  mapsUrl: 'https://maps.app.goo.gl/bEsGRgKQhNudrceN8',
  // Website listed on the Google Maps place page.
  website: 'https://www.royalpalacephnompenh.com/',

  // Authoritative outbound references (.org / .gov).
  govtTourismUrl: 'https://www.tourismcambodia.org/',
  cityHallUrl: 'https://www.phnompenh.gov.kh/',

  // Ticket admission (USD, cash on-site).
  ticketPrice: '$10 USD',

  opening: {
    km: '០៨:០០ – ១១:០០ និង ១៤:០០ – ១៧:០០',
    en: '08:00 – 11:00 & 14:00 – 17:00',
    zh: '08:00 – 11:00 及 14:00 – 17:00',
  },
  category: {
    km: 'ទីតាំងប្រវត្តិសាស្ត្រ',
    en: 'Historic Landmark',
    zh: '历史地标',
  },

  heroImage: '/gallery/royal-palace-of-cambodia-1.jpg',
};

/** Gallery images (24 photos preserved) shared by the gallery and JSON-LD. */
export const galleryImages: string[] = Array.from(
  { length: 24 },
  (_, i) => `/gallery/royal-palace-of-cambodia-${i + 1}.jpg`,
);

export type Poi = typeof poi;

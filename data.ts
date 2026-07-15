// ============================================================================
// D-RAMONES — Contenido editable
// Cambia aquí los textos, eventos y ciudades sin tocar los componentes.
// Las imágenes se referencian desde /public/images/ — sustitúyelas
// manteniendo el mismo nombre de archivo, o cambia la ruta aquí.
// ============================================================================

export const artist = {
  name: 'D-RAMONES',
  tagline: ['Two Generations.', 'One Island.', 'One Sound.'],
};

export type FamilyMember = {
  id: 'jose' | 'ilhuan';
  name: string;
  role: string;
  bio: string;
  years: string;
  portrait: string;
  detailImage: string;
};

export const family: FamilyMember[] = [
  {
    id: 'jose',
    name: 'José',
    role: 'The Founder',
    bio: 'Three decades behind the decks of Ibiza. José built his sound in the era before algorithms — vinyl crates, sunrise sets, and a room that always kept dancing.',
    years: 'Since 1994',
    portrait: '/images/jose-portrait-beach.jpeg',
    detailImage: '/images/jose-carnales-portrait.jpeg',
  },
  {
    id: 'ilhuan',
    name: 'Ilhuan',
    role: 'The Next Chapter',
    bio: 'Raised inside the booth, Ilhuan grew up reading a crowd before he could drive. His sets carry the island\u2019s history forward into new rooms, new cities, new generations.',
    years: 'Since 2016',
    portrait: '/images/ilhuan-unexpected-sunset.png',
    detailImage: '/images/ilhuan-night-set.png',
  },
];

export type City = {
  id: string;
  name: string;
  country: string;
  event: string;
  year: string;
  image: string;
  lat: number;
  lng: number;
};

export const cities: City[] = [
  { id: 'ibiza', name: 'Ibiza', country: 'Spain', event: 'The Unexpected Hotel', year: '2026', image: '/images/ilhuan-unexpected-sunset.png', lat: 38.9067, lng: 1.4206 },
  { id: 'madrid', name: 'Madrid', country: 'Spain', event: 'Carnales Tour', year: '2025', image: '/images/jose-carnales-portrait.jpeg', lat: 40.4168, lng: -3.7038 },
  { id: 'valencia', name: 'Valencia', country: 'Spain', event: 'Sunset Sessions', year: '2025', image: '/images/duo-carnales-mountains.jpeg', lat: 39.4699, lng: -0.3763 },
  { id: 'bcn', name: 'Barcelona', country: 'Spain', event: 'Rooftop Series', year: '2024', image: '/images/duo-silhouette-beachclub.jpeg', lat: 41.3874, lng: 2.1686 },
  { id: 'mexico', name: 'Mexico City', country: 'Mexico', event: 'Carnales B2B', year: '2025', image: '/images/jose-festival-waterfall.jpeg', lat: 19.4326, lng: -99.1332 },
  { id: 'berlin', name: 'Berlin', country: 'Germany', event: 'Warehouse Nights', year: '2024', image: '/images/duo-stage-silhouette.jpeg', lat: 52.5200, lng: 13.4050 },
];

export type EventItem = {
  id: string;
  title: string;
  venue: string;
  location: string;
  date: string;
  image: string;
};

export const events: EventItem[] = [
  {
    id: 'ev1',
    title: 'The Unexpected',
    venue: 'The Unexpected Hotel',
    location: 'Ibiza, Spain',
    date: 'Summer 2026',
    image: '/images/ilhuan-unexpected-sunset.png',
  },
  {
    id: 'ev2',
    title: 'Carnales',
    venue: 'Open Air Festival',
    location: 'Sierra de Madrid',
    date: 'September 2025',
    image: '/images/duo-carnales-mountains.jpeg',
  },
  {
    id: 'ev3',
    title: 'Sunset Session',
    venue: 'Beach Club',
    location: 'San Antonio, Ibiza',
    date: 'August 2025',
    image: '/images/jose-portrait-beach.jpeg',
  },
  {
    id: 'ev4',
    title: 'Waterfall',
    venue: 'Main Stage',
    location: 'Iguazú, Argentina',
    date: 'March 2025',
    image: '/images/jose-festival-waterfall.jpeg',
  },
  {
    id: 'ev5',
    title: 'Closing Set',
    venue: 'Rooftop',
    location: 'Barcelona, Spain',
    date: 'October 2024',
    image: '/images/duo-silhouette-beachclub.jpeg',
  },
];

export const contact = {
  email: 'booking@d-ramones.com',
  management: 'management@d-ramones.com',
  instagram: '@dramones',
  instagramUrl: 'https://instagram.com/dramones',
};

export const bornInIbizaPhrases = [
  'Born in Ibiza.',
  'Two generations.',
  'One legacy.',
  'House.',
  'Experience.',
];

export const bornInIbizaFull =
  'What started as one man\u2019s obsession with a sound became a language passed between father and son. D-RAMONES is not a project — it is an inheritance, carried from vinyl to digital, from one dancefloor to the next, without ever losing the island in its blood.';

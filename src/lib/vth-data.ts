// ============================================================
// Volta Tourism Hub — Master Data File
// ============================================================

export interface Destination {
  id: string;
  name: string;
  municipality: string;
  category: string;
  rating: number;
  distance: string;
  travelTime: string;
  image: string;
  images?: string[];
  description: string;
  highlights: string[];
}

export interface Experience {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  icon: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  category: string;
  image: string;
  description: string;
}

export interface Story {
  id: string;
  title: string;
  category: string;
  image: string;
  excerpt: string;
  readingTime: string;
  author: string;
  date: string;
}

export interface Investment {
  id: string;
  title: string;
  sector: string;
  capital: string;
  returns: string;
  location: string;
  image: string;
  description: string;
}

export interface Community {
  id: string;
  name: string;
  image: string;
  description: string;
  culture: string;
  products: string[];
  population: string;
}

export interface Business {
  id: string;
  name: string;
  category: string;
  image: string;
  location: string;
  rating: number;
  verified: boolean;
  contact: string;
}

export interface TripPlan {
  days: number;
  budget: string;
  interests: string[];
  style: string;
  itinerary: DayPlan[];
}

export interface DayPlan {
  day: number;
  title: string;
  activities: { time: string; activity: string; location: string; cost: string }[];
}

// ---- DESTINATIONS ----
export const destinations: Destination[] = [
  {
    id: "wli-falls",
    name: "Wli Waterfalls",
    municipality: "Hohoe Municipality",
    category: "Waterfall",
    rating: 4.8,
    distance: "280 km from Accra",
    travelTime: "4 hours drive",
    image: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=800&q=80",
    description:
      "The highest waterfall in West Africa, Wli cascades magnificently through lush tropical forest. The lower falls welcome all visitors with a gentle walk, while the upper falls reward the adventurous with a challenging but breathtaking trek through the Agumatsa Wildlife Sanctuary.",
    highlights: ["Highest waterfall in West Africa", "Swimming at the base", "Bat colony viewing", "Forest hiking trails"],
  },
  {
    id: "mount-afadja",
    name: "Mount Afadja",
    municipality: "Hohoe Municipality",
    category: "Mountain",
    rating: 4.7,
    distance: "275 km from Accra",
    travelTime: "4 hours drive",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
    description:
      "At 885 meters, Mount Afadja is the highest peak in Ghana. The hike to the summit takes you through cloud forests teeming with rare butterflies and birdlife, culminating in panoramic views that stretch across the Volta Region and into Togo.",
    highlights: ["Highest mountain in Ghana", "Cloud forest ecosystem", "Panoramic summit views", "Bird watching"],
  },
  {
    id: "keta-beach",
    name: "Keta Beach",
    municipality: "Keta Municipal",
    category: "Beach",
    rating: 4.5,
    distance: "160 km from Accra",
    travelTime: "2.5 hours drive",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    description:
      "A pristine stretch of golden sand along the Atlantic Ocean, Keta Beach offers serene coastal beauty, spectacular sunsets, and rich fishing culture. The nearby Keta Lagoon Complex is one of West Africa's largest wetland ecosystems.",
    highlights: ["Golden sand beaches", "Keta Lagoon Complex", "Fishing village tours", "Water sports"],
  },
  {
    id: "tafi-atome",
    name: "Tafi Atome Monkey Sanctuary",
    municipality: "Afadjato District",
    category: "Wildlife",
    rating: 4.6,
    distance: "260 km from Accra",
    travelTime: "3.5 hours drive",
    image: "https://images.unsplash.com/photo-1549366021-9f761d450615?w=800&q=80",
    description:
      "Home to a sacred population of Mona monkeys, Tafi Atome is a community-led conservation success story. Visitors walk through the forest canopy with guides as the habituated monkeys approach freely, creating magical close encounters.",
    highlights: ["Sacred Mona monkeys", "Community eco-tourism", "Canopy walk", "Cultural immersion"],
  },
  {
    id: "xavi-birds",
    name: "Xavi Bird Sanctuary",
    municipality: "Akatsi South",
    category: "Wildlife",
    rating: 4.4,
    distance: "200 km from Accra",
    travelTime: "3 hours drive",
    image: "/tafi-atome-sanctuary.jpg",
    images: ["/tafi-atome-sanctuary.jpg"],
    description:
      "A birdwatcher's paradise nestled along the Volta River, Xavi Bird Sanctuary hosts over 300 bird species. Explore by canoe through flooded forests and savanna wetlands while spotting kingfishers, herons, and rare migratory species.",
    highlights: ["300+ bird species", "Canoe safari", "Volta River scenery", "Photography paradise"],
  },
  {
    id: "tagbo-falls",
    name: "Tagbo Falls",
    municipality: "Hohoe Municipality",
    category: "Waterfall",
    rating: 4.5,
    distance: "275 km from Accra",
    travelTime: "4 hours drive",
    image: "https://images.unsplash.com/photo-1445217143695-467124038776?w=800&q=80",
    description:
      "Hidden deep in the forest near Liati Wote village, Tagbo Falls requires a rewarding hike through cocoa farms and tropical forest. The waterfall cascades from a height of about 40 meters into a crystal-clear pool perfect for swimming.",
    highlights: ["Crystal-clear swimming pool", "Forest hiking", "Cocoa farm trails", "Village cultural experience"],
  },
  {
    id: "volta-lake",
    name: "Lake Volta",
    municipality: "Multiple Districts",
    category: "Nature",
    rating: 4.7,
    distance: "150 km from Accra",
    travelTime: "2.5 hours drive",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80",
    description:
      "The world's largest artificial reservoir by surface area, Lake Volta stretches over 8,500 square kilometers. Its serene waters, dotted with fishing villages and islands, offer opportunities for boat cruises, fishing, and waterfront relaxation.",
    highlights: ["World's largest reservoir", "Boat cruises", "Fishing experiences", "Island exploration"],
  },
  {
    id: "kente-weaving",
    name: "Kente Weaving Villages",
    municipality: "Ho West District",
    category: "Culture",
    rating: 4.8,
    distance: "170 km from Accra",
    travelTime: "2.5 hours drive",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80",
    description:
      "Visit the ancestral home of Kente cloth, the iconic hand-woven fabric of the Ewe and Ashanti people. Watch master weavers create intricate patterns on traditional looms, learn the meanings behind each design, and purchase authentic textiles directly from artisans.",
    highlights: ["Traditional hand-weaving", "Master artisan demonstrations", "Authentic textile purchase", "Cultural significance"],
  },
];

// ---- EXPERIENCES ----
export const experiences: Experience[] = [
  {
    id: "exp-nature",
    title: "Nature & Scenic Beauty",
    category: "Nature",
    icon: "Trees",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80",
    description: "Immerse yourself in pristine forests, cascading waterfalls, and breathtaking mountain vistas that define the Volta Region's natural landscape.",
  },
  {
    id: "exp-adventure",
    title: "Adventure & Thrills",
    category: "Adventure",
    icon: "Mountain",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=80",
    description: "From mountain climbing to waterfall rappelling, the Volta Region offers heart-pounding adventures for every level of thrill-seeker.",
  },
  {
    id: "exp-culture",
    title: "Cultural Heritage",
    category: "Culture",
    icon: "Landmark",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80",
    description: "Experience vibrant festivals, traditional drumming, Kente weaving, and the warm hospitality of Ewe communities across the region.",
  },
  {
    id: "exp-wildlife",
    title: "Wildlife & Safari",
    category: "Wildlife",
    icon: "Bird",
    image: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=600&q=80",
    description: "Encounter sacred monkeys, exotic birds, and diverse ecosystems in community-managed sanctuaries and wetland reserves.",
  },
  {
    id: "exp-coastal",
    title: "Coastal & Beaches",
    category: "Coastal",
    icon: "Waves",
    image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=600&q=80",
    description: "Discover pristine Atlantic beaches, serene lagoons, and vibrant fishing communities along the Volta Region's stunning coastline.",
  },
  {
    id: "exp-food",
    title: "Food & Culinary",
    category: "Food",
    icon: "UtensilsCrossed",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80",
    description: "Savor authentic Ewe cuisine, from banku and tilapia to fresh seafood delicacies, prepared with traditional methods and local ingredients.",
  },
  {
    id: "exp-festivals",
    title: "Festivals & Events",
    category: "Festivals",
    icon: "PartyPopper",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&q=80",
    description: "Join spectacular traditional festivals like Hogbetsotso, Agbamevoza, and Keta Afenorto that showcase the rich cultural tapestry of the Volta people.",
  },
  {
    id: "exp-photography",
    title: "Photography Tours",
    category: "Photography",
    icon: "Camera",
    image: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=600&q=80",
    description: "Capture stunning landscapes, vibrant cultures, and unique wildlife with guided photography tours designed for enthusiasts and professionals.",
  },
  {
    id: "exp-community",
    title: "Community Tourism",
    category: "Community",
    icon: "Users",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
    description: "Live among local communities, learn traditional crafts, participate in daily life, and create meaningful connections with the people of Volta.",
  },
];

// ---- EVENTS ----
export const events: Event[] = [
  {
    id: "ev-hogbetsotso",
    title: "Hogbetsotso Festival",
    date: "November 2026",
    location: "Anloga, Volta Region",
    category: "Cultural",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&q=80",
    description: "The grand festival of the Anlo Ewe people commemorating their historic migration from Notsie in Togo. Features colorful durbar of chiefs, traditional drumming, dancing, and a grand procession.",
  },
  {
    id: "ev-agbamevoza",
    title: "Agbamevoza Kente Festival",
    date: "October 2026",
    location: "Agortime-Kpetoe, Volta Region",
    category: "Cultural",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&q=80",
    description: "A celebration of the ancient art of Kente weaving at its birthplace. Witness spectacular displays of handwoven textiles, weaving competitions, and cultural performances.",
  },
  {
    id: "ev-afenorto",
    title: "Keta Afenorto Festival",
    date: "August 2026",
    location: "Keta, Volta Region",
    category: "Cultural",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80",
    description: "An annual coastal festival celebrating the rich heritage of the Anlo people with regatta, beach activities, traditional music, and seafood feasts along the Atlantic coast.",
  },
  {
    id: "ev-volta-marathon",
    title: "Volta River Marathon",
    date: "March 2027",
    location: "Ho, Volta Region",
    category: "Adventure",
    image: "https://images.unsplash.com/photo-1513593771513-7b58b6c4af38?w=600&q=80",
    description: "A scenic marathon along the banks of the Volta River, attracting runners from across West Africa. Multiple race categories from 5K fun run to full marathon distance.",
  },
  {
    id: "ev-jazz-fest",
    title: "Volta Jazz & Arts Festival",
    date: "December 2026",
    location: "Sogakope, Volta Region",
    category: "Music",
    image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=600&q=80",
    description: "A three-day celebration of jazz, African rhythms, and visual arts set against the serene backdrop of the Volta River. Features international and local artists.",
  },
  {
    id: "ev-food-fair",
    title: "Volta Food & Culture Fair",
    date: "September 2026",
    location: "Ho, Volta Region",
    category: "Food",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80",
    description: "A gastronomic celebration showcasing the diverse flavors of the Volta Region — from banku and tilapia to akple and crab stew, with cooking demonstrations and food competitions.",
  },
];

// ---- STORIES ----
export const stories: Story[] = [
  {
    id: "st-1",
    title: "The Sacred Monkeys of Tafi Atome: A Conservation Success Story",
    category: "Wildlife",
    image: "https://images.unsplash.com/photo-1549366021-9f761d450615?w=600&q=80",
    excerpt: "How a small community in the Volta Region turned a sacred grove into one of Ghana's most beloved eco-tourism destinations, protecting Mona monkeys for generations.",
    readingTime: "8 min read",
    author: "Kofi Mensah",
    date: "Jul 15, 2026",
  },
  {
    id: "st-2",
    title: "Chasing Waterfalls: A Complete Guide to Volta Region's Cascading Wonders",
    category: "Adventure",
    image: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=600&q=80",
    excerpt: "From the majestic Wli Falls to the hidden gem of Tagbo, discover every waterfall worth visiting in the Volta Region with our comprehensive guide.",
    readingTime: "12 min read",
    author: "Ama Dzokoto",
    date: "Jul 10, 2026",
  },
  {
    id: "st-3",
    title: "Kente: The Fabric of Kings and the Artisans Who Keep It Alive",
    category: "Culture",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&q=80",
    excerpt: "In the villages around Agortime-Kpetoe, master weavers continue a centuries-old tradition, creating the iconic Kente cloth that carries deep cultural symbolism.",
    readingTime: "10 min read",
    author: "Selorm Agbeko",
    date: "Jul 5, 2026",
  },
  {
    id: "st-4",
    title: "Hidden Beaches of the Volta Coast: Beyond Keta",
    category: "Coastal",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80",
    excerpt: "While Keta Beach gets the spotlight, the Volta coastline harbors secret coves, fishing villages, and untouched stretches of sand waiting to be explored.",
    readingTime: "7 min read",
    author: "Emefa Adzovor",
    date: "Jun 28, 2026",
  },
  {
    id: "st-5",
    title: "The Ewe Culinary Journey: Flavors That Tell Stories",
    category: "Food",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80",
    excerpt: "Every dish in the Volta Region tells a story of heritage, community, and the rich agricultural bounty of this extraordinary land. Explore the flavors that define Ewe cuisine.",
    readingTime: "9 min read",
    author: "Kofi Mensah",
    date: "Jun 20, 2026",
  },
  {
    id: "st-6",
    title: "Festival Season in Volta: A Photographer's Guide",
    category: "Photography",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&q=80",
    excerpt: "Capture the vibrant colors, emotions, and energy of Volta Region festivals with expert tips on timing, positioning, and cultural sensitivity.",
    readingTime: "11 min read",
    author: "Ama Dzokoto",
    date: "Jun 15, 2026",
  },
];

// ---- INVESTMENTS ----
export const investments: Investment[] = [
  {
    id: "inv-1",
    title: "Eco-Lodge Development at Wli Falls",
    sector: "Hospitality",
    capital: "$250,000 - $500,000",
    returns: "18-25% ROI",
    location: "Hohoe Municipality",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80",
    description: "Develop a 20-room eco-lodge near Wli Waterfalls with sustainable design, restaurant, spa, and guided tour services. High tourist footfall area with growing international demand.",
  },
  {
    id: "inv-2",
    title: "Lake Volta Cruise & Tourism Hub",
    sector: "Transport",
    capital: "$500,000 - $1,000,000",
    returns: "15-22% ROI",
    location: "Akpafu & Kpando",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&q=80",
    description: "Establish a luxury cruise operation on Lake Volta with multiple vessels, waterfront restaurant, and recreational facilities targeting both domestic and international tourists.",
  },
  {
    id: "inv-3",
    title: "Volta Cultural Village & Craft Center",
    sector: "Eco Tourism",
    capital: "$150,000 - $300,000",
    returns: "12-18% ROI",
    location: "Ho Municipality",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&q=80",
    description: "Create a living cultural village showcasing Ewe traditions, Kente weaving, pottery, music, and dance. Includes artisan workshops, performance arena, and retail outlets.",
  },
  {
    id: "inv-4",
    title: "Digital Tourism Platform & Smart Park System",
    sector: "Digital Tourism",
    capital: "$100,000 - $200,000",
    returns: "20-30% ROI",
    location: "Region-wide",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80",
    description: "Build a comprehensive digital tourism infrastructure including smart ticketing, AR-enabled tour guides, visitor analytics, and an integrated booking platform.",
  },
];

// ---- COMMUNITIES ----
export const communities: Community[] = [
  {
    id: "com-1",
    name: "Tafi Atome",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
    description: "A pioneering eco-tourism community known for its sacred Mona monkey sanctuary and successful community-based conservation model.",
    culture: "The people of Tafi Atome believe the monkeys are sacred and have protected them for over 200 years. The community has transformed this spiritual connection into a thriving eco-tourism enterprise.",
    products: ["Handwoven baskets", "Organic honey", "Cocoa products", "Traditional beads"],
    population: "~3,500",
  },
  {
    id: "com-2",
    name: "Agortime-Kpetoe",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&q=80",
    description: "The ancestral home of Ewe Kente weaving, where master artisans continue a centuries-old textile tradition that has become globally iconic.",
    culture: "Kente weaving in Agortime dates back centuries, with each pattern carrying deep philosophical meanings. The craft is passed through generations, with children learning on miniature looms.",
    products: ["Kente cloth", "Kente accessories", "Cotton yarn", "Traditional garments"],
    population: "~8,000",
  },
  {
    id: "com-3",
    name: "Liati Wote",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80",
    description: "A gateway village to Mount Afadja and Tagbo Falls, offering homestays and guided treks through some of Ghana's most stunning mountain landscapes.",
    culture: "Liati Wote sits at the foot of Ghana's highest peak. The community has embraced tourism while maintaining their traditional farming practices and cultural ceremonies.",
    products: ["Mountain coffee", "Organic vegetables", "Herbal medicine", "Carved walking sticks"],
    population: "~2,800",
  },
];

// ---- BUSINESSES ----
export const businesses: Business[] = [
  {
    id: "biz-1",
    name: "Wli Falls Heights Lodge",
    category: "Hotel",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80",
    location: "Wli, Hohoe",
    rating: 4.7,
    verified: true,
    contact: "+233 24 123 4567",
  },
  {
    id: "biz-2",
    name: "Volta Serenity Hotel",
    category: "Hotel",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&q=80",
    location: "Ho, Volta Region",
    rating: 4.6,
    verified: true,
    contact: "+233 20 987 6543",
  },
  {
    id: "biz-3",
    name: "Keta Coastal Resort",
    category: "Hotel",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80",
    location: "Keta, Volta Region",
    rating: 4.5,
    verified: true,
    contact: "+233 24 555 1234",
  },
  {
    id: "biz-4",
    name: "Mama's Kitchen",
    category: "Restaurant",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80",
    location: "Ho, Volta Region",
    rating: 4.8,
    verified: true,
    contact: "+233 50 333 7890",
  },
  {
    id: "biz-5",
    name: "Volta Explorer Tours",
    category: "Tour Company",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&q=80",
    location: "Ho, Volta Region",
    rating: 4.9,
    verified: true,
    contact: "+233 20 444 5678",
  },
  {
    id: "biz-6",
    name: "Kente Heritage Gallery",
    category: "Shopping",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80",
    location: "Kpetoe, Volta Region",
    rating: 4.7,
    verified: false,
    contact: "+233 24 666 9012",
  },
];

// ---- HERO SLIDES ----
export const heroSlides = [
  {
    image: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=1920&q=80",
    alt: "Wli Waterfalls cascading through lush tropical forest",
  },
  {
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=80",
    alt: "Mount Afadja towering above the clouds",
  },
  {
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80",
    alt: "Pristine golden sand beach at sunset",
  },
  {
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80",
    alt: "Lush tropical forest canopy",
  },
  {
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1920&q=80",
    alt: "Traditional cultural festival celebration",
  },
  {
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&q=80",
    alt: "Local cuisine and culinary delights",
  },
];

// ---- STATS ----
export const stats = [
  { value: "50+", label: "Tourist Destinations" },
  { value: "25K+", label: "Annual Visitors" },
  { value: "200+", label: "Tourism Businesses" },
  { value: "15+", label: "Cultural Festivals" },
  { value: "8", label: "Municipalities" },
  { value: "100+", label: "Community Projects" },
];

// ---- SEARCH CATEGORIES ----
export const searchCategories = [
  "Destination",
  "Hotel",
  "Restaurant",
  "Festival",
  "Adventure",
  "Waterfall",
  "Beach",
  "Community",
  "Wildlife",
  "Transport",
  "Guide",
  "Investment",
];

// ---- TRAVEL STYLES ----
export const travelStyles = [
  { id: "family", label: "Family", icon: "Users", description: "Kid-friendly activities and family bonding" },
  { id: "adventure", label: "Adventure", icon: "Compass", description: "Thrilling outdoor experiences" },
  { id: "luxury", label: "Luxury", icon: "Crown", description: "Premium comfort and exclusivity" },
  { id: "photography", label: "Photography", icon: "Camera", description: "Stunning landscapes and culture" },
  { id: "culture", label: "Culture", icon: "Landmark", description: "Heritage, festivals, and traditions" },
  { id: "nature", label: "Nature", icon: "Trees", description: "Forests, waterfalls, and wildlife" },
];

// ---- TRIP PLAN GENERATOR ----
export function generateTripPlan(days: number, budget: string, interests: string[], style: string): TripPlan {
  const destinationPool = destinations.filter(
    (d) => interests.length === 0 || interests.some((i) => d.category.toLowerCase().includes(i.toLowerCase()))
  );

  const dayPlans: DayPlan[] = [];
  const usedDestinations = new Set<string>();

  for (let i = 0; i < days; i++) {
    const dayNum = i + 1;
    const availableDest = destinationPool.filter((d) => !usedDestinations.has(d.id));
    const dest = availableDest.length > 0
      ? availableDest[i % availableDest.length]
      : destinationPool[i % destinationPool.length];

    if (dest) usedDestinations.add(dest.id);

    const costLevel = budget === "luxury" ? "$$$$" : budget === "moderate" ? "$$" : "$";
    const mealCost = budget === "luxury" ? "$$$" : budget === "moderate" ? "$$" : "$";

    dayPlans.push({
      day: dayNum,
      title: dayNum === 1 ? "Arrival & First Impressions" : dayNum === days ? "Farewell & Departure" : `Exploring Day ${dayNum}`,
      activities: [
        {
          time: "7:00 AM",
          activity: "Breakfast at local restaurant",
          location: dest ? `${dest.municipality}` : "Ho",
          cost: mealCost,
        },
        {
          time: "9:00 AM",
          activity: `Visit ${dest ? dest.name : "Volta Lake"} and explore`,
          location: dest ? dest.name : "Lake Volta",
          cost: costLevel,
        },
        {
          time: "1:00 PM",
          activity: "Lunch with local cuisine",
          location: dest ? dest.municipality : "Ho",
          cost: mealCost,
        },
        {
          time: "3:00 PM",
          activity: dayNum <= 2
            ? "Guided community tour & cultural immersion"
            : dayNum === days
              ? "Souvenir shopping & departure preparations"
              : `Adventure activity near ${dest ? dest.name : "the site"}`,
          location: dest ? dest.municipality : "Volta Region",
          cost: costLevel,
        },
        {
          time: "7:00 PM",
          activity: "Dinner & evening relaxation",
          location: dest ? dest.municipality : "Ho",
          cost: mealCost,
        },
      ],
    });
  }

  return { days, budget, interests, style, itinerary: dayPlans };
}

// ---- MAP CATEGORIES ----
export const mapCategories = [
  { id: "hotels", label: "Hotels", icon: "Hotel" },
  { id: "restaurants", label: "Restaurants", icon: "UtensilsCrossed" },
  { id: "sites", label: "Tourist Sites", icon: "MapPin" },
  { id: "hospitals", label: "Hospitals", icon: "Plus" },
  { id: "fuel", label: "Fuel Stations", icon: "Fuel" },
  { id: "events", label: "Events", icon: "Calendar" },
  { id: "operators", label: "Tour Operators", icon: "Compass" },
  { id: "transport", label: "Transport", icon: "Bus" },
];
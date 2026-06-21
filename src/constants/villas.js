export const VILLAS_DATA = [
  {
    id: "villa-merak",
    name: "Voyageur — Villa Merak",
    location: "Sanur",
    price: "Rp 4.250.000",
    period: "night",
    beds: 3,
    baths: 3,
    size: "350 sqm",
    image:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80",
    features: ["Private Pool", "Beachside", "Fully Staffed"],
    address: "Jalan Danau Tamblingan, Sanur, Bali 80228",
    nearby: [
      { label: "Sanur Beach Walk", time: "4 minutes walk" },
      { label: "Sanur Harbour", time: "10 minutes drive" },
      { label: "Ngurah Rai Airport", time: "35 minutes drive" },
    ],
    coords: { lat: -8.6925, lng: 115.2625 },
    rooms: [
      {
        id: "deluxe-suite",
        name: "Deluxe Suite Room",
        price: "Rp 2.500.000",
        guests: 2,
        beds: 1,
        baths: 1,
        size: "65 m²",
        tags: ["Breakfast Incl.", "Suitable for Family", "Daily Cleaning"],
        image:
          "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1400&q=80",
          "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1400&q=80",
          "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1400&q=80",
        ],
        bedConfig: "1 King Bed",
        description:
          "Tucked beneath a canopy of frangipani trees, the Deluxe Suite pairs a tailored minimalist interior with warm Balinese timber accents. Floor-to-ceiling glass opens onto a private veranda, framing the lagoon pool and gardens beyond — designed for travellers who want quiet comfort within easy reach of the main pavilion.",
      },
      {
        id: "ocean-view",
        name: "Ocean View Master Bedroom",
        price: "Rp 3.800.000",
        guests: 2,
        beds: 1,
        baths: 1,
        size: "90 m²",
        tags: ["Ocean View", "Jacuzzi", "Breakfast Incl."],
        image:
          "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1400&q=80",
          "https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=1400&q=80",
          "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1400&q=80",
        ],
        bedConfig: "1 King Bed",
        description:
          "Wake to an unbroken line of horizon. The Ocean View Master sits at the villa's prow, with a sunken outdoor jacuzzi positioned to catch both sunrise and the evening breeze off the Sanur strait — the most requested room in the estate for good reason.",
      },
      {
        id: "merak-garden-pavilion",
        name: "Merak Sanctuary Garden Pavilion",
        price: "Rp 2.900.000",
        guests: 3,
        beds: 2,
        baths: 1,
        size: "80 m²",
        tags: ["Garden View", "Private Terrace", "Quite Area"],
        image:
          "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1400&q=80",
          "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1400&q=80",
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1400&q=80",
        ],
        bedConfig: "2 Queen Beds",
        description:
          "Set apart from the main house and wrapped in tropical planting, this pavilion is the villa's quietest corner — ideal for families who want their own terrace, their own rhythm, and a few extra steps of privacy from the main pool deck.",
      },
    ],
  },
  {
    id: "the-zen-sanur",
    name: "The Zen Sanur",
    location: "Sanur",
    price: "Rp 3.800.000",
    period: "night",
    beds: 2,
    baths: 2,
    size: "280 sqm",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    features: ["Tropical Garden", "Jacuzzi", "Security 24/7"],
    address: "Jalan Mertasari, Sanur, Bali 80227",
    nearby: [
      { label: "Mertasari Beach", time: "6 minutes walk" },
      { label: "Sanur Night Market", time: "8 minutes drive" },
      { label: "Ngurah Rai Airport", time: "30 minutes drive" },
    ],
    coords: { lat: -8.7066, lng: 115.2654 },
    rooms: [
      {
        id: "garden-villa-room",
        name: "Garden Pavilion Suite",
        price: "Rp 2.100.000",
        guests: 2,
        beds: 1,
        baths: 1,
        size: "55 m²",
        tags: ["Breakfast Incl.", "Close to Beach", "Daily Cleaning"],
        image:
          "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1400&q=80",
          "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1400&q=80",
        ],
        bedConfig: "1 King Bed",
        description:
          "A compact, sun-filled suite opening directly onto the tropical garden. Soft linen tones and rattan furnishings keep the room cool and unfussy — close enough to the beach path to hear the morning tide.",
      },
      {
        id: "zen-loft-master",
        name: "Zen Minimalist Loft Master",
        price: "Rp 3.200.000",
        guests: 2,
        beds: 1,
        baths: 1,
        size: "85 m²",
        tags: ["High Ceiling", "Quite Area", "Daily Cleaning"],
        image:
          "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1400&q=80",
          "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1400&q=80",
        ],
        bedConfig: "1 King Bed",
        description:
          "Double-height ceilings and a single skylight give this loft an unusually calm, airy quality. Furnishings are kept deliberately spare — a study in restraint for guests who find quiet more luxurious than ornament.",
      },
    ],
  },
  {
    id: "villa-raj",
    name: "Voyageur — Villa Raj",
    location: "Sanur",
    price: "Rp 5.100.000",
    period: "night",
    beds: 4,
    baths: 4,
    size: "500 sqm",
    image:
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
    features: ["Modern Luxury", "Chef Available", "Ocean View"],
    address: "Jalan Pantai Karang, Sanur, Bali 80228",
    nearby: [
      { label: "Karang Beach", time: "3 minutes walk" },
      { label: "Sanur Harbour", time: "7 minutes drive" },
      { label: "Ngurah Rai Airport", time: "32 minutes drive" },
    ],
    coords: { lat: -8.6889, lng: 115.262 },
    rooms: [
      {
        id: "royal-penthouse",
        name: "Royal Penthouse Suite",
        price: "Rp 4.500.000",
        guests: 4,
        beds: 2,
        baths: 2,
        size: "140 m²",
        tags: ["Panoramic View", "Private Lounge", "Breakfast Incl."],
        image:
          "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1400&q=80",
          "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1400&q=80",
          "https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=1400&q=80",
        ],
        bedConfig: "2 King Beds",
        description:
          "The villa's crown — a top-floor suite with a private lounge and uninterrupted views over Sanur's rooftops to the strait beyond. Built for guests travelling in twos who want the run of their own floor.",
      },
      {
        id: "raj-pool-cabana",
        name: "Raj Private Pool Cabana",
        price: "Rp 3.900.000",
        guests: 2,
        beds: 1,
        baths: 1,
        size: "75 m²",
        tags: ["Pool Access", "Suitable for Couple", "Daily Cleaning"],
        image:
          "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1400&q=80",
          "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1400&q=80",
        ],
        bedConfig: "1 King Bed",
        description:
          "Steps from the water's edge, this cabana-style room opens directly onto the pool deck through a wide sliding glass wall — built for guests who want to wake up and walk straight into the water.",
      },
      {
        id: "raj-heritage-wing",
        name: "Heritage Wing Studio",
        price: "Rp 2.750.000",
        guests: 2,
        beds: 1,
        baths: 1,
        size: "60 m²",
        tags: ["Authentic Design", "Quite Area", "Breakfast Incl."],
        image:
          "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=80",
          "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1400&q=80",
        ],
        bedConfig: "1 Queen Bed",
        description:
          "Original timber joinery and hand-laid terracotta floors are kept intact in this studio at the villa's original heritage wing — a smaller, quieter room for guests drawn to authenticity over scale.",
      },
    ],
  },
  {
    id: "villa-asana",
    name: "Asana Villa",
    location: "Ubud",
    price: "Rp 6.400.000",
    period: "night",
    beds: 3,
    baths: 3,
    size: "420 sqm",
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
    features: ["Jungle View", "Infinity Pool", "Tranquil Location"],
    address: "Jalan Raya Sayan, Ubud, Bali 80571",
    nearby: [
      { label: "Sayan Ridge Walk", time: "5 minutes walk" },
      { label: "Ubud Centre", time: "12 minutes drive" },
      { label: "Ngurah Rai Airport", time: "55 minutes drive" },
    ],
    coords: { lat: -8.5188, lng: 115.2425 },
    rooms: [
      {
        id: "jungle-pool-suite",
        name: "Jungle Pool Suite",
        price: "Rp 4.100.000",
        guests: 2,
        beds: 1,
        baths: 1,
        size: "95 m²",
        tags: ["Valley View", "Private Plunge Pool", "Breakfast Incl."],
        image:
          "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1400&q=80",
          "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1400&q=80",
        ],
        bedConfig: "1 King Bed",
        description:
          "Cantilevered over the Ayung valley with a private plunge pool, this suite puts the jungle canopy at eye level. Glass walls fold fully open, blurring the line between room and rainforest.",
      },
      {
        id: "canopy-canvas-studio",
        name: "Canopy Elevated Canvas Studio",
        price: "Rp 3.500.000",
        guests: 2,
        beds: 1,
        baths: 1,
        size: "70 m²",
        tags: ["Forest View", "Balcony", "Quite Area"],
        image:
          "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1400&q=80",
          "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1400&q=80",
        ],
        bedConfig: "1 King Bed",
        description:
          "Raised on stilts among the treeline, this studio's balcony hangs directly over the forest floor — mornings here come with mist and birdsong rather than traffic.",
      },
    ],
  },
  {
    id: "villa-amarta",
    name: "Amarta Sanctuary Villa",
    location: "Ubud",
    price: "Rp 7.200.000",
    period: "night",
    beds: 5,
    baths: 5,
    size: "610 sqm",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    features: ["Private Gorge View", "Wellness Pavilion", "Wine Cellar"],
    address: "Jalan Penestanan Kelod, Ubud, Bali 80571",
    nearby: [
      { label: "Tjampuhan Ridge Walk", time: "8 minutes walk" },
      { label: "Ubud Centre", time: "15 minutes drive" },
      { label: "Ngurah Rai Airport", time: "60 minutes drive" },
    ],
    coords: { lat: -8.5069, lng: 115.254 },
    rooms: [
      {
        id: "amarta-presidential",
        name: "Amarta Presidential Ridge Suite",
        price: "Rp 5.500.000",
        guests: 4,
        beds: 2,
        baths: 2,
        size: "180 m²",
        tags: ["Best Ridge View", "Private Jacuzzi", "VIP Service"],
        image:
          "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1400&q=80",
          "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1400&q=80",
        ],
        bedConfig: "2 King Beds",
        description:
          "Amarta's signature suite commands the full length of the gorge, with a private jacuzzi positioned on the ridge edge and dedicated butler service throughout the stay.",
      },
      {
        id: "gorge-view-pavilion",
        name: "River Gorge View Pavilion",
        price: "Rp 4.800.000",
        guests: 2,
        beds: 1,
        baths: 1,
        size: "110 m²",
        tags: ["River View", "Sound of Nature", "Breakfast Incl."],
        image:
          "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=1400&q=80",
          "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1400&q=80",
        ],
        bedConfig: "1 King Bed",
        description:
          "Positioned directly above the river gorge, this pavilion trades wall space for glass — the sound of moving water is constant, day and night.",
      },
      {
        id: "amarta-wellness-suite",
        name: "Zen Wellness Spa Suite",
        price: "Rp 3.950.000",
        guests: 2,
        beds: 1,
        baths: 1,
        size: "85 m²",
        tags: ["Semi-outdoor Bath", "Yoga Space", "Daily Cleaning"],
        image:
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1400&q=80",
          "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1400&q=80",
        ],
        bedConfig: "1 Queen Bed",
        description:
          "Built around a semi-outdoor stone bath and a private yoga deck, this suite is the villa's wellness retreat within a retreat.",
      },
    ],
  },
];

export const LOCATIONS = [
  "All Locations",
  "Sanur",
  "Ubud",
  "Seminyak",
  "Canggu",
];
export const TYPES = ["All Types", "Villa", "Resort", "Apartment"];

// ── Shared defaults for room detail pages ──────────────────────────────
// Used when a specific villa/room hasn't overridden these fields yet.
export const DEFAULT_AMENITIES = [
  { label: "Private Pool Access", icon: "pool" },
  { label: "Kitchenette", icon: "kitchen" },
  { label: "Wardrobe", icon: "wardrobe" },
  { label: "Slippers", icon: "slippers" },
  { label: "Smart TV", icon: "tv" },
  { label: "WiFi", icon: "wifi" },
  { label: "Fire Extinguisher", icon: "extinguisher" },
  { label: "First Aid Kit", icon: "firstaid" },
];

export const DEFAULT_RULES = {
  villaRules: [
    "Check-in from 14:00 to 22:00",
    "Check-out from 08:00 to 12:00",
    "No age limit",
    "Children & bed policy applied",
  ],
  safety: [
    "No smoking allowed in the room",
    "No loud noises between 22:00 and 07:00",
    "Pets are not allowed without prior notification",
  ],
  cancellation: [
    "Reschedule allowed, only for urgent circumstances",
    "Supporting document is required",
    "This rate is non-refundable",
  ],
};

export const DEFAULT_REVIEWS = [
  {
    name: "Andy P.",
    origin: "Indonesia",
    rating: 5.0,
    text: "It was an enjoyable stay and we'd love to return again in the future. Leisure in the villa to enjoy the serenity, and the staff was very helpful and professional to attend our needs.",
  },
  {
    name: "Marcela",
    origin: "Uruguay",
    rating: 5.0,
    text: "If you are looking for something tropical and hidden, out of the hustle and bustle, this is it. Friendly staff, comfy beds, and the breakfast was a holiday highlight on its own.",
  },
  {
    name: "Anthony",
    origin: "Australia",
    rating: 5.0,
    text: "Staff were excellent throughout. Everything was exactly as described, and the housekeeping team kept the room immaculate every single day.",
  },
  {
    name: "Jen",
    origin: "Australia",
    rating: 5.0,
    text: "We stayed four nights relaxing, enjoying the climate, and being in one spot. Didn't need to leave the property at all — it was a 10/10 for us.",
  },
];

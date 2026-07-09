export const DEFAULT_AMENITY_DETAILS = [
  {
    category: { id: "Area Tamu", en: "Living Area" },
    items: [
      {
        label: { id: "Kolam Renang", en: "Pool" },
        icon: "pool",
        note: { id: "13 m x 3 m", en: "13 m x 3 m" },
      },
      { label: { id: "Dapur", en: "Kitchen" }, icon: "kitchen" },
    ],
  },
  {
    category: { id: "Fasilitas Dalam Kamar", en: "In Room Amenities" },
    subgroups: [
      {
        title: { id: "Kebutuhan Dasar", en: "Essentials" },
        items: [
          {
            label: {
              id: "Sampo, Handuk, Kondisioner, Sabun Mandi",
              en: "Shampoo, Towels, Conditioner, Shower Gel",
            },
            icon: "bath",
          },
          { label: { id: "Lemari Pakaian", en: "Wardrobe" }, icon: "wardrobe" },
          { label: { id: "Sandal", en: "Slippers" }, icon: "slippers" },
          {
            label: { id: "Pengering Rambut", en: "Hairdryer" },
            icon: "hairdryer",
          },
        ],
      },
      {
        title: { id: "Hiburan & Keluarga", en: "Entertainment & Family" },
        items: [
          {
            label: { id: "Smart TV", en: "Smart TV" },
            icon: "tv",
            note: { id: "TV 65 inci", en: "65-inch TV" },
          },
          { label: { id: "WiFi", en: "WiFi" }, icon: "wifi" },
        ],
      },
      {
        title: { id: "Keamanan", en: "Safety" },
        items: [
          {
            label: { id: "Alat Pemadam Api", en: "Fire Extinguisher" },
            icon: "extinguisher",
          },
          { label: { id: "Kotak P3K", en: "First Aid Kit" }, icon: "firstaid" },
          { label: { id: "Brankas", en: "Safety Box" }, icon: "safetybox" },
        ],
      },
    ],
  },
  {
    category: { id: "Transportasi & Parkir", en: "Transport & Parking" },
    items: [
      {
        label: { id: "Area Parkir Outdoor", en: "Outdoors Parking Space" },
        icon: "parking",
        note: {
          id: "Tersedia untuk maksimal 1 mobil",
          en: "available for max. 1 car",
        },
      },
      {
        label: { id: "Penjemputan Bandara", en: "Airport Pick Up" },
        icon: "airport",
        note: {
          id: "Dapat diatur dengan biaya tambahan",
          en: "Can be arranged with extra cost",
        },
      },
      {
        label: { id: "Transportasi Harian", en: "Daily Transport" },
        icon: "parking",
        note: {
          id: "1 mobil & sopir hingga 8 jam/hari dengan biaya tambahan",
          en: "1 car & driver for up to 8 hours /day with extra cost",
        },
      },
    ],
  },
  {
    category: {
      id: "Layanan & Fasilitas Tambahan",
      en: "Additional Service & Facilities",
    },
    items: [
      {
        label: { id: "Makan", en: "Dining" },
        icon: "dining",
        note: {
          id: "Tersedia dengan biaya tambahan (biaya layanan & bahan makanan)",
          en: "Available with an extra charge (Service fee & groceries)",
        },
      },
      {
        label: { id: "Koki", en: "Chef" },
        icon: "chef",
        note: {
          id: "Tersedia atas permintaan dengan biaya tambahan",
          en: "Available upon request at an extra cost",
        },
      },
      {
        label: { id: "Pijat", en: "Massage" },
        icon: "massage",
        note: {
          id: "Tersedia atas permintaan dengan biaya tambahan",
          en: "Available upon request at an extra cost",
        },
      },
      {
        label: { id: "Barbeku", en: "Barbeque" },
        icon: "bbq",
        note: {
          id: "Tersedia atas permintaan dengan biaya tambahan",
          en: "Available upon request at an extra cost",
        },
      },
      {
        label: { id: "Kursi Tinggi Bayi", en: "High Chair" },
        icon: "highchair",
        note: {
          id: "Tersedia atas permintaan dengan biaya tambahan",
          en: "Available upon request at an extra cost",
        },
      },
      {
        label: { id: "Tempat Tidur Bayi", en: "Baby Cot" },
        icon: "babycot",
        note: {
          id: "Tersedia atas permintaan dengan biaya tambahan",
          en: "Available upon request at an extra cost",
        },
      },
    ],
  },
];

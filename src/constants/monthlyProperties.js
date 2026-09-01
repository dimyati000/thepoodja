const MONTHLY_GALLERY_POOL = [
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=88",
  "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1800&q=88",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1800&q=88",
  "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1800&q=88",
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1800&q=88",
  "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1800&q=88",
  "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1800&q=88",
  "https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=1800&q=88",
  "https://images.unsplash.com/photo-1616137466211-f939a420be84?auto=format&fit=crop&w=1800&q=88",
  "https://images.unsplash.com/photo-1618221469555-7f3ad97540d6?auto=format&fit=crop&w=1800&q=88",
  "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=1800&q=88",
  "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?auto=format&fit=crop&w=1800&q=88",
  "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=1800&q=88",
  "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1800&q=88",
  "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?auto=format&fit=crop&w=1800&q=88",
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1800&q=88",
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1800&q=88",
  "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=1800&q=88",
];

const MONTHLY_GALLERY_OFFSETS = {
  "havana-canggu/type-a": 0,
  "havana-canggu/type-b": 2,
  "havana-canggu/type-c": 4,
  "havana-canggu/type-d": 6,
  "le-marva-ubud/villa-1": 8,
  "le-marva-ubud/villa-2": 10,
  "le-marva-canggu/akara": 12,
  "le-marva-canggu/alana": 14,
  "le-marva-canggu/amara": 16,
  "le-marva-canggu/anaya": 1,
};

function fallbackOffset(villaId, roomId) {
  return `${villaId}/${roomId}`
    .split("")
    .reduce((total, character) => total + character.charCodeAt(0), 0);
}

export function getMonthlyGallery(villaId, roomId, imageCount = 8) {
  const key = `${villaId}/${roomId}`;
  const offset = MONTHLY_GALLERY_OFFSETS[key] ?? fallbackOffset(villaId, roomId);

  return Array.from(
    { length: Math.min(imageCount, MONTHLY_GALLERY_POOL.length) },
    (_, index) =>
      MONTHLY_GALLERY_POOL[(offset + index) % MONTHLY_GALLERY_POOL.length],
  );
}

export function getMonthlyPrice(room) {
  return room.monthlyPrice ?? room.monthly_price ?? room.price * 30;
}

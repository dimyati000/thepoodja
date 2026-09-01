export function createOpenStreetMapEmbedUrl(lat, lng) {
  const latitude = Number(lat);
  const longitude = Number(lng);
  const safeLat = Number.isFinite(latitude) ? latitude : -8.6506;
  const safeLng = Number.isFinite(longitude) ? longitude : 115.1349;
  const bbox = [
    safeLng - 0.02,
    safeLat - 0.015,
    safeLng + 0.02,
    safeLat + 0.015,
  ].join(",");
  const params = new URLSearchParams({
    bbox,
    layer: "mapnik",
    marker: `${safeLat},${safeLng}`,
  });

  return `https://www.openstreetmap.org/export/embed.html?${params.toString()}`;
}

export function createGoogleMapsDirectionsUrl(lat, lng) {
  const params = new URLSearchParams({
    api: "1",
    query: `${lat},${lng}`,
  });

  return `https://www.google.com/maps/search/?${params.toString()}`;
}

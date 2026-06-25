export function LocationPanel({ villa, isDark }) {
  const borderColor = isDark ? "rgba(255,255,255,0.1)" : "rgba(1,20,52,0.1)";
  const accent = isDark ? "#FCD57B" : "#8B6B2E";
  const mutedText = isDark ? "text-neutral-400" : "text-neutral-500";

  const lat = villa.coords?.lat ?? -8.6905;
  const lng = villa.coords?.lng ?? 115.2625;
  const bbox = `${lng - 0.02},${lat - 0.015},${lng + 0.02},${lat + 0.015}`;
  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
      <div
        style={{ borderColor }}
        className="lg:col-span-7 border h-[320px] sm:h-[400px] overflow-hidden"
      >
        <iframe
          title={`Map of ${villa.name}`}
          src={mapSrc}
          className="w-full h-full grayscale-[15%]"
          loading="lazy"
        />
      </div>

      <div className="lg:col-span-5 flex flex-col justify-center">
        <span
          style={{ color: accent }}
          className="text-[10px] font-bold tracking-[0.4em] uppercase block mb-3"
        >
          Destination Guide
        </span>
        <h3
          style={{ fontFamily: "var(--font-cormorant-garamond)" }}
          className="text-2xl font-light tracking-wide mb-2"
        >
          {villa.location}, Bali
        </h3>
        {villa.address && (
          <p className={`text-xs font-light mb-6 ${mutedText}`}>
            {villa.address}
          </p>
        )}

        <ul className="space-y-3 mb-6">
          {(villa.nearby || []).map((n, i) => (
            <li
              key={i}
              className={`flex items-center justify-between text-xs sm:text-sm font-light pb-3 border-b ${isDark ? "text-neutral-300" : "text-neutral-600"}`}
              style={{ borderColor }}
            >
              <span>{n.label}</span>
              <span
                style={{ color: accent }}
                className="font-medium whitespace-nowrap pl-4"
              >
                {n.time}
              </span>
            </li>
          ))}
        </ul>

        <a
          href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: accent }}
          className="text-[10px] font-bold tracking-[0.3em] uppercase border-b w-fit pb-0.5"
        >
          Get Direction
        </a>
      </div>
    </div>
  );
}

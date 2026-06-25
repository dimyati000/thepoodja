const ICONS = {
  pool: (
    <path d="M2 17c1.5 1 3 1 4.5 0s3-1 4.5 0 3 1 4.5 0 3-1 4.5 0M2 12c1.5 1 3 1 4.5 0s3-1 4.5 0 3 1 4.5 0 3-1 4.5 0M7 5l3 3-3 3M12 5l3 3-3 3" />
  ),
  kitchen: (
    <path d="M4 3v18M4 3h6M4 9h6M16 3v7a2 2 0 002 2 2 2 0 002-2V3M18 12v9" />
  ),
  wardrobe: <path d="M4 3h16v18H4zM12 3v18M9 12h.01M15 12h.01" />,
  slippers: (
    <path d="M3 16c0-4 2-7 5-7s4 2 4 5v2H3zM12 16c0-4 2-7 5-7s4 2 4 5v2h-9z" />
  ),
  tv: <path d="M3 5h18v12H3zM8 21h8M12 17v4" />,
  wifi: (
    <path d="M2 8.5a16 16 0 0120 0M5 12a11 11 0 0114 0M8.5 15.5a6 6 0 017 0M12 19h.01" />
  ),
  extinguisher: (
    <path d="M10 2v3M8 5h6l-1 3H9zM9 8v13a1 1 0 001 1h4a1 1 0 001-1V8M6 11l3-1M19 6l-3 2" />
  ),
  firstaid: (
    <path d="M3 7h18v12H3zM12 11v6M9 14h6M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2" />
  ),
  terrace: <path d="M3 21h18M5 21V10l7-6 7 6v11M9 21v-6h6v6" />,
  ac: <path d="M3 8h18v4H3zM7 16l-1 4M12 16v4M17 16l1 4" />,
  default: (
    <path d="M12 2l2.4 7.2H22l-6 4.4 2.4 7.2L12 16.4 5.6 20.8 8 13.6 2 9.2h7.6z" />
  ),
};

function Icon({ name }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {ICONS[name] || ICONS.default}
    </svg>
  );
}

export function AmenityGrid({ amenities = [], isDark, columns = 4 }) {
  if (!amenities.length) return null;

  const colClass =
    columns === 3
      ? "sm:grid-cols-3"
      : columns === 2
        ? "sm:grid-cols-2"
        : "sm:grid-cols-4";

  return (
    <div className={`grid grid-cols-2 ${colClass} gap-x-6 gap-y-7`}>
      {amenities.map((item, i) => (
        <div key={i} className="flex items-center gap-3">
          <span style={{ color: isDark ? "#FCD57B" : "#8B6B2E" }}>
            <Icon name={item.icon} />
          </span>
          <span
            className={`text-xs sm:text-sm font-light tracking-wide ${
              isDark ? "text-neutral-200" : "text-neutral-700"
            }`}
          >
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}

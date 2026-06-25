export function ThingsToKnow({ rules, isDark }) {
  if (!rules) return null;
  const { villaRules = [], safety = [], cancellation = [] } = rules;
  const borderColor = isDark ? "rgba(255,255,255,0.1)" : "rgba(1,20,52,0.1)";
  const mutedText = isDark ? "text-neutral-400" : "text-neutral-500";
  const accent = isDark ? "#FCD57B" : "#8B6B2E";

  const columns = [
    { title: "Villa Rules", items: villaRules },
    { title: "Safety & Property", items: safety },
    { title: "Cancellation Policy", items: cancellation },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
      {columns.map((col) => (
        <div key={col.title}>
          <h4
            style={{ fontFamily: "var(--font-cormorant-garamond)" }}
            className="text-base font-semibold tracking-wide uppercase mb-4"
          >
            {col.title}
          </h4>
          <ul className="space-y-2.5 mb-4">
            {col.items.map((item, i) => (
              <li
                key={i}
                className={`text-xs font-light leading-relaxed flex gap-2.5 ${
                  isDark ? "text-neutral-300" : "text-neutral-600"
                }`}
              >
                <span style={{ color: accent }} className="mt-[2px]">
                  —
                </span>
                {item}
              </li>
            ))}
          </ul>
          <button
            style={{ color: accent, borderColor: accent }}
            className="text-[10px] font-bold tracking-[0.2em] uppercase border-b pb-0.5 bg-transparent border-t-0 border-l-0 border-r-0 px-0 cursor-pointer"
          >
            Read More
          </button>
        </div>
      ))}
    </div>
  );
}

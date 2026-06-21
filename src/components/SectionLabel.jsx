export function SectionLabel({
  children,
  isDark,
  align = "left",
  className = "",
}) {
  return (
    <span
      style={{ color: isDark ? "#FCD57B" : "#8B6B2E" }}
      className={`text-[10px] font-bold tracking-[0.4em] uppercase block ${
        align === "center" ? "text-center" : ""
      } ${className}`}
    >
      {children}
    </span>
  );
}

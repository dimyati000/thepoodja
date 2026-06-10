import Image from "next/image";

const navLinks = [
  { label: "Home", id: "home" },
  { label: "Properties", id: "properties" },
  { label: "Management Enquiry", id: "management-enquiry" },
  { label: "Yearly Offers", id: "yearly-offers" },
  { label: "Contact Us", id: "contact-us" },
];

const destinations = [
  "Seminyak",
  "Canggu",
  "Ubud & Beyond",
  "Sanur",
  "Nusa Dua",
];

export function Footer({ isDark }) {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  // Setelan warna latar belakang & teks adaptif
  const footerBg = isDark ? "#010e22" : "#ffffff";
  const titleColor = isDark ? "#FCD57B" : "#000000";
  const descColor = isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.6)";
  const linkColorClass = isDark
    ? "text-white/45 hover:text-white"
    : "text-black/50 hover:text-black";
  const labelColor = isDark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.35)";
  const valColor = isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.75)";

  return (
    <footer
      style={{
        backgroundColor: footerBg,
        transition: "background-color 0.4s ease",
        borderTop: isDark ? "none" : "1px solid rgba(0,0,0,0.06)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "72px 24px 48px",
          gap: "48px",
        }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
      >
        {/* Brand Column */}
        <div>
          {/* LOGO ADAPTIF UNTUK FOOTER */}
          <Image
            src={isDark ? "/logo-gold2.png" : "/logo-black2.png"}
            alt="The Poodja"
            width={400}
            height={176}
            priority
            unoptimized
            style={{ marginBottom: "20px", height: "auto", width: "150px" }}
          />
          <p
            style={{
              fontFamily: "'Nunito Sans', sans-serif",
              color: descColor,
              fontSize: "0.78rem",
              lineHeight: 1.8,
              fontWeight: 300,
              marginBottom: "24px",
            }}
          >
            Curating extraordinary luxury villa experiences across
            Indonesia&apos;s most beautiful destinations.
          </p>
          {/* Socials */}
          <div className="flex gap-2.5">
            {[
              {
                label: "Instagram",
                icon: (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                  </svg>
                ),
              },
              {
                label: "Facebook",
                icon: (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                ),
              },
              {
                label: "WhatsApp",
                icon: (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                ),
              },
            ].map((s) => (
              <button
                key={s.label}
                aria-label={s.label}
                style={{
                  width: "34px",
                  height: "34px",
                  border: isDark
                    ? "1px solid rgba(251,212,123,0.2)"
                    : "1px solid rgba(0,0,0,0.15)",
                  background: "transparent",
                  color: isDark ? "rgba(251,212,123,0.55)" : "#000000",
                  cursor: "pointer",
                }}
                className="flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none"
              >
                {s.icon}
              </button>
            ))}
          </div>
        </div>

        {/* Navigation Column */}
        <div>
          <h4
            style={{
              fontFamily: "'Nunito Sans', sans-serif",
              color: titleColor,
              fontSize: "9px",
              letterSpacing: "0.3em",
              fontWeight: 700,
              marginBottom: "20px",
              textTransform: "uppercase",
            }}
          >
            Navigation
          </h4>
          <ul className="list-none p-0 m-0 flex flex-col gap-3">
            {navLinks.map((l) => (
              <li key={l.label}>
                <button
                  onClick={() => scrollTo(l.id)}
                  style={{
                    fontFamily: "'Nunito Sans', sans-serif",
                    fontSize: "0.78rem",
                    fontWeight: 300,
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                  className={`p-0 transition-colors duration-300 focus:outline-none ${linkColorClass}`}
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Destinations Column */}
        <div>
          <h4
            style={{
              fontFamily: "'Nunito Sans', sans-serif",
              color: titleColor,
              fontSize: "9px",
              letterSpacing: "0.3em",
              fontWeight: 700,
              marginBottom: "20px",
              textTransform: "uppercase",
            }}
          >
            Destinations
          </h4>
          <ul className="list-none p-0 m-0 flex flex-col gap-3">
            {destinations.map((d) => (
              <li key={d}>
                <button
                  style={{
                    fontFamily: "'Nunito Sans', sans-serif",
                    fontSize: "0.78rem",
                    fontWeight: 300,
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                  className={`p-0 transition-colors duration-300 focus:outline-none ${linkColorClass}`}
                >
                  {d}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Column */}
        <div>
          <h4
            style={{
              fontFamily: "'Nunito Sans', sans-serif",
              color: titleColor,
              fontSize: "9px",
              letterSpacing: "0.3em",
              fontWeight: 700,
              marginBottom: "20px",
              textTransform: "uppercase",
            }}
          >
            Contact
          </h4>
          <div className="flex flex-col gap-4">
            {[
              {
                label: "Office",
                value: "Jl. Raya Seminyak No. 88\nKuta, Bali 80361",
              },
              { label: "WhatsApp", value: "+62 361 000 0000" },
              { label: "Email", value: "hello@thepoodja.com" },
            ].map((c) => (
              <div key={c.label}>
                <p
                  style={{
                    fontFamily: "'Nunito Sans', sans-serif",
                    color: labelColor,
                    fontSize: "8px",
                    letterSpacing: "0.2em",
                    fontWeight: 700,
                    marginBottom: "3px",
                    textTransform: "uppercase",
                  }}
                >
                  {c.label}
                </p>
                <p
                  style={{
                    fontFamily: "'Nunito Sans', sans-serif",
                    color: valColor,
                    fontSize: "0.76rem",
                    fontWeight: 300,
                    lineHeight: 1.6,
                    whiteSpace: "pre-line",
                  }}
                >
                  {c.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: isDark
            ? "1px solid rgba(255,255,255,0.05)"
            : "1px solid rgba(0,0,0,0.06)",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "20px 24px",
            gap: "12px",
          }}
          className="flex justify-between items-center flex-wrap"
        >
          <p
            style={{
              fontFamily: "'Nunito Sans', sans-serif",
              color: isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.3)",
              fontSize: "0.7rem",
              fontWeight: 300,
            }}
          >
            © 2026 The Poodja. All rights reserved.
          </p>
          <div className="flex gap-5">
            {["Privacy Policy", "Terms of Service"].map((l) => (
              <button
                key={l}
                style={{
                  fontFamily: "'Nunito Sans', sans-serif",
                  fontSize: "0.7rem",
                  fontWeight: 300,
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
                className={`p-0 transition-colors duration-300 focus:outline-none ${isDark ? "text-white/20 hover:text-white/60" : "text-black/30 hover:text-black/70"}`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

import Image from "next/image";
import { Icon } from "./Icon";

const navLinks = [
  { label: "Home", id: "home" },
  { label: "Properties", id: "properties" },
  { label: "Management Enquiry", id: "management-enquiry" },
  { label: "Monthly Offers", id: "monthly-offers" },
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

  const footerBg = isDark ? "#010e22" : "#ffffff";
  const titleColor = isDark ? "#FCD57B" : "#000000";
  const descColor = isDark ? "rgba(255, 255, 255, 0.80)" : "rgba(0,0,0,0.6)";
  const linkColorClass = isDark
    ? "text-white/80 hover:font-semibold"
    : "text-black/70 hover:font-semibold";
  const labelColor = isDark ? "rgba(255,255,255,0.90)" : "rgba(0,0,0,0.25)";
  const valColor = isDark ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,0.75)";

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
          maxWidth: "1380px",
        }}
        className="mx-auto pt-[72px] pb-12 px-6 gap-12 lg:gap-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
      >
        {/* Brand Column */}
        <div>
          {/* LOGO ADAPTIF UNTUK FOOTER */}
          <Image
            src={isDark ? "/logo-gold2.png" : "/logo-black2.png"}
            // src={"/logo-gold2.png"}
            alt="The Poodja"
            width={400}
            height={176}
            priority
            unoptimized
            style={{ marginBottom: "20px", height: "auto", width: "200px" }}
          />
          <p
            style={{
              color: descColor,
            }}
            className="text-sm md:text-base font-light leading-relaxed mb-6"
          >
            Curating extraordinary luxury villa experiences across
            Indonesia&apos;s most beautiful destinations.
          </p>
          {/* Socials */}
          <div className="flex gap-2.5">
            {[
              {
                label: "Instagram",
                icon: <Icon name="instagram" size={16} />,
              },
              {
                label: "Facebook",
                icon: <Icon name="facebook" size={16} />,
              },
              {
                label: "WhatsApp",
                icon: <Icon name="whatsapp" size={16} />,
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
                  color: isDark ? "rgba(251,212,123,0.85)" : "#000000",
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
              color: titleColor,
            }}
            className="text-[12px] md:text-xs font-bold uppercase mb-5 tracking-[0.3em]"
          >
            Navigation
          </h4>
          <ul className="list-none p-0 m-0 flex flex-col gap-3">
            {navLinks.map((l) => (
              <li key={l.label}>
                <button
                  onClick={() => scrollTo(l.id)}
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                  className={`text-sm font-light p-0 transition-colors duration-300 focus:outline-none ${linkColorClass}`}
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
              color: titleColor,
            }}
            className="text-[12px] md:text-xs font-bold uppercase mb-5 tracking-[0.3em]"
          >
            Destinations
          </h4>
          <ul className="list-none p-0 m-0 flex flex-col gap-3">
            {destinations.map((d) => (
              <li key={d}>
                <button
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                  className={`text-sm font-light p-0 transition-colors duration-300 focus:outline-none ${linkColorClass}`}
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
              color: titleColor,
            }}
            className="text-[12px] md:text-xs font-bold uppercase mb-5 tracking-[0.3em]"
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
                    color: labelColor,
                  }}
                  className="text-[10px] md:text-xs font-bold uppercase mb-1 tracking-[0.2em]"
                >
                  {c.label}
                </p>
                <p
                  style={{
                    color: valColor,
                  }}
                  className="text-sm md:text-md font-light leading-relaxed whitespace-pre-line"
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
            maxWidth: "1380px",
          }}
          className="mx-auto py-5 px-6 gap-3 flex justify-between items-center flex-wrap"
        >
          <p
            style={{
              color: isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.4)",
            }}
            className="text-xs font-light"
          >
            © 2026 The Poodja. All rights reserved.
          </p>
          <div className="flex gap-5">
            {["Privacy Policy", "Terms of Service"].map((l) => (
              <button
                key={l}
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
                className={`text-[12px] md:text-xs font-light p-0 transition-colors duration-300 focus:outline-none ${isDark ? "text-white/45 hover:text-white/70" : "text-black/40 hover:text-black/70"}`}
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

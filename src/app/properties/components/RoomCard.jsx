import Image from "next/image";
import Link from "next/link";

export function RoomCard({ room, villaId, isDark }) {
  return (
    <div
      className={`group flex flex-col justify-between overflow-hidden border transition-all duration-500 min-h-[480px] ${
        isDark
          ? "bg-[#00102A]/40 border-white/10 hover:border-white/20"
          : "bg-white border-[#011434]/10 shadow-sm hover:shadow-md"
      }`}
    >
      <div className="relative w-full h-[220px] overflow-hidden bg-neutral-900">
        <Image
          src={room.image}
          alt={room.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
        />
      </div>

      <div className="p-6 flex-1 flex flex-col justify-between">
        <div className="space-y-4">
          <h3 className="font-serif text-xl font-light tracking-wide leading-snug">
            {room.name}
          </h3>

          <div
            className={`flex items-center gap-3 text-xs font-light tracking-wide ${
              isDark ? "text-neutral-300" : "text-neutral-600"
            }`}
          >
            <span>{room.guests || 2} Guests</span>
            <span className="opacity-30">|</span>
            <span>{room.size || "—"}</span>
          </div>
        </div>

        <div
          className={`pt-5 mt-6 border-t flex items-center justify-between ${
            isDark ? "border-white/10" : "border-[#011434]/10"
          }`}
        >
          <div>
            <span
              className={`block text-[9px] tracking-widest uppercase mb-1 ${
                isDark ? "text-neutral-400" : "text-neutral-500"
              }`}
            >
              From
            </span>
            <p className="text-lg font-serif font-normal">
              {room.price}{" "}
              <span
                className={`text-xs font-sans font-light ${
                  isDark ? "text-neutral-400" : "text-neutral-500"
                }`}
              >
                / night
              </span>
            </p>
          </div>

          <Link
            href={`/properties/${villaId}/${room.id}`}
            className={`text-xs font-bold tracking-widest uppercase transition-colors duration-300 flex items-center gap-2 pb-0.5 border-b border-transparent ${
              isDark
                ? "text-[#FCD57B] hover:text-white hover:border-white"
                : "text-[#8B6B2E] hover:text-[#011434] hover:border-[#011434]"
            }`}
          >
            VIEW <span>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

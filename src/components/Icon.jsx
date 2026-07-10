"use client";
import {
  Waves,
  ChefHat,
  Shirt,
  Footprints,
  Tv,
  Wifi,
  FireExtinguisher,
  ShieldPlus,
  Wind,
  Users,
  BedDouble,
  Bath,
  Maximize,
  Sun,
  Flame,
  Wine,
  Coffee,
  Laptop,
  ParkingCircle,
  Sparkles,
  PersonStanding,
  Plane,
  UtensilsCrossed,
  Baby,
  Lock,
  Trees,
  Star,
  ChevronRight,
  ChevronLeft,
  X,
} from "lucide-react";

const ICON_MAP = {
  pool: Waves,
  jacuzzi: Waves,
  kitchen: ChefHat,
  wardrobe: Shirt,
  slippers: Footprints,
  tv: Tv,
  wifi: Wifi,
  extinguisher: FireExtinguisher,
  firstaid: ShieldPlus,
  safetybox: Lock,
  ac: Wind,
  hairdryer: Wind,
  terrace: Sun,
  deck: Sun,
  garden: Trees,
  bbq: Flame,
  minibar: Wine,
  breakfast: Coffee,
  coffee: Coffee,
  bath: Bath,
  workspace: Laptop,
  chef: ChefHat,
  parking: ParkingCircle,
  spa: Sparkles,
  massage: Sparkles,
  yoga: PersonStanding,
  cleaning: Sparkles,
  airport: Plane,
  dining: UtensilsCrossed,
  babycot: Baby,
  highchair: Baby,
  guests: Users,
  beds: BedDouble,
  baths: Bath,
  size: Maximize,
  chevronRight: ChevronRight,
  chevronLeft: ChevronLeft,
  close: X,
  default: Star,
};

export function Icon({
  name,
  size = 18,
  strokeWidth = 1.6,
  className = "",
  style,
}) {
  const LucideIcon = ICON_MAP[name] || ICON_MAP.default;
  return (
    <LucideIcon
      size={size}
      strokeWidth={strokeWidth}
      className={className}
      style={style}
    />
  );
}

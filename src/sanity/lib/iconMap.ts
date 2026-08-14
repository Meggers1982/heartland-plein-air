import { stegaClean } from "@sanity/client/stega";
import {
  Award,
  Crown,
  DollarSign,
  Eye,
  Gem,
  Heart,
  LayoutGrid,
  MapPin,
  Maximize2,
  Medal,
  Percent,
  Rows2,
  Ruler,
  ShoppingBag,
  Stamp,
  Star,
  Users,
  type LucideIcon,
} from "lucide-react";

export const ICON_MAP: Record<string, LucideIcon> = {
  DollarSign,
  Ruler,
  Stamp,
  Percent,
  Crown,
  Gem,
  Award,
  Medal,
  Star,
  Heart,
  Maximize2,
  Rows2,
  LayoutGrid,
  Users,
  MapPin,
  Eye,
  ShoppingBag,
};

// Icon names are content fields, so they carry invisible stega characters
// when Draft Mode + Visual Editing are active — clean before using as an
// object key, or the lookup silently misses and Icon renders undefined.
export function getIcon(iconName: string): LucideIcon {
  return ICON_MAP[stegaClean(iconName)];
}

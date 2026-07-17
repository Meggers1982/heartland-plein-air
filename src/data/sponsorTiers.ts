import { Crown, Gem, Award, Medal, Star, Heart } from "lucide-react";

export const sponsorTiers = [
  {
    name: "Titanium",
    price: "$5,000 and over",
    min: 5000,
    icon: Crown,
    benefits: [
      "Full-page ad in the festival catalog",
      "Logo on banners, ads, and website",
      "Three Collector's VIP Packages",
    ],
  },
  {
    name: "Platinum",
    price: "$2,500 to $4,999",
    min: 2500,
    icon: Gem,
    benefits: [
      "Full-page ad in the festival catalog",
      "Logo on banners, ads, and website",
      "Two Collector's VIP Packages",
    ],
  },
  {
    name: "Gold",
    price: "$1,000 to $2,499",
    min: 1000,
    icon: Award,
    benefits: [
      "Half-page ad in the festival catalog",
      "Logo on banners, ads, and website",
      "One Collector's VIP Package",
    ],
  },
  {
    name: "Silver",
    price: "$500 to $999",
    min: 500,
    icon: Medal,
    benefits: [
      "Quarter-page ad in the festival catalog",
      "Logo on website",
      "Name on banner",
    ],
  },
  {
    name: "Bronze",
    price: "$250 to $499",
    min: 250,
    icon: Star,
    benefits: [
      "Name listed in the festival catalog",
      "Name listed on website",
    ],
  },
  {
    name: "Friend of the District",
    price: "$100 to $249",
    min: 100,
    icon: Heart,
    benefits: ["Name listed on website"],
  },
];

import { Maximize2, Rows2, LayoutGrid } from "lucide-react";

export const adSizes = [
  {
    name: "Full Page Ad",
    price: "$300",
    icon: Maximize2,
    dimensions: "6\" x 6\" plus .125\" bleed on all sides",
  },
  {
    name: "Half Page Ad",
    price: "$200",
    icon: Rows2,
    dimensions: "Vertical: 2.8125\"w x 5.75\"h — or Horizontal: 5.75\"w x 2.8125\"h",
  },
  {
    name: "Quarter Page Ad",
    price: "$125",
    icon: LayoutGrid,
    dimensions: "2.8\" x 2.8\"",
  },
];

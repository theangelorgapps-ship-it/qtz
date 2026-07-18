export type Opportunity = {
  id: string;
  title: string;
  business: string;
  location: string;
  category: string;
  description: string;
  currentBid: number;
  guidePrice: string;
  bids: number;
  posted: string;
  duration: string;
  verified: boolean;
  featured?: boolean;
  urgent?: boolean;
  tags: string[];
};

export const opportunities: Opportunity[] = [
  {
    id: "after-hours-office-clean",
    title: "Friday evening office clean, up to 3 hours",
    business: "Clearline Cleaning Services",
    location: "Manchester, M1",
    category: "Cleaning",
    description:
      "One Friday cleaning slot for a small office. Clearline brings supplies and can start any time after 6pm.",
    currentBid: 185,
    guidePrice: "£160-£260",
    bids: 8,
    posted: "18 minutes ago",
    duration: "Every Friday · Up to 3 hours",
    verified: true,
    featured: true,
    tags: ["Commercial cleaning", "Recurring", "Evenings"],
  },
  {
    id: "restaurant-patio-refresh",
    title: "Patio pressure wash and furniture reset",
    business: "Northbank Exterior Care",
    location: "Liverpool, L1",
    category: "Outdoor services",
    description:
      "A one-day exterior care slot for a covered patio, including pressure washing, furniture reset and waste removal.",
    currentBid: 320,
    guidePrice: "£250-£450",
    bids: 13,
    posted: "42 minutes ago",
    duration: "One day · Before 10am",
    verified: true,
    urgent: true,
    tags: ["Pressure washing", "Waste removal", "Hospitality"],
  },
  {
    id: "salon-weekend-reception",
    title: "Weekend reception cover from an experienced host",
    business: "Marlow Staffing",
    location: "Leeds, LS1",
    category: "Hospitality",
    description:
      "An experienced host is available to welcome guests, manage appointments and keep reception running across a busy weekend.",
    currentBid: 240,
    guidePrice: "£180-£300",
    bids: 5,
    posted: "1 hour ago",
    duration: "Saturday and Sunday",
    verified: true,
    tags: ["Customer service", "Reception", "Weekend"],
  },
  {
    id: "retail-window-display",
    title: "Seasonal retail window installation",
    business: "Object & Form Installations",
    location: "Birmingham, B2",
    category: "Retail support",
    description:
      "A small installation team is available to unpack, assemble and fit a supplied window display before opening.",
    currentBid: 150,
    guidePrice: "£120-£220",
    bids: 3,
    posted: "2 hours ago",
    duration: "One morning · 4 hours",
    verified: false,
    tags: ["Merchandising", "Assembly", "Early morning"],
  },
];

export function getOpportunity(id: string) {
  return opportunities.find((opportunity) => opportunity.id === id);
}

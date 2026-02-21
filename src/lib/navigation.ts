export type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
};

// Left side of centered navbar: About, Buying, Selling
export const navLeft: NavItem[] = [
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Why Work With Me", href: "/about/why-work-with-me" },
      { label: "Oakwyn Realty", href: "/about/oakwyn-realty" },
    ],
  },
  {
    label: "Buying",
    href: "/buying",
    children: [
      { label: "Buyer's Guide", href: "/buying/guide" },
      { label: "Search Homes", href: "/buying/search" },
      { label: "Featured Listings", href: "/buying/featured-listings" },
    ],
  },
  {
    label: "Selling",
    href: "/selling",
    children: [
      { label: "Seller's Guide", href: "/selling/guide" },
      { label: "Home Valuation", href: "/selling/home-valuation" },
      { label: "Staging Tips", href: "/selling/staging-tips" },
    ],
  },
];

// Right side of centered navbar: Neighborhoods, Resources
export const navRight: NavItem[] = [
  {
    label: "Neighborhoods",
    href: "/neighborhoods",
    children: [
      { label: "Oakridge", href: "/neighborhoods/oakridge" },
      { label: "Marpole", href: "/neighborhoods/marpole" },
      { label: "South Cambie", href: "/neighborhoods/south-cambie" },
      { label: "Riley Park", href: "/neighborhoods/riley-park" },
      { label: "Cambie Corridor", href: "/neighborhoods/cambie-corridor" },
      { label: "Kerrisdale", href: "/neighborhoods/kerrisdale" },
      { label: "View All", href: "/neighborhoods" },
    ],
  },
  {
    label: "Resources",
    href: "/resources",
    children: [
      { label: "Blog", href: "/resources/blog" },
      { label: "Market Reports", href: "/resources/market-reports" },
      { label: "Mortgage Calculator", href: "/resources/mortgage-calculator" },
      { label: "First-Time Buyers", href: "/resources/first-time-buyers-bc" },
      { label: "Moving to Vancouver", href: "/resources/moving-to-vancouver" },
    ],
  },
];

// Combined for mobile menu
export const navigation: NavItem[] = [...navLeft, ...navRight];

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
      { label: "Kitsilano", href: "/neighborhoods/kitsilano" },
      { label: "UBC", href: "/neighborhoods/ubc" },
      { label: "Arbutus Ridge", href: "/neighborhoods/arbutus-ridge" },
      { label: "Dunbar-Southlands", href: "/neighborhoods/dunbar-southlands" },
      { label: "Shaughnessy", href: "/neighborhoods/shaughnessy" },
      { label: "West Point Grey", href: "/neighborhoods/west-point-grey" },
      { label: "Downtown", href: "/neighborhoods/downtown" },
      { label: "Fairview", href: "/neighborhoods/fairview" },
      { label: "West End", href: "/neighborhoods/west-end" },
      { label: "Mount Pleasant", href: "/neighborhoods/mount-pleasant" },
      { label: "Grandview-Woodland", href: "/neighborhoods/grandview-woodland" },
      { label: "Hastings-Sunrise", href: "/neighborhoods/hastings-sunrise" },
      { label: "Kensington-Cedar Cottage", href: "/neighborhoods/kensington-cedar-cottage" },
      { label: "Strathcona", href: "/neighborhoods/strathcona" },
      { label: "Killarney", href: "/neighborhoods/killarney" },
      { label: "Renfrew-Collingwood", href: "/neighborhoods/renfrew-collingwood" },
      { label: "Sunset", href: "/neighborhoods/sunset" },
      { label: "Victoria-Fraserview", href: "/neighborhoods/victoria-fraserview" },
      { label: "View All", href: "/neighborhoods" },
    ],
  },
  {
    label: "Resources",
    href: "/resources",
    children: [
      { label: "Blog", href: "/resources/blog" },
      { label: "Market Reports", href: "/resources/market-reports" },
      { label: "Real Estate Plan", href: "/resources/real-estate-plan" },
      { label: "Mortgage Calculator", href: "/resources/mortgage-calculator" },
    ],
  },
];

// Combined for mobile menu
export const navigation: NavItem[] = [...navLeft, ...navRight];

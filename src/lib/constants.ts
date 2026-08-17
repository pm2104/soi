export const NAV_LINKS = [
  { label: "Home", href: "#" },
  { label: "About Us", href: "#about" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Find Professionals", href: "#hire-Professionals" },
  { label: "Contact", href: "#contact" },
];

export const CATEGORIES = [
  { name: "Site Supervisor", icon: "HardHat", description: "Expert site oversight" },
  { name: "Civil Engineer", icon: "Building2", description: "Structural expertise" },
  { name: "Architect", icon: "PenTool", description: "Design & planning" },
  { name: "Interior Designer", icon: "Sofa", description: "Space transformation" },
  { name: "Project Manager", icon: "ClipboardList", description: "End-to-end management" },
  { name: "Quantity Surveyor", icon: "Calculator", description: "Cost estimation" },
  { name: "MEP Engineer", icon: "Zap", description: "Mechanical & electrical" },
  { name: "Consultant", icon: "MessageSquare", description: "Expert guidance" },
  { name: "3D Visualizer", icon: "Box", description: "Render & visualization" },
  { name: "Other", icon: "MoreHorizontal", description: "Specialized services" },
];

export const MEMBERSHIP_TIERS = [
  {
    name: "Visitor",
    badge: "Free",
    price: "Free",
    description: "Browse and explore the platform",
    features: [
      "Browse professionals",
      "View basic profiles",
      "Search by category",
      "Read reviews",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Registered Client",
    badge: "Popular",
    price: "Free",
    description: "Connect with verified professionals",
    features: [
      "Direct messaging",
      "Detailed profiles",
      "Project posting",
      "Priority support",
      "Verified badges",
    ],
    cta: "Register Now",
    highlighted: true,
  },
  {
    name: "Client Member",
    badge: "Premium",
    price: "Custom",
    description: "Full access to all platform features",
    features: [
      "All Registered features",
      "Dedicated account manager",
      "Contract assistance",
      "Priority matching",
      "Analytics dashboard",
      "API access",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: 1,
    title: "Create Account",
    description:
      "Sign up as a client or professional in under 2 minutes. Verify your identity for added trust.",
    icon: "UserPlus",
  },
  {
    step: 2,
    title: "Browse Professionals",
    description:
      "Explore verified profiles across 20+ construction categories. Filter by location, experience, and ratings.",
    icon: "Search",
  },
  {
    step: 3,
    title: "Start Building",
    description:
      "Connect directly, discuss your project, and begin construction with confidence and transparency.",
    icon: "Hammer",
  },
];

export const PROFESSIONALS = [
  {
    name: "Rajesh Kumar",
    role: "Civil Engineer",
    city: "Mumbai",
    experience: "12 Years",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    premium: true,
  },
  {
    name: "Priya Sharma",
    role: "Architect",
    city: "Bangalore",
    experience: "8 Years",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    premium: true,
  },
  {
    name: "Amit Patel",
    role: "Site Supervisor",
    city: "Ahmedabad",
    experience: "15 Years",
    avatar: "https://randomuser.me/api/portraits/men/67.jpg",
    premium: false,
  },
  {
    name: "Sneha Gupta",
    role: "Interior Designer",
    city: "Delhi",
    experience: "6 Years",
    avatar: "https://randomuser.me/api/portraits/women/28.jpg",
    premium: true,
  },
  {
    name: "Vikram Singh",
    role: "Project Manager",
    city: "Hyderabad",
    experience: "10 Years",
    avatar: "https://randomuser.me/api/portraits/men/85.jpg",
    premium: false,
  },
  {
    name: "Ananya Reddy",
    role: "3D Visualizer",
    city: "Chennai",
    experience: "5 Years",
    avatar: "https://randomuser.me/api/portraits/women/56.jpg",
    premium: true,
  },
];

export const FEATURES = [
  {
    title: "Verified Professionals",
    description:
      "Every professional is identity-verified and background-checked for your peace of mind.",
    icon: "ShieldCheck",
  },
  {
    title: "Construction Focused",
    description:
      "Built exclusively for the construction industry. No generic freelancers, only specialists.",
    icon: "Building2",
  },
  {
    title: "Free to Join",
    description:
      "No hidden fees for browsing or registration. Pay only when you hire with full transparency.",
    icon: "Gift",
  },
  {
    title: "24/7 Support",
    description:
      "Our dedicated team is available round the clock to assist with any queries or disputes.",
    icon: "Headphones",
  },
];

export const STATS = [
  { value: "Pan-India", label: "All 28 states & UTs covered from day one." },
  { value: "20+ Professions", label: "Supervisors, Engineers, Architects, PMs & more." },
  { value: "Verified Only", label: "Every profile reviewed before going live." },
  // { value: "1000", suffix: "+", label: "Projects Completed" },
];

export const FOOTER_LINKS = {
  company: [
    { label: "About Us", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Press", href: "#" },
  ],
  platform: [
    { label: "Home", href: "#" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Pricing", href: "#membership" },
    { label: "Professionals", href: "#professionals" },
    { label: "Categories", href: "#categories" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
    { label: "Disclaimer", href: "#" },
    { label: "Refund & Cancellation", href: "#" },
  ],
  social: [
    { label: "LinkedIn", href: "#" },
    { label: "Twitter", href: "#" },
    { label: "Instagram", href: "#" },
    { label: "Facebook", href: "#" },
  ],
};
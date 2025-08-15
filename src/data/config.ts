// Site configuration - Easy to update without touching code
export const siteConfig = {
  // Basic site info
  name: "Sinco",
  tagline: "The Adorable Squirrel Taking TikTok by Storm",
  description: "Meet Sinco, the viral squirrel sensation with 100K+ followers! Watch daily adventures, feeding time, and the cutest squirrel moments on TikTok and Instagram.",
  url: "https://sinco.com",

  // Social Media Links
  social: {
    tiktok: {
      url: "https://www.tiktok.com/@sinco.00",
      handle: "@sinco.00",
    },
    instagram: {
      url: "https://www.instagram.com/sinco.00",
      handle: "@sinco.00",
    },
    twitter: {
      url: "https://twitter.com/sinco",
      handle: "@sinco",
    }
  },

  // Memecoin Information
  memecoin: {
    // Contract address - will be updated at launch
    contractAddress: "ARGNs9XYtU7YFMi2FVAEEeNsX7voLWsnD9cF8uNvpump",
    network: "Solana", // or "Ethereum", "BSC", etc.
    symbol: "SINCO",
    name: "Sinco Token",
  },

  // Contact Information
  contact: {
    email: "hello@sinco.com",
    telegram: "https://t.me/sinco",
  },

  // Content Settings
  content: {
    // Maximum number of media items to display
    maxMediaItems: 12,
    // Featured video ID (if using YouTube/TikTok embed)
    featuredVideoId: "",
    // Newsletter signup enabled
    newsletterEnabled: false,
  },

  // Theme Settings
  theme: {
    primaryColor: "#22c55e",
    accentColor: "#10b981",
    backgroundColor: "#0a2e1a",
  },

  // Analytics (add your tracking IDs)
  analytics: {
    googleAnalyticsId: "", // GA4 measurement ID
    facebookPixelId: "",
    twitterPixelId: "",
  },

  // SEO Settings
  seo: {
    keywords: [
      "Sinco",
      "TikTok viral",
      "forest theme", 
      "social media trend",
      "memecoin",
      "viral content",
      "nature aesthetic",
      "social media"
    ],
  },
} as const;

// Media content - easily updatable
export const mediaContent = {
  // Featured content that appears prominently
  featured: [
    {
      id: 1,
      type: "image" as const,
      url: "/images/sinco-squirrel.jpg",
      alt: "Sinco the adorable viral squirrel",
      title: "Meet Sinco!",
      description: "The star of TikTok and Instagram",
    },
    {
      id: 2,
      type: "external" as const,
      url: "https://www.tiktok.com/@sinco.00",
      thumbnail: "/images/sinco-squirrel.jpg",
      alt: "Watch Sinco on TikTok",
      title: "Latest TikToks",
      description: "Watch Sinco's newest viral moments",
    },
  ],

  // Gallery content
  gallery: [
    {
      id: 3,
      type: "external" as const,
      url: "https://www.tiktok.com/@sinco.00",
      thumbnail: "/images/sinco-squirrel.jpg",
      alt: "Sinco feeding time on TikTok",
      title: "Feeding Time",
      description: "Watch on TikTok",
    },
    {
      id: 4,
      type: "external" as const,
      url: "https://www.instagram.com/sinco.00",
      thumbnail: "/images/sinco-squirrel.jpg",
      alt: "Sinco daily moments on Instagram",
      title: "Daily Moments",
      description: "Follow on Instagram",
    },
    {
      id: 5,
      type: "external" as const,
      url: "https://www.tiktok.com/@sinco.00",
      thumbnail: "/images/sinco-squirrel.jpg",
      alt: "Sinco playing - viral TikTok",
      title: "Playtime Fun",
      description: "Viral TikTok moment",
    },
    {
      id: 6,
      type: "external" as const,
      url: "https://www.instagram.com/sinco.00",
      thumbnail: "/images/sinco-squirrel.jpg",
      alt: "Sinco adventure on Instagram",
      title: "Adventure Time",
      description: "Instagram stories",
    },
  ],
} as const;

// Easy-to-update text content
export const textContent = {
  hero: {
    title: "SINCO",
    subtitle: "The Adorable Squirrel Sensation Taking the World by Storm",
    description: "Meet Sinco, the most lovable squirrel on the internet! With 100K+ followers and 10M+ views, watch daily adventures that will melt your heart.",
  },
  
  about: {
    title: "Meet Sinco",
    content: [
      "Sinco is an adorable squirrel who has captured hearts worldwide with daily TikTok and Instagram content.",
      "From feeding time adventures to playful forest explorations, Sinco brings joy to 100K+ followers every day.",
      "Join the global family of squirrel lovers and experience the pure wholesome content that's taking social media by storm."
    ],
  },

  features: [
    {
      title: "Daily Adventures",
      description: "Fresh squirrel content posted daily! Watch Sinco's feeding time, playtime, and adorable moments.",
      icon: "🐿️",
    },
    {
      title: "Wholesome Content", 
      description: "Pure, family-friendly entertainment that brings smiles to viewers of all ages worldwide.",
      icon: "❤️",
    },
    {
      title: "Viral Moments",
      description: "Be the first to see Sinco's latest viral TikToks and trending Instagram posts.",
      icon: "🌟",
    },
    {
      title: "Community Love",
      description: "Join 100K+ followers in the global squirrel-loving community sharing positivity daily.",
      icon: "🌍",
    },
  ],

  cta: {
    primary: "Follow Sinco",
    secondary: "Watch Now",
    newsletter: "Get Daily Cuteness",
  },
} as const;
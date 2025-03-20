// Application constants
export const constants = {
  // API URLs
  apiUrl: "/api",

  // File upload limits
  maxFileSize: 10 * 1024 * 1024, // 10MB

  // Supported file types
  supportedImageTypes: ["image/jpeg", "image/png", "image/gif", "image/webp"],
  supportedAudioTypes: ["audio/mpeg", "audio/wav", "audio/ogg"],

  // Application settings
  appName: "PodManage",
  appDescription: "The all-in-one podcast management platform",

  // Social media links
  socialLinks: {
    twitter: "https://twitter.com/podmanage",
    facebook: "https://facebook.com/podmanage",
    instagram: "https://instagram.com/podmanage",
  },

  // Contact information
  contactEmail: "support@podmanage.com",

  // Cookie names
  cookies: {
    authToken: "auth_token",
    theme: "theme",
    preProductionComplete: "pre_production_complete",
    productionComplete: "production_complete",
  },
}

export default constants


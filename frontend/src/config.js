// Configuration for API URLs
const config = {
  // Use environment variable if available, otherwise fallback to localhost
  API_URL: import.meta.env.VITE_API_URL || "http://localhost:8000",
  
  // Check if we're in development or production
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
};

export default config; 
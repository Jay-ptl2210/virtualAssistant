// CORS configuration for different environments
const corsOptions = {
  origin: [
    "http://localhost:5173", // Local development
    "https://your-frontend-app.onrender.com", // Replace with your actual Render frontend URL
    process.env.FRONTEND_URL // Environment variable for frontend URL
  ].filter(Boolean), // Remove undefined values
  credentials: true, // Allow cookies to be sent with requests
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
};

export default corsOptions; 
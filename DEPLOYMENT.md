# Deployment Guide for Render

## Frontend Deployment Issues Fixed

The loading screen issue on Render was caused by:
1. **Hardcoded localhost URLs** - Fixed with environment variables
2. **CORS configuration** - Updated to accept Render URLs
3. **Missing error handling** - Added timeout and retry mechanisms

## Environment Variables Setup

### Frontend (React/Vite)
Set these environment variables in your Render frontend service:

```
VITE_API_URL=https://your-backend-app.onrender.com
```

### Backend (Node.js/Express)
Set these environment variables in your Render backend service:

```
FRONTEND_URL=https://your-frontend-app.onrender.com
JWT_SECRET=your-jwt-secret
MONGODB_URI=your-mongodb-connection-string
```

## CORS Configuration

Update `backend/config/cors.js` with your actual Render URLs:

```javascript
const corsOptions = {
  origin: [
    "http://localhost:5173", // Local development
    "https://your-actual-frontend-app.onrender.com", // Replace with your actual URL
    process.env.FRONTEND_URL
  ].filter(Boolean),
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
};
```

## Deployment Steps

1. **Backend Deployment:**
   - Deploy your backend to Render
   - Set environment variables
   - Note the backend URL

2. **Frontend Deployment:**
   - Set `VITE_API_URL` to your backend URL
   - Deploy frontend to Render
   - Update CORS configuration with frontend URL

3. **Test:**
   - Check browser console for connection errors
   - Verify cookies are being sent with requests
   - Test authentication flow

## Troubleshooting

### Loading Screen Stuck
- Check browser console for CORS errors
- Verify environment variables are set correctly
- Check if backend is responding to `/api/user/current` endpoint

### Authentication Issues
- Ensure cookies are enabled
- Check JWT_SECRET is set correctly
- Verify MongoDB connection

### CORS Errors
- Update CORS configuration with correct URLs
- Ensure `credentials: true` is set
- Check if frontend URL is in allowed origins list 


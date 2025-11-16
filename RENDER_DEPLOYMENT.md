# Render Deployment Guide

## Frontend Deployment

### Environment Variables
Set the following environment variable in your Render dashboard:

- `REACT_APP_API_URL` - Your backend API URL (e.g., `https://your-backend.onrender.com/api/person`)

### Build Settings
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npx serve -s build -l 3000` (or use a static site service)

### Notes
- The `start.js` script with localStorage flags is only needed for local development
- The build process (`npm run build`) doesn't require the localStorage flags
- Render will run the build command, which creates static files in the `build/` folder
- You can either:
  1. Use Render's Static Site service (recommended for React apps)
  2. Use a Web Service with a simple static file server

## Backend Deployment

### Environment Variables (if needed)
Set any required environment variables in your backend service settings.

### Build Settings
- **Build Command**: `mvn clean package` (or `./mvnw clean package` if using Maven wrapper)
- **Start Command**: `java -jar target/person-api-*.jar` (adjust jar name as needed)

### Notes
- Make sure your Spring Boot app is configured to use the `PORT` environment variable that Render provides
- Update CORS settings to allow requests from your frontend domain


# Production Deployment Guide

## Prerequisites

- Node.js (v18 or higher)
- MongoDB database
- Upstash Redis account (for rate limiting)

## Environment Variables

### Backend (.env)

Create a `.env` file in the `backend` directory:

```env
MONGODB_URI=your_mongodb_connection_string
UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
PORT=3000
NODE_ENV=production
```

### Frontend (.env)

For **development**, create a `.env` file in the `frontend` directory:

```env
VITE_BASE_URL=http://localhost:3000
```

For **production**, either:
- Leave `VITE_BASE_URL` empty (recommended - uses same origin)
- Or set it to your backend URL if hosted separately

## Deployment Steps

### 1. Install Dependencies and Build

From the root directory:

```bash
npm run build
```

This will:
- Install backend dependencies
- Install frontend dependencies
- Build the frontend for production (output to `frontend/dist`)

### 2. Start the Production Server

```bash
npm start
```

The server will:
- Serve the built frontend from `frontend/dist`
- Handle API requests at `/api/*`
- Serve the React app for all other routes (SPA routing)

## Deployment Platforms

### Render / Railway / Heroku

1. Set environment variables in the platform dashboard
2. Set build command: `npm run build`
3. Set start command: `npm start`
4. Ensure `NODE_ENV=production` is set

### VPS (Ubuntu/Debian)

1. Install Node.js and PM2:
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo npm install -g pm2
```

2. Clone and setup:
```bash
git clone <your-repo>
cd note
npm run build
```

3. Start with PM2:
```bash
pm2 start npm --name "note-app" -- start
pm2 save
pm2 startup
```

### Docker

Create a `Dockerfile` in the root:

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY backend/package*.json ./backend/
COPY frontend/package*.json ./frontend/

# Install dependencies and build
RUN npm run build

# Copy source code
COPY . .

# Expose port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t note-app .
docker run -p 3000:3000 --env-file backend/.env note-app
```

## Important Notes

1. **Static File Serving**: The backend serves the frontend from `frontend/dist` in production
2. **API Routes**: All API routes are prefixed with `/api`
3. **SPA Routing**: The catch-all route (`*`) serves `index.html` for client-side routing
4. **CORS**: CORS is disabled in production (frontend and backend on same origin)
5. **Rate Limiting**: Upstash Redis is required for rate limiting to work

## Troubleshooting

### Frontend shows 404 errors
- Ensure `NODE_ENV=production` is set
- Verify `frontend/dist` directory exists after build
- Check that the build command completed successfully

### API requests fail
- In production, ensure `VITE_BASE_URL` is empty or not set
- Check that API routes are prefixed with `/api`

### Rate limiting errors
- Verify Upstash Redis credentials are correct
- Check Upstash dashboard for connection issues

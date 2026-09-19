# AFPI — AirFare PriceIndex

AFPI is a frontend-only Vite application. It runs in demo mode with local data and does not require an Express backend, database, or API environment variables.

## Run locally

```bash
npm install
npm run dev
```

Open the URL shown by Vite, normally http://localhost:5173.

## Deploy to Vercel

- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install`

The Vercel deployment serves the static frontend. All dashboard data is provided by the browser-local demo service in `src/services/api.js`.

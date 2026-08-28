# 🛡️ FinGuard Frontend

This directory contains the single-page web application for **FinGuard**, built with **React 19**, **TypeScript**, **Vite**, **Tailwind CSS**, and **Supabase**.

For complete project documentation, database setup scripts, architectural overview, and deployment guides, please refer to the main [Root README](../README.md).

## 🚀 Local Development

```bash
# Install dependencies
npm install

# Start local dev server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Run Oxlint checks
npm run lint
```

## 🗝️ Environment Variables

Ensure `.env` contains:
```env
VITE_SUPABASE_URL=https://your-supabase-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_GEMINI_API_KEY=your-google-gemini-api-key
```

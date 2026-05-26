# Google Maps API Setup

## 1. Create a Google Cloud project

1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Click **Select a project → New Project**
3. Name it (e.g. "Heartland Plein Air") and click **Create**

## 2. Enable billing

Maps JavaScript API requires a billing account. Google provides a free monthly credit that covers most small sites.

1. In the sidebar go to **Billing**
2. Link or create a billing account

## 3. Enable the Maps JavaScript API

1. Go to **APIs & Services → Library**
2. Search for **Maps JavaScript API**
3. Click **Enable**

## 4. Create an API key

1. Go to **APIs & Services → Credentials**
2. Click **Create Credentials → API key**
3. Copy the key — you'll use it in the next steps

## 5. Restrict the key (do this before going live)

Restricting the key prevents it from being used on other domains if someone finds it in the page source.

1. In **Credentials**, click the pencil icon next to your key
2. Under **Application restrictions**, select **Websites**
3. Add your production domain: `heartlandpleinair.org/*`
4. If you use Vercel preview URLs, also add: `*.vercel.app/*`
5. Under **API restrictions**, select **Restrict key → Maps JavaScript API**
6. Click **Save**

## 6. Add the key for local development

The key is stored in `.env.local` at the project root. This file is gitignored and will never be committed.

```
VITE_GOOGLE_MAPS_API_KEY=your_api_key_here
```

## 7. Add the key to Vercel (production)

1. Open your Vercel project → **Settings → Environment Variables**
2. Add a new variable:
   - **Name:** `VITE_GOOGLE_MAPS_API_KEY`
   - **Value:** your API key
   - **Environment:** Production (and Preview if you want the map in branch deploys)
3. Click **Save**, then redeploy

Vercel injects the variable at build time — no code changes needed.

## Troubleshooting

| Symptom | Likely cause |
|---|---|
| Map shows grey tiles or "This page can't load Google Maps correctly" | Key is missing, invalid, or billing isn't enabled |
| Map works locally but not on Vercel | Key not added to Vercel Environment Variables, or domain restriction blocking the Vercel URL |
| Map works on Vercel preview but not production | Domain restriction set to `*.vercel.app` only — add `heartlandpleinair.org/*` |

# The Quote Jar — Setup Guide

A family PWA to save funny quotes. Built with React + Vite, Firebase Auth + Firestore, deployable to Vercel.

---

## Prerequisites
- Node.js 18+ installed
- A Firebase project (you have this ✅)
- A GitHub account
- A Vercel account (free tier is fine)

---

## Step 1 — Configure Firebase

### 1a. Enable Google Sign-In
1. Go to [Firebase Console](https://console.firebase.google.com) → your project
2. Click **Authentication** → **Sign-in method**
3. Enable **Google** as a provider
4. Save

### 1b. Create a Firestore Database
1. Click **Firestore Database** → **Create database**
2. Choose **Production mode** (we'll add rules next)
3. Pick a region close to your family (e.g. `us-central1`)

### 1c. Deploy Firestore Security Rules
1. In Firestore → **Rules** tab
2. Replace the contents with the rules from `firestore.rules` in this project
3. Click **Publish**

### 1d. Register a Web App & get your config
1. In Firebase Console → **Project Settings** (gear icon) → **Your apps**
2. Click **Add app** → Web (`</>`)
3. Give it a nickname like "Quote Jar Web"
4. Copy the `firebaseConfig` object — you'll need these values

---

## Step 2 — Set up the project locally

```bash
# Clone / create your GitHub repo first (see Step 3), then:
cd quote-jar
npm install

# Create your local environment file
cp .env.example .env.local
```

Edit `.env.local` and fill in your Firebase values from Step 1d:
```
VITE_FIREBASE_API_KEY=AIza...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123:web:abc123
```

Test locally:
```bash
npm run dev
# Open http://localhost:5173
```

---

## Step 3 — Create a GitHub repo

1. Go to [github.com/new](https://github.com/new)
2. Name it `quote-jar`, set to **Private** (recommended for family app)
3. **Don't** initialize with README (you already have files)
4. Run these commands in your project folder:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/quote-jar.git
git push -u origin main
```

> ⚠️ Make sure `.env.local` is in `.gitignore` — it is by default in this project. **Never commit your Firebase keys.**

---

## Step 4 — Deploy to Vercel

### 4a. Create a Vercel account
1. Go to [vercel.com](https://vercel.com) and sign up (use your GitHub account for easy connection)

### 4b. Import your GitHub repo
1. In Vercel dashboard → **Add New Project**
2. Click **Import** next to your `quote-jar` repo
3. Framework preset will auto-detect as **Vite** ✅
4. **Before deploying**, click **Environment Variables** and add all 6 variables from your `.env.local`:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`
5. Click **Deploy**

Vercel will give you a URL like `quote-jar-abc123.vercel.app`

### 4c. Add your Vercel domain to Firebase Auth
Firebase needs to trust your deployed domain:
1. Firebase Console → **Authentication** → **Settings** → **Authorized domains**
2. Click **Add domain**
3. Add your Vercel URL: `quote-jar-abc123.vercel.app`

---

## Step 5 — Add PWA icons

The app needs two icon files in the `/public` folder for the PWA manifest:
- `public/jar-192.png` (192×192px)
- `public/jar-512.png` (512×512px)
- `public/apple-touch-icon.png` (180×180px)

You can create these from the jar SVG design, or use any image editor / online tool like [Canva](https://canva.com) or [favicon.io](https://favicon.io). Until you add real icons, the app will still work — the PWA install prompt just won't show a custom icon.

---

## Step 6 — Install on phones

### iPhone / Safari
1. Open your Vercel URL in Safari
2. Tap the **Share** button (box with arrow)
3. Scroll down → **Add to Home Screen**
4. Tap **Add**

### Android / Chrome
1. Open your Vercel URL in Chrome
2. Tap the **⋮** menu → **Add to Home screen**
   (or Chrome may show an install banner automatically)

---

## Ongoing workflow

Every time you push to `main` on GitHub, Vercel will automatically redeploy. The workflow is:

```bash
# Make changes
git add .
git commit -m "describe your change"
git push
# Vercel auto-deploys in ~30 seconds
```

---

## Project structure

```
quote-jar/
├── public/
│   ├── favicon.svg
│   ├── jar-192.png       ← add this
│   ├── jar-512.png       ← add this
│   └── apple-touch-icon.png  ← add this
├── src/
│   ├── components/
│   │   ├── Jar.jsx           SVG jar with paper slips
│   │   ├── FlyingPaper.jsx   Paper animation
│   │   ├── QuoteModal.jsx    Quote reveal overlay
│   │   └── LoginScreen.jsx   Google sign-in screen
│   ├── hooks/
│   │   ├── useAuth.js        Firebase Auth hook
│   │   └── useQuotes.js      Firestore real-time hook
│   ├── lib/
│   │   └── firebase.js       Firebase initialization
│   ├── App.jsx               Main app
│   └── main.jsx              Entry point
├── .env.example              Template for env vars
├── .env.local                Your actual keys (not committed)
├── .gitignore
├── firestore.rules           Copy these into Firebase Console
├── index.html
├── package.json
└── vite.config.js            Includes PWA plugin config
```

---

## Firestore data model

Collection: `quotes`

Each document:
```json
{
  "author": "Grandma",
  "text": "I don't need glasses, I need bigger buttons.",
  "addedBy": "uid_of_person_who_submitted",
  "addedByName": "Jeff",
  "createdAt": "Firestore Timestamp"
}
```

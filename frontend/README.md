# 📈 Voice Agent Analytics — Frontend

This is the **frontend** of the Voice Agent Analytics dashboard — a full-stack metrics-driven web app inspired by [Super Bryn](https://superbryn.com/).  
It visualizes **call analytics**, allows **user-driven data overrides**, and syncs with **Supabase** for persistence.

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|-------------|
| Framework | Next.js 14 (App Router, TypeScript) |
| Charts | Recharts |
| Styling | CSS Modules (Custom dark-glow theme) |
| Database | Supabase (PostgreSQL) |
| Backend Integration | REST API (FastAPI + Upstash Redis) |
| Deployment | Vercel (Frontend) + Supabase (DB) + Render (Backend) |

---

## 🧩 Core Features

### 📊 Interactive Charts
- **Call Duration Analysis** (LineChart)
- **Sad Path Analysis** (PieChart)
- Responsive, animated, and styled with neon glow.

### ✏️ Real-Time Chart Editing
- Click **Edit Data** to modify chart points.
- Enter your **email** to save values to Supabase.
- Previously saved values auto-load when you revisit.
- Graceful overwrite confirmation for returning users.

### 💾 Supabase Integration
- Uses a `chart_overrides` table:
  ```sql
  id SERIAL PRIMARY KEY,
  email TEXT,
  chart_id TEXT,
  values JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
  ```
- Reads, upserts, and syncs user-specific chart overrides.

### 🎨 UI / UX
- Fully **custom dark background** with grid lines.
- **Glowing accent hover effects** (Superbryn-inspired).
- **Modal overlay** with blur + neon highlights.
- **Responsive** across all screen sizes.

---

## ⚙️ Local Development

### 1️⃣ Install Dependencies
```bash
npm install
```

### 2️⃣ Add Environment Variables
Create `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
NEXT_PUBLIC_SUPABASE_KEY=<your-anon-key>
```

### 3️⃣ Run Locally
```bash
npm run dev
```
App runs on `http://localhost:3000`

---

## 🌐 Deployment

### Frontend
Deploy easily to **Vercel**:
```bash
vercel --prod
```

### Backend
- Deploy FastAPI worker + Redis to **Render** or **Railway**.
- Update `.env.local` if API endpoint changes.

---

## 🧠 Author Notes

This frontend mirrors the Superbryn aesthetic:
- Dark neon-glow UI.
- Real-time, user-editable analytics.
- Built for clarity, reactivity, and simplicity.

---
**Frontend by:** Ritesh Puvvada  


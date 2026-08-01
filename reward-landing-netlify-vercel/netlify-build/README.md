# Reward Landing Page

একটি প্রিমিয়াম, হাই-কনভার্সন 3D ল্যান্ডিং পেজ।
Built with React + Vite + Tailwind CSS + Framer Motion.

---

## Local এ রান করতে

```bash
# ১. ডিপেন্ডেন্সি ইন্সটল করুন
npm install
# অথবা
pnpm install

# ২. Dev server চালু করুন
npm run dev

# ব্রাউজারে যান: http://localhost:5173
```

## Production Build করতে

```bash
npm run build
# dist/ ফোল্ডারে বিল্ড হবে
```

## Netlify Deploy করতে

### Option 1 — Drag & Drop (সবচেয়ে সহজ)
1. `npm run build` রান করুন
2. [netlify.com/drop](https://app.netlify.com/drop) এ যান
3. `dist/` ফোল্ডারটি drag & drop করুন
4. Done!

### Option 2 — GitHub থেকে Auto Deploy
1. এই ফোল্ডারটি GitHub-এ push করুন
2. [netlify.com](https://netlify.com) → "New site from Git"
3. Build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. Deploy!

---

## Tech Stack
- **React 19** + **TypeScript**
- **Vite 7** — বিল্ড টুল
- **Tailwind CSS v4** — স্টাইলিং
- **Framer Motion** — অ্যানিমেশন
- **Lucide React** — আইকন
- **Wouter** — রাউটিং

## লিংক পরিবর্তন করতে
`src/App.tsx` ফাইলের শুরুতে:
```ts
const CTA_URL = "https://www.youtube.com/"; // এখানে আপনার লিংক দিন
```

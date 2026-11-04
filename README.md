# PAUDIVA — Grow Green. Live Better. (Powered By V5)

Next.js 14 (App Router, TypeScript) + Prisma + MySQL. The storefront is `public/index.html` (served at `/`), the backend is in `app/api/*`.

## What works now
- Login / signup with mobile OR email + OTP (expiry 5 min, 30 s resend cooldown, 5 attempts, rate limit), secure cookie sessions, logout
- Products and search from the database (prices stored in paise)
- Cash on Delivery checkout with server-side price and stock checks
- Order tracking (owner only)
- Support tickets with chat: the ticket waits for an agent, and the customer gets a popup when an agent joins
- Support desk at `/admin.html` for ADMIN and SUPPORT roles (reply, resolve, create support workers, load demo products)

## Not built yet (do not promise these to customers)
Razorpay payments, WhatsApp seller notifications, seller registration and dashboard, full admin panel, commission and earnings, refunds, reviews, wishlist, saved addresses, Cloudinary image upload, SMS OTP for mobile numbers, IP-based rate limiting.

## Deploy on Vercel (step by step)
1. **Database:** create a MySQL database at a provider such as Aiven, TiDB Cloud or Railway (check which free plan is available today). Copy the connection string. Add `?connection_limit=1` at the end, and `&sslaccept=strict` if the provider needs SSL.
2. **GitHub:** create a new empty repository. Upload the unzipped project (do not upload `.env`). With Termux: `pkg install git`, then `git init`, `git add .`, `git commit -m "PAUDIVA"`, `git remote add origin <your repo url>`, `git push -u origin main`.
3. **Vercel:** vercel.com > Add New > Project > import the repository.
4. **Environment variables** (Settings > Environment Variables), same names as `.env.example`:
   - `DATABASE_URL`, `AUTH_SECRET` (32+ random characters), `ADMIN_EMAIL` (your email)
   - `RESEND_API_KEY` and `EMAIL_FROM` for real email OTPs
   - For the first test only, set `OTP_DEV_ECHO` to `true` so the OTP appears on screen. Anyone can log in as anyone while it is on, so set it back to `false` before sharing the site.
5. **Deploy.** The build creates the database tables automatically (`prisma db push`).
6. **First login:** open the site, log in with email = your `ADMIN_EMAIL`. You become ADMIN automatically. Open `/admin.html`, press **Load demo products**, and add support workers by email there.
7. **Production checks:** `OTP_DEV_ECHO` is `false`, `AUTH_SECRET` is set, Resend sender domain is verified, demo products are replaced by real listings, legal pages reviewed by a lawyer.

## Local run
`npm install`, copy `.env.example` to `.env`, fill it, then `npm run dev`.
Note: `prisma db push` is used for the first version. Switch to `prisma migrate` before you have real customer data.

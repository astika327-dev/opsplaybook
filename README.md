# Villa Operations Dashboard — Scaffold

Minimal scaffold for a Villa Operations Dashboard (MVP) focused on:
- Cleaning checklist daily log
- Room status tracking
- Maintenance tickets
- Inventory (linen, amenities)
- Notifications for rooms not ready

**Stack (recommended)**
- Next.js (App Router) + TypeScript
- Prisma + PostgreSQL (Supabase)
- NextAuth.js
- Tailwind CSS + shadcn/ui
- PWA-ready (manifest + service worker)

This scaffold includes:
- `prisma/schema.prisma` — database schema
- `app/` — basic Next.js App Router structure (TypeScript)
- Example server action for submitting cleaning checklist
- NextAuth skeleton (`app/api/auth/[...nextauth]/route.ts`)
- PWA manifest and service worker stub
- `.env.example` with required env vars
- `README.md` with setup notes and next steps

**How to use**
1. Install dependencies (from project root):
   ```
   npm install
   ```
2. Copy `.env.example` to `.env` and fill values (DATABASE_URL for Supabase, NEXTAUTH_SECRET, etc).
3. Generate Prisma client & migrate:
   ```
   npx prisma generate
   npx prisma migrate dev --name init
   ```
4. Run dev server:
   ```
   npm run dev
   ```
5. Optional: seed sample data with `prisma/seed.ts` (configure before running).

This scaffold is opinionated but minimal — meant for portfolio/demo. Flesh out auth providers, UI polish, and integrations (Supabase realtime, WhatsApp API) as next steps.
